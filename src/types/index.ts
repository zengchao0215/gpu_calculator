// 数值精度类型
export type PrecisionType = 'FP32' | 'FP16' | 'BF16' | 'FP8';

// 优化器类型
export type OptimizerType = 'SGD' | 'Adam' | 'AdamW';

// 微调方法类型
export type FineTuningMethod = 'Full' | 'LoRA' | 'QLoRA' | 'Prefix';

// 量化类型
export type QuantizationType = 'None' | 'INT8' | 'INT4' | 'FP8';

// 计算器类型
export type CalculatorType = 'training' | 'inference' | 'finetuning' | 'grpo' | 'multimodal';

// 添加主分组类型
export type PrimaryTab = 'nlp' | 'multimodal';

// 多模态模式类型
export type MultimodalMode = 'training' | 'inference' | 'finetuning';

// 定义每个主分组包含的计算器类型
export const NLP_CALCULATOR_TYPES: CalculatorType[] = ['training', 'inference', 'finetuning', 'grpo'];
export const MULTIMODAL_CALCULATOR_TYPES: MultimodalMode[] = ['training', 'inference', 'finetuning'];

// 多模态类型扩展
export type ModalityType = 'text-image' | 'text-audio' | 'text-video' | 'audio-video' | 'text-audio-video';

// GPU类型
export interface GPU {
  id: string;
  name: string;
  memory: number; // GB
  architecture: string;
  computeCapability: string;
  price: number; // USD
  cloudPrice?: number; // USD/hour
  features?: string[]; // GPU特性列表
}

// 模型信息
export interface ModelInfo {
  id: string;
  name: string;
  params: number; // billions
  architecture: string; // transformer, multimodal, moe, glm, embedding, reranker, etc.
  hiddenSize: number;
  numLayers: number;
  numHeads: number;
  vocabSize: number;
  activeParams?: number; // billions, for MoE models
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

// GRPO配置
export interface GRPOConfig {
  modelId: string;
  precision: PrecisionType;
  batchSize: number;
  sequenceLength: number;
  numGenerations: number; // 每个提示生成的响应数量
  maxPromptLength: number;
  maxCompletionLength: number;
  gradientAccumulationSteps: number;
  use8BitOptimizer: boolean;
  gradientCheckpointing: boolean;
}

// 多模态配置
export interface MultimodalConfig {
  modelId: string;
  mode: MultimodalMode; // 多模态模式：训练/推理/微调
  modalityType: ModalityType; // 模态类型
  textPrecision: PrecisionType;
  visionPrecision: PrecisionType;
  audioPrecision?: PrecisionType; // 音频精度
  batchSize: number;
  sequenceLength: number;
  // 图像相关配置
  imageResolution: number; // 图像分辨率 (eg. 224, 336, 448)
  patchSize: number; // patch大小 (eg. 14, 16)
  numImages: number; // 每个样本的图像数量
  hasVisionEncoder: boolean; // 是否有独立的视觉编码器
  // 音频相关配置
  audioSampleRate?: number; // 音频采样率 (eg. 16000, 44100)
  audioWindowLength?: number; // 音频窗口长度(秒)
  hasAudioEncoder?: boolean; // 是否有独立的音频编码器
  // 视频相关配置
  videoFrameRate?: number; // 视频帧率
  videoLength?: number; // 视频长度(秒)
  hasVideoEncoder?: boolean; // 是否有独立的视频编码器
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
  // 可选的元数据信息（用于多模态等特殊计算）
  metadata?: {
    // 多模态相关
    totalSequenceLength?: number;
    textSeqLength?: number;
    imageSeqLength?: number;
    audioSeqLength?: number;
    videoSeqLength?: number;
    sequenceBreakdown?: {
      label: string;
      value: number;
      color: string;
    }[];
    // 通用参数信息
    trainableParams?: number;
    totalParams?: number;
    trainableRatio?: number;
    methodInfo?: string;
    // GRPO特有
    groupSize?: number;
    sftActivationsGB?: number;
    activationMultiplier?: number;
  };
}

// GPU推荐结果
export interface GPURecommendation {
  gpu: GPU;
  fitScore: number;
  warnings: string[];
  suggestions: string[];
} 