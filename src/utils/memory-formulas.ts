import { 
  PrecisionType, 
  OptimizerType, 
  QuantizationType,
  TrainingConfig,
  InferenceConfig,
  FineTuningConfig,
  GRPOConfig,
  MultimodalConfig,
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
    case 'FP8': return 1;
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
 * 训练显存计算 - 通用LLM框架（全量微调）
 * 总显存 = 模型权重 + 优化器状态 + 梯度 + 激活值 + 其他开销
 */
export function calculateTrainingMemory(config: TrainingConfig): MemoryBreakdown {
  const { modelParams, batchSize, sequenceLength, precision, optimizer, gradientCheckpointing } = config;
  
  // 1. 模型权重 (Model Weights)
  const modelPrecisionBytes = getPrecisionBytes(precision);
  const modelWeightsGB = (modelParams * 1e9 * modelPrecisionBytes) / (1024 ** 3);
  
  // 2. 优化器状态 (Optimizer States) - 全量微调：P_train = P_total
  const optimizerPrecisionBytes = getPrecisionBytes('FP32'); // 优化器状态通常用FP32
  const optimizerMultiplier = optimizer === 'SGD' ? 1 : 2; // SGD只需动量，AdamW需要一阶+二阶动量
  const optimizerGB = (modelParams * 1e9 * optimizerPrecisionBytes * optimizerMultiplier) / (1024 ** 3);
  
  // 3. 梯度 (Gradients) - 全量微调：P_train = P_total
  const gradientPrecisionBytes = getPrecisionBytes(precision);
  const gradientsGB = (modelParams * 1e9 * gradientPrecisionBytes) / (1024 ** 3);
  
  // 4. 激活值 (Activations)
  const baseActivationsGB = calculateActivations(batchSize, sequenceLength, 4096, 32, precision);
  const gradientCheckpointMultiplier = gradientCheckpointing ? 0.3 : 1.0; // 梯度检查点减少70%
  const activationsGB = baseActivationsGB * gradientCheckpointMultiplier;
  
  // 5. 其他开销 (Misc Overheads)
  const otherOverheadGB = 1.5; // CUDA上下文、临时变量、框架开销等
  
  const total = modelWeightsGB + optimizerGB + gradientsGB + activationsGB + otherOverheadGB;
  
  return {
    modelParams: modelWeightsGB,
    gradients: gradientsGB,
    optimizer: optimizerGB,
    activations: activationsGB,
    kvCache: 0, // 训练时通常不缓存KV
    total,
    breakdown: [
      { label: '模型权重', value: modelWeightsGB, percentage: (modelWeightsGB / total) * 100, color: '#3B82F6' },
      { label: '优化器状态', value: optimizerGB, percentage: (optimizerGB / total) * 100, color: '#F59E0B' },
      { label: '梯度', value: gradientsGB, percentage: (gradientsGB / total) * 100, color: '#10B981' },
      { label: '激活值', value: activationsGB, percentage: (activationsGB / total) * 100, color: '#EF4444' },
      { label: '其他开销', value: otherOverheadGB, percentage: (otherOverheadGB / total) * 100, color: '#6B7280' },
    ]
  };
}

/**
 * 推理显存计算
 */
export function calculateInferenceMemory(config: InferenceConfig, modelInfo?: { params?: number; hiddenSize?: number; numLayers?: number; numHeads?: number }): MemoryBreakdown {
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
 * 微调显存计算 - 通用LLM框架（支持全量和PEFT）
 * 总显存 = 模型权重 + 优化器状态 + 梯度 + 激活值 + 其他开销
 */
export function calculateFineTuningMemory(config: FineTuningConfig, modelInfo?: { params?: number; hiddenSize?: number; numLayers?: number }): MemoryBreakdown {
  const { method, loraRank = 4, quantization, precision } = config;
  
  // 从模型信息获取参数，如果没有则使用默认值
  const baseModelParams = modelInfo?.params || 7; // 参数量（B）
  const hiddenSize = modelInfo?.hiddenSize || 4096;
  const numLayers = modelInfo?.numLayers || 32;
  const quantizationRatio = getQuantizationRatio(quantization);
  
  // === 通用LLM显存公式 ===
  
  // 1. 模型权重 (Model Weights)
  const modelPrecisionBytes = getPrecisionBytes(precision);
  
  // 2-3. 优化器状态和梯度：关键区别在于P_train（可训练参数量）
  let modelWeightsGB = 0;
  let trainableParams = 0; // P_train
  let activationsGB = 0;
  
  switch (method) {
    case 'Full':
      // 全量微调：P_train = P_total
      modelWeightsGB = (baseModelParams * 1e9 * modelPrecisionBytes) / (1024 ** 3);
      trainableParams = baseModelParams;
      activationsGB = calculateActivations(2, 2048, hiddenSize, numLayers, precision); // 使用合理的默认值
      break;
      
    case 'LoRA':
      // LoRA微调：基础模型 + 小LoRA参数
      modelWeightsGB = (baseModelParams * 1e9 * modelPrecisionBytes) / (1024 ** 3);
      trainableParams = calculateLoRAParams(baseModelParams, loraRank); // P_train极小
      activationsGB = calculateActivations(2, 2048, hiddenSize, numLayers, precision) * 0.8; // LoRA稍微减少激活值
      break;
      
    case 'QLoRA':
      // QLoRA：量化基础模型 + LoRA参数
      modelWeightsGB = (baseModelParams * 1e9 * modelPrecisionBytes * quantizationRatio) / (1024 ** 3);
      trainableParams = calculateLoRAParams(baseModelParams, loraRank); // P_train极小
      activationsGB = calculateActivations(2, 2048, hiddenSize, numLayers, precision) * 0.6; // QLoRA进一步减少
      break;
      
    case 'Prefix':
      // Prefix Tuning：约1%参数可训练
      modelWeightsGB = (baseModelParams * 1e9 * modelPrecisionBytes) / (1024 ** 3);
      trainableParams = baseModelParams * 0.01; // 1%的参数量
      activationsGB = calculateActivations(2, 2048, hiddenSize, numLayers, precision) * 0.7;
      break;
  }
  
  // 2. 优化器状态 (Optimizer States) - 基于P_train
  const optimizerPrecisionBytes = getPrecisionBytes('FP32'); // 优化器状态用FP32
  const optimizerGB = (trainableParams * 1e9 * optimizerPrecisionBytes * 2) / (1024 ** 3); // AdamW需要2倍
  
  // 3. 梯度 (Gradients) - 基于P_train
  const gradientPrecisionBytes = getPrecisionBytes(precision);
  const gradientsGB = (trainableParams * 1e9 * gradientPrecisionBytes) / (1024 ** 3);
  
  // 5. 其他开销 (Misc Overheads)
  const otherOverheadGB = 1.0; // 微调通常比训练开销小
  
  const total = modelWeightsGB + optimizerGB + gradientsGB + activationsGB + otherOverheadGB;
  
  return {
    modelParams: modelWeightsGB,
    gradients: gradientsGB,
    optimizer: optimizerGB,
    activations: activationsGB,
    kvCache: 0,
    total,
    breakdown: [
      { label: '模型权重', value: modelWeightsGB, percentage: (modelWeightsGB / total) * 100, color: '#3B82F6' },
      { label: '优化器状态', value: optimizerGB, percentage: (optimizerGB / total) * 100, color: '#F59E0B' },
      { label: '梯度', value: gradientsGB, percentage: (gradientsGB / total) * 100, color: '#10B981' },
      { label: '激活值', value: activationsGB, percentage: (activationsGB / total) * 100, color: '#EF4444' },
      { label: '其他开销', value: otherOverheadGB, percentage: (otherOverheadGB / total) * 100, color: '#6B7280' },
    ],
    // 附加信息
    metadata: {
      trainableParams,
      totalParams: baseModelParams,
      trainableRatio: (trainableParams / baseModelParams) * 100,
      methodInfo: `${method} (可训练参数: ${(trainableParams / baseModelParams * 100).toFixed(2)}%)`
    }
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
 * GRPO显存计算 - 按照正确的通用LLM框架实现
 * Group-wise Ranking Preference Optimization
 * 核心特点：激活值显存 = k × SFT_Activations，其中k是偏好组大小
 */
export function calculateGRPOMemory(config: GRPOConfig, modelInfo?: { params?: number; hiddenSize?: number; numLayers?: number; numHeads?: number }): MemoryBreakdown {
  const { precision, batchSize, numGenerations, sequenceLength, use8BitOptimizer, gradientCheckpointing } = config;
  
  // 从模型信息获取参数，如果没有则使用默认值
  const modelParams = modelInfo?.params || 7; // 参数量（B）
  const hiddenSize = modelInfo?.hiddenSize || 4096;
  const numLayers = modelInfo?.numLayers || 32;
  
  // === 通用LLM显存公式 ===
  // VRAM ≈ 模型权重 + 优化器状态 + 梯度 + 激活值 + 其他开销
  
  // 1. 模型权重 (Model Weights) - 使用PEFT方法（如QLoRA）
  const modelPrecisionBytes = getPrecisionBytes(precision);
  const quantizationRatio = 0.125; // 假设使用INT4量化（8倍压缩）
  const modelWeightsGB = (modelParams * 1e9 * modelPrecisionBytes * quantizationRatio) / (1024 ** 3);
  
  // 2. 优化器状态 (Optimizer States) - P_train极小（PEFT）
  // GRPO通常使用PEFT方法，P_train << P_total
  const trainableParams = modelParams * 0.01; // 1%的参数量（LoRA等PEFT方法）
  const optimizerPrecisionBytes = getPrecisionBytes('FP32'); // 优化器状态用FP32
  const optimizerMultiplier = use8BitOptimizer ? 1 : 2; // AdamW需要2倍（一阶+二阶动量）
  const optimizerGB = (trainableParams * 1e9 * optimizerPrecisionBytes * optimizerMultiplier) / (1024 ** 3);
  
  // 3. 梯度 (Gradients) - 只针对可训练参数
  const gradientPrecisionBytes = getPrecisionBytes(precision);
  const gradientsGB = (trainableParams * 1e9 * gradientPrecisionBytes) / (1024 ** 3);
  
  // 4. 激活值 (Activations) - GRPO的核心特点
  // GRPO激活值 = k × SFT激活值，其中k是偏好组大小
  const k = numGenerations; // 偏好组大小：1个chosen + (k-1)个rejected
  
  // 基础SFT激活值计算
  const sftActivationsGB = calculateActivations(batchSize, sequenceLength, hiddenSize, numLayers, precision);
  
  // 应用梯度检查点优化
  const gradientCheckpointMultiplier = gradientCheckpointing ? 0.3 : 1.0; // 梯度检查点减少70%
  
  // GRPO激活值 = k倍基础激活值
  const grpoActivationsGB = k * sftActivationsGB * gradientCheckpointMultiplier;
  
  // 5. 其他开销 (Misc Overheads)
  const otherOverheadGB = 2.0; // CUDA上下文、临时变量、框架开销等
  
  const total = modelWeightsGB + optimizerGB + gradientsGB + grpoActivationsGB + otherOverheadGB;
  
  return {
    modelParams: modelWeightsGB,
    gradients: gradientsGB,
    optimizer: optimizerGB,
    activations: grpoActivationsGB,
    kvCache: 0, // GRPO训练时通常不使用KV缓存
    total,
    breakdown: [
      { label: '模型权重', value: modelWeightsGB, percentage: (modelWeightsGB / total) * 100, color: '#3B82F6' },
      { label: '激活值 (k=' + k + '倍)', value: grpoActivationsGB, percentage: (grpoActivationsGB / total) * 100, color: '#EF4444' },
      { label: '优化器状态', value: optimizerGB, percentage: (optimizerGB / total) * 100, color: '#F59E0B' },
      { label: '梯度', value: gradientsGB, percentage: (gradientsGB / total) * 100, color: '#10B981' },
      { label: '其他开销', value: otherOverheadGB, percentage: (otherOverheadGB / total) * 100, color: '#6B7280' },
    ],
    // 附加信息：GRPO特有的参数
    metadata: {
      groupSize: k,
      sftActivationsGB: sftActivationsGB,
      activationMultiplier: k * gradientCheckpointMultiplier,
      trainableParams,
      totalParams: modelParams,
      methodInfo: `GRPO (Group Size=${k}, 激活值=${k}倍SFT)`
    }
  };
}

/**
 * 多模态显存计算 - 按照正确的通用框架重新实现
 * 总显存占用 = A(模型显存) + B(优化器状态) + C(梯度) + D(激活值) + E(其他开销)
 */
export function calculateMultimodalMemory(config: MultimodalConfig, modelInfo?: { params?: number; hiddenSize?: number; numLayers?: number; numHeads?: number }): MemoryBreakdown {
  const { mode, modalityType, textPrecision, batchSize, sequenceLength, 
          imageResolution, patchSize, numImages,
          audioWindowLength, videoFrameRate, videoLength } = config;
  
  // 从模型信息获取参数，如果没有则使用默认值
  const modelParams = modelInfo?.params || 7; // 参数量（B）
  const hiddenSize = modelInfo?.hiddenSize || 4096;
  const numLayers = modelInfo?.numLayers || 32;
  
  // A. 模型显存 (Model Parameters VRAM)
  const modelPrecisionBytes = getPrecisionBytes(textPrecision);
  const modelParamsGB = (modelParams * 1e9 * modelPrecisionBytes) / (1024 ** 3);
  
  // 计算不同模态的序列长度组成
  const textSeqLength = sequenceLength;
  let imageSeqLength = 0;
  let audioSeqLength = 0;
  let videoSeqLength = 0;
  
  // 图像序列长度 = (H / patch_size) × (W / patch_size) × num_images
  if (modalityType?.includes('image')) {
    const patchesPerImage = Math.pow(imageResolution / patchSize, 2);
    imageSeqLength = patchesPerImage * numImages;
  }
  
  // 音频序列长度 = 从声谱图切分出的Patch数量
  if (modalityType?.includes('audio')) {
    const windowLength = audioWindowLength || 30;
    // 音频通常每80ms产生一个patch，转换为序列长度
    audioSeqLength = Math.floor((windowLength * 1000) / 80);
  }
  
  // 视频序列长度 = num_frames × patches_per_frame
  if (modalityType?.includes('video')) {
    const frameRate = videoFrameRate || 25;
    const length = videoLength || 10;
    const totalFrames = frameRate * length;
    const patchesPerFrame = Math.pow(imageResolution / patchSize, 2);
    videoSeqLength = totalFrames * patchesPerFrame;
  }
  
  // 总序列长度 = 各模态序列长度之和
  const totalSequenceLength = textSeqLength + imageSeqLength + audioSeqLength + videoSeqLength;
  
  // B. 优化器状态显存 + C. 梯度显存
  let optimizerGB = 0;
  let gradientsGB = 0;
  let trainableParams = 0; // P_train：需要训练的参数量
  
  if (mode === 'training') {
    // 全量微调：P_train = P_total
    trainableParams = modelParams;
    gradientsGB = (trainableParams * 1e9 * getPrecisionBytes(textPrecision)) / (1024 ** 3);
    optimizerGB = (trainableParams * 1e9 * getPrecisionBytes('FP32') * 2) / (1024 ** 3); // AdamW需要2倍
  } else if (mode === 'finetuning') {
    // PEFT微调：P_train 极小 (通常 < 1% 的 P_total)
    // 这里假设使用LoRA等PEFT方法，只训练很少的参数
    trainableParams = modelParams * 0.01; // 1%的参数量
    gradientsGB = (trainableParams * 1e9 * getPrecisionBytes(textPrecision)) / (1024 ** 3);
    optimizerGB = (trainableParams * 1e9 * getPrecisionBytes('FP32') * 2) / (1024 ** 3);
  }
  // 推理模式：trainableParams = 0，梯度和优化器都为0
  
  // D. 激活值显存 (Activations VRAM) - 多模态的核心计算
  // 概念公式: Batch_Size × Total_Sequence_Length × Hidden_Dim × Num_Layers × precision_bytes
  const activationPrecisionBytes = getPrecisionBytes(textPrecision);
  const activationsGB = (batchSize * totalSequenceLength * hiddenSize * numLayers * activationPrecisionBytes) / (1024 ** 3);
  
  // E. 其他开销 - CUDA上下文、临时变量、框架开销等
  const otherOverheadGB = 1.5; // 1.5GB固定开销
  
  const total = modelParamsGB + optimizerGB + gradientsGB + activationsGB + otherOverheadGB;
  
  // 构建breakdown数组
  const breakdown = [
    { label: '模型参数', value: modelParamsGB, percentage: (modelParamsGB / total) * 100, color: '#3B82F6' }
  ];
  
  if (optimizerGB > 0) {
    breakdown.push({ label: '优化器状态', value: optimizerGB, percentage: (optimizerGB / total) * 100, color: '#F59E0B' });
  }
  
  if (gradientsGB > 0) {
    breakdown.push({ label: '梯度', value: gradientsGB, percentage: (gradientsGB / total) * 100, color: '#10B981' });
  }
  
  breakdown.push({ label: '激活值', value: activationsGB, percentage: (activationsGB / total) * 100, color: '#EF4444' });
  breakdown.push({ label: '其他开销', value: otherOverheadGB, percentage: (otherOverheadGB / total) * 100, color: '#6B7280' });
  
  // 添加序列长度分解信息（用于调试和用户理解）
  const sequenceBreakdown = [];
  if (textSeqLength > 0) {
    sequenceBreakdown.push({ label: '文本Token', value: textSeqLength, color: '#3B82F6' });
  }
  if (imageSeqLength > 0) {
    sequenceBreakdown.push({ label: '图像Patch', value: imageSeqLength, color: '#10B981' });
  }
  if (audioSeqLength > 0) {
    sequenceBreakdown.push({ label: '音频Patch', value: audioSeqLength, color: '#F97316' });
  }
  if (videoSeqLength > 0) {
    sequenceBreakdown.push({ label: '视频Patch', value: videoSeqLength, color: '#EC4899' });
  }

  return {
    modelParams: modelParamsGB,
    gradients: gradientsGB,
    optimizer: optimizerGB,
    activations: activationsGB,
    kvCache: 0, // 多模态训练通常不需要KV缓存
    total,
    breakdown,
    // 附加信息：序列长度分解
    metadata: {
      totalSequenceLength,
      textSeqLength,
      imageSeqLength,
      audioSeqLength,
      videoSeqLength,
      trainableParams,
      totalParams: modelParams,
      sequenceBreakdown
    }
  };
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