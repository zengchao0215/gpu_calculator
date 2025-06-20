import { 
  PrecisionType, 
  OptimizerType, 
  QuantizationType,
  TrainingConfig,
  InferenceConfig,
  FineTuningConfig,
  MemoryBreakdown 
} from '@/types';

/**
 * 获取精度对应的字节数
 */
export function getPrecisionBytes(precision: PrecisionType): number {
  switch (precision) {
    case 'FP32': return 4;
    case 'FP16': 
    case 'BF16': return 2;
    case 'INT8': return 1;
    case 'INT4': return 0.5;
    default: return 4;
  }
}

/**
 * 获取优化器状态倍数
 */
export function getOptimizerMultiplier(optimizer: OptimizerType, precision: PrecisionType = 'FP32'): number {
  const baseBytes = getPrecisionBytes('FP32'); // 优化器状态通常用FP32
  const paramBytes = getPrecisionBytes(precision);
  
  switch (optimizer) {
    case 'SGD': return baseBytes / paramBytes; // 只需要动量，1倍参数
    case 'Adam':
    case 'AdamW': return (baseBytes * 2) / paramBytes; // 需要一阶和二阶动量，2倍参数
    default: return 2;
  }
}

/**
 * 获取量化比例
 */
export function getQuantizationRatio(quantization: QuantizationType): number {
  switch (quantization) {
    case 'None': return 1.0;
    case 'INT8': return 0.25; // 4倍压缩
    case 'INT4': return 0.125; // 8倍压缩
    case 'FP8': return 0.25; // 4倍压缩
    default: return 1.0;
  }
}

/**
 * 计算KV缓存大小 (GB)
 */
export function calculateKVCache(
  batchSize: number,
  sequenceLength: number,
  hiddenSize: number,
  numLayers: number,
  numHeads: number,
  precision: PrecisionType = 'FP16'
): number {
  // KV Cache = batch_size × seq_len × hidden_size × num_layers × 2(K+V) × precision_bytes
  const precisionBytes = getPrecisionBytes(precision);
  const kvCacheBytes = batchSize * sequenceLength * hiddenSize * numLayers * 2 * precisionBytes;
  return kvCacheBytes / (1024 ** 3); // 转换为GB
}

/**
 * 计算激活值大小 (GB)
 */
export function calculateActivations(
  batchSize: number,
  sequenceLength: number,
  hiddenSize: number,
  numLayers: number,
  precision: PrecisionType = 'FP16'
): number {
  // 简化激活值计算：主要包括注意力和FFN层的激活
  const precisionBytes = getPrecisionBytes(precision);
  
  // 注意力层激活值：Q, K, V矩阵 + 注意力分数矩阵
  const attentionActivations = batchSize * sequenceLength * hiddenSize * 3 + 
                              batchSize * sequenceLength * sequenceLength;
  
  // FFN层激活值：通常是hidden_size的4倍
  const ffnActivations = batchSize * sequenceLength * hiddenSize * 4 * 2; // 两个线性层
  
  // 总激活值
  const totalActivations = (attentionActivations + ffnActivations) * numLayers * precisionBytes;
  
  return totalActivations / (1024 ** 3); // 转换为GB
}

/**
 * 计算LoRA参数数量
 */
export function calculateLoRAParams(baseParams: number, rank: number): number {
  // 简化计算：假设LoRA应用到所有线性层
  // 实际LoRA参数 = 2 × rank × 原始权重维度
  // 这里用经验公式：LoRA参数约为原始参数的 (2 × rank / hidden_size) 比例
  const estimatedRatio = (2 * rank) / 4096; // 假设hidden_size=4096
  return baseParams * estimatedRatio;
}

/**
 * 训练显存计算
 */
export function calculateTrainingMemory(config: TrainingConfig): MemoryBreakdown {
  const { modelParams, batchSize, sequenceLength, precision, optimizer, gradientCheckpointing } = config;
  
  const paramBytes = getPrecisionBytes(precision);
  const modelParamsGB = (modelParams * 1e9 * paramBytes) / (1024 ** 3);
  
  // 梯度大小（通常与参数相同精度）
  const gradientsGB = modelParamsGB;
  
  // 优化器状态
  const optimizerGB = (modelParams * 1e9 * getPrecisionBytes('FP32') * (optimizer === 'SGD' ? 1 : 2)) / (1024 ** 3);
  
  // 激活值（简化计算）
  const activationsGB = gradientCheckpointing ? 
    calculateActivations(batchSize, sequenceLength, 4096, 32, precision) * 0.3 : // 梯度检查点减少70%
    calculateActivations(batchSize, sequenceLength, 4096, 32, precision);
  
  const total = modelParamsGB + gradientsGB + optimizerGB + activationsGB;
  
  return {
    modelParams: modelParamsGB,
    gradients: gradientsGB,
    optimizer: optimizerGB,
    activations: activationsGB,
    kvCache: 0, // 训练时通常不缓存KV
    total,
    breakdown: [
      { label: '模型参数', value: modelParamsGB, percentage: (modelParamsGB / total) * 100, color: '#3B82F6' },
      { label: '梯度', value: gradientsGB, percentage: (gradientsGB / total) * 100, color: '#10B981' },
      { label: '优化器状态', value: optimizerGB, percentage: (optimizerGB / total) * 100, color: '#F59E0B' },
      { label: '激活值', value: activationsGB, percentage: (activationsGB / total) * 100, color: '#EF4444' },
    ]
  };
}

/**
 * 推理显存计算
 */
export function calculateInferenceMemory(config: InferenceConfig, modelInfo?: any): MemoryBreakdown {
  const { precision, quantization, batchSize, sequenceLength, kvCacheRatio } = config;
  
  // 从模型信息获取参数，如果没有则使用默认值
  const modelParams = modelInfo?.params || 7; // 参数量（B）
  const hiddenSize = modelInfo?.hiddenSize || 4096;
  const numLayers = modelInfo?.numLayers || 32;
  const numHeads = modelInfo?.numHeads || 32;
  
  const quantizationRatio = getQuantizationRatio(quantization);
  const paramBytes = getPrecisionBytes(precision);
  
  // 量化后的模型参数
  const modelParamsGB = (modelParams * 1e9 * paramBytes * quantizationRatio) / (1024 ** 3);
  
  // KV缓存
  const kvCacheGB = calculateKVCache(batchSize, sequenceLength, hiddenSize, numLayers, numHeads, precision) * kvCacheRatio;
  
  // 推理时的少量激活值
  const activationsGB = calculateActivations(batchSize, sequenceLength, hiddenSize, numLayers, precision) * 0.1;
  
  const total = modelParamsGB + kvCacheGB + activationsGB;
  
  return {
    modelParams: modelParamsGB,
    gradients: 0,
    optimizer: 0,
    activations: activationsGB,
    kvCache: kvCacheGB,
    total,
    breakdown: [
      { label: '模型参数', value: modelParamsGB, percentage: (modelParamsGB / total) * 100, color: '#3B82F6' },
      { label: 'KV缓存', value: kvCacheGB, percentage: (kvCacheGB / total) * 100, color: '#8B5CF6' },
      { label: '激活值', value: activationsGB, percentage: (activationsGB / total) * 100, color: '#EF4444' },
    ]
  };
}

/**
 * 微调显存计算
 */
export function calculateFineTuningMemory(config: FineTuningConfig, modelInfo?: any): MemoryBreakdown {
  const { method, loraRank = 4, quantization, precision } = config;
  
  // 从模型信息获取参数，如果没有则使用默认值
  const baseModelParams = modelInfo?.params || 7; // 参数量（B）
  const quantizationRatio = getQuantizationRatio(quantization);
  const paramBytes = getPrecisionBytes(precision);
  
  let modelParamsGB = 0;
  let gradientsGB = 0;
  let optimizerGB = 0;
  let activationsGB = 0;
  
  switch (method) {
    case 'Full':
      // 全参数微调
      modelParamsGB = (baseModelParams * 1e9 * paramBytes) / (1024 ** 3);
      gradientsGB = modelParamsGB;
      optimizerGB = (baseModelParams * 1e9 * getPrecisionBytes('FP32') * 2) / (1024 ** 3);
      activationsGB = 2.0; // 简化估算
      break;
      
    case 'LoRA':
      // LoRA微调：基础模型 + 小LoRA参数
      modelParamsGB = (baseModelParams * 1e9 * paramBytes) / (1024 ** 3);
      const loraParams = calculateLoRAParams(baseModelParams, loraRank);
      const loraParamsGB = (loraParams * 1e9 * paramBytes) / (1024 ** 3);
      gradientsGB = loraParamsGB; // 只计算LoRA梯度
      optimizerGB = loraParamsGB * 2; // LoRA优化器状态
      activationsGB = 1.0;
      break;
      
    case 'QLoRA':
      // QLoRA：量化基础模型 + LoRA参数
      modelParamsGB = (baseModelParams * 1e9 * paramBytes * quantizationRatio) / (1024 ** 3);
      const qloraParams = calculateLoRAParams(baseModelParams, loraRank);
      const qloraParamsGB = (qloraParams * 1e9 * getPrecisionBytes('FP16')) / (1024 ** 3); // LoRA用FP16
      gradientsGB = qloraParamsGB;
      optimizerGB = qloraParamsGB * 2;
      activationsGB = 0.8;
      break;
      
    case 'Prefix':
      // Prefix Tuning
      modelParamsGB = (baseModelParams * 1e9 * paramBytes) / (1024 ** 3);
      const prefixParams = 0.1; // 约1%的参数
      const prefixParamsGB = (baseModelParams * prefixParams * 1e9 * paramBytes) / (1024 ** 3);
      gradientsGB = prefixParamsGB;
      optimizerGB = prefixParamsGB * 2;
      activationsGB = 1.2;
      break;
  }
  
  const total = modelParamsGB + gradientsGB + optimizerGB + activationsGB;
  
  return {
    modelParams: modelParamsGB,
    gradients: gradientsGB,
    optimizer: optimizerGB,
    activations: activationsGB,
    kvCache: 0,
    total,
    breakdown: [
      { label: '模型参数', value: modelParamsGB, percentage: (modelParamsGB / total) * 100, color: '#3B82F6' },
      { label: '梯度', value: gradientsGB, percentage: (gradientsGB / total) * 100, color: '#10B981' },
      { label: '优化器状态', value: optimizerGB, percentage: (optimizerGB / total) * 100, color: '#F59E0B' },
      { label: '激活值', value: activationsGB, percentage: (activationsGB / total) * 100, color: '#EF4444' },
    ]
  };
}

/**
 * 格式化显存大小
 */
export function formatMemorySize(sizeGB: number): string {
  if (sizeGB < 1) {
    return `${(sizeGB * 1024).toFixed(1)} MB`;
  } else if (sizeGB < 1024) {
    return `${sizeGB.toFixed(1)} GB`;
  } else {
    return `${(sizeGB / 1024).toFixed(1)} TB`;
  }
}

/**
 * 内存使用率评估
 */
export function assessMemoryUsage(requiredGB: number, availableGB: number): {
  utilizationRate: number;
  status: 'optimal' | 'warning' | 'critical';
  message: string;
} {
  const utilizationRate = (requiredGB / availableGB) * 100;
  
  if (utilizationRate <= 70) {
    return {
      utilizationRate,
      status: 'optimal',
      message: '显存使用率良好，运行稳定'
    };
  } else if (utilizationRate <= 90) {
    return {
      utilizationRate,
      status: 'warning',
      message: '显存使用率较高，建议优化'
    };
  } else {
    return {
      utilizationRate,
      status: 'critical',
      message: '显存不足，无法正常运行'
    };
  }
} 