// 精度类型
export type PrecisionType = 'FP32' | 'FP16' | 'BF16' | 'INT8' | 'INT4';

// 优化器类型
export type OptimizerType = 'SGD' | 'Adam' | 'AdamW';

// 微调方法类型
export type FineTuningMethod = 'Full' | 'LoRA' | 'QLoRA' | 'Prefix';

// 量化类型
export type QuantizationType = 'None' | 'INT8' | 'INT4' | 'FP8';

// 计算器类型
export type CalculatorType = 'training' | 'inference' | 'finetuning';

// GPU类型
export interface GPU {
  id: string;
  name: string;
  memory: number; // GB
  price: number; // USD
  cloudPrice?: number; // USD/hour
  architecture: string;
  computeCapability: string;
  suitable: boolean;
  utilizationRate: number;
}

// 模型信息
export interface ModelInfo {
  id: string;
  name: string;
  params: number; // billions
  architecture: string;
  hiddenSize: number;
  numLayers: number;
  numHeads: number;
  vocabSize: number;
}

// 训练配置
export interface TrainingConfig {
  modelParams: number;
  batchSize: number;
  sequenceLength: number;
  precision: PrecisionType;
  optimizer: OptimizerType;
  gradientCheckpointing: boolean;
  mixedPrecision: boolean;
}

// 推理配置
export interface InferenceConfig {
  modelId: string;
  precision: PrecisionType;
  quantization: QuantizationType;
  batchSize: number;
  sequenceLength: number;
  kvCacheRatio: number;
}

// 微调配置
export interface FineTuningConfig {
  baseModel: string;
  method: FineTuningMethod;
  loraRank?: number;
  loraAlpha?: number;
  quantization: QuantizationType;
  precision: PrecisionType;
}

// 显存计算结果
export interface MemoryBreakdown {
  modelParams: number;
  gradients: number;
  optimizer: number;
  activations: number;
  kvCache: number;
  total: number;
  breakdown: {
    label: string;
    value: number;
    percentage: number;
    color: string;
  }[];
}

// GPU推荐结果
export interface GPURecommendation {
  gpu: GPU;
  fitScore: number;
  warnings: string[];
  suggestions: string[];
} 