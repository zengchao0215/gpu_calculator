import { TrainingConfig, InferenceConfig, FineTuningConfig } from '@/types';

export interface ConfigPreset {
  id: string;
  name: string;
  description: string;
  category: 'beginner' | 'professional' | 'enterprise' | 'research';
  tags: string[];
  config: TrainingConfig | InferenceConfig | FineTuningConfig;
  type: 'training' | 'inference' | 'finetuning';
  estimatedMemory: number;
  recommendedGPU: string[];
}

// 训练预设
export const trainingPresets: ConfigPreset[] = [
  {
    id: 'training-beginner-1b',
    name: '入门训练 - 1B模型',
    description: '适合初学者的小型模型训练配置，显存需求低',
    category: 'beginner',
    tags: ['初学者', '低显存', '快速训练'],
    type: 'training',
    estimatedMemory: 8,
    recommendedGPU: ['RTX 4060', 'RTX 4070'],
    config: {
      modelParams: 1,
      batchSize: 2,
      sequenceLength: 1024,
      precision: 'FP16',
      optimizer: 'AdamW',
      gradientCheckpointing: true,
      mixedPrecision: true
    } as TrainingConfig
  },
  {
    id: 'training-professional-7b',
    name: '专业训练 - 7B模型',
    description: '适合专业开发者的中型模型训练，平衡性能与显存',
    category: 'professional',
    tags: ['专业', '平衡配置', '7B模型'],
    type: 'training',
    estimatedMemory: 32,
    recommendedGPU: ['RTX 4090', 'H100 PCIe'],
    config: {
      modelParams: 7,
      batchSize: 4,
      sequenceLength: 2048,
      precision: 'FP16',
      optimizer: 'AdamW',
      gradientCheckpointing: true,
      mixedPrecision: true
    } as TrainingConfig
  },
  {
    id: 'training-enterprise-13b',
    name: '企业训练 - 13B模型',
    description: '企业级大模型训练配置，需要高端GPU集群',
    category: 'enterprise',
    tags: ['企业级', '大模型', '高性能'],
    type: 'training',
    estimatedMemory: 80,
    recommendedGPU: ['H100 SXM', 'H200 SXM'],
    config: {
      modelParams: 13,
      batchSize: 8,
      sequenceLength: 4096,
      precision: 'BF16',
      optimizer: 'AdamW',
      gradientCheckpointing: true,
      mixedPrecision: true
    } as TrainingConfig
  },
  {
    id: 'training-research-70b',
    name: '研究训练 - 70B模型',
    description: '科研级超大模型训练，需要多GPU并行',
    category: 'research',
    tags: ['科研', '超大模型', '多GPU'],
    type: 'training',
    estimatedMemory: 320,
    recommendedGPU: ['H200 SXM', 'H100 SXM'],
    config: {
      modelParams: 70,
      batchSize: 16,
      sequenceLength: 8192,
      precision: 'BF16',
      optimizer: 'AdamW',
      gradientCheckpointing: true,
      mixedPrecision: true
    } as TrainingConfig
  }
];

// 推理预设
export const inferencePresets: ConfigPreset[] = [
  {
    id: 'inference-chatbot-3b',
    name: '聊天机器人 - 3B模型',
    description: '适合个人聊天机器人的轻量级推理配置',
    category: 'beginner',
    tags: ['聊天机器人', '轻量级', '实时响应'],
    type: 'inference',
    estimatedMemory: 6,
    recommendedGPU: ['RTX 4060', 'RTX 4060 Ti'],
    config: {
      modelId: 'custom-3b',
      precision: 'FP16',
      quantization: 'INT8',
      batchSize: 1,
      sequenceLength: 2048,
      kvCacheRatio: 1.0
    } as InferenceConfig
  },
  {
    id: 'inference-assistant-7b',
    name: '智能助手 - 7B模型',
    description: '专业AI助手推理配置，支持复杂对话',
    category: 'professional',
    tags: ['智能助手', '复杂对话', '高质量'],
    type: 'inference',
    estimatedMemory: 14,
    recommendedGPU: ['RTX 4070', 'RTX 4080'],
    config: {
      modelId: 'qwen2.5-7b',
      precision: 'FP16',
      quantization: 'INT8',
      batchSize: 2,
      sequenceLength: 4096,
      kvCacheRatio: 1.0
    } as InferenceConfig
  },
  {
    id: 'inference-batch-14b',
    name: '批量处理 - 14B模型',
    description: '企业级批量文本处理推理配置',
    category: 'enterprise',
    tags: ['批量处理', '企业级', '高吞吐'],
    type: 'inference',
    estimatedMemory: 28,
    recommendedGPU: ['RTX 4090', 'H100 PCIe'],
    config: {
      modelId: 'qwen2.5-14b',
      precision: 'FP16',
      quantization: 'INT4',
      batchSize: 8,
      sequenceLength: 2048,
      kvCacheRatio: 1.0
    } as InferenceConfig
  },
  {
    id: 'inference-research-72b',
    name: '研究推理 - 72B模型',
    description: '研究级大模型推理，最高质量输出',
    category: 'research',
    tags: ['研究级', '大模型', '最高质量'],
    type: 'inference',
    estimatedMemory: 144,
    recommendedGPU: ['H100 SXM', 'H200 SXM'],
    config: {
      modelId: 'qwen2.5-72b',
      precision: 'FP16',
      quantization: 'INT8',
      batchSize: 1,
      sequenceLength: 8192,
      kvCacheRatio: 1.0
    } as InferenceConfig
  }
];

// 微调预设
export const fineTuningPresets: ConfigPreset[] = [
  {
    id: 'finetune-lora-3b',
    name: 'LoRA微调 - 3B模型',
    description: '高效的LoRA微调，显存占用极低',
    category: 'beginner',
    tags: ['LoRA', '高效微调', '低显存'],
    type: 'finetuning',
    estimatedMemory: 8,
    recommendedGPU: ['RTX 4060', 'RTX 4070'],
    config: {
      baseModel: 'custom-3b',
      method: 'LoRA',
      quantization: 'None',
      precision: 'FP16',
      loraRank: 16,
      loraAlpha: 32
    } as FineTuningConfig
  },
  {
    id: 'finetune-qlora-7b',
    name: 'QLoRA微调 - 7B模型',
    description: '量化LoRA微调，内存效率最高',
    category: 'professional',
    tags: ['QLoRA', '量化', '内存高效'],
    type: 'finetuning',
    estimatedMemory: 12,
    recommendedGPU: ['RTX 4070', 'RTX 4080'],
    config: {
      baseModel: 'qwen2.5-7b',
      method: 'QLoRA',
      quantization: 'INT4',
      precision: 'FP16',
      loraRank: 32,
      loraAlpha: 64
    } as FineTuningConfig
  },
  {
    id: 'finetune-full-13b',
    name: '全参数微调 - 13B模型',
    description: '完整模型参数微调，获得最佳效果',
    category: 'enterprise',
    tags: ['全参数', '最佳效果', '企业级'],
    type: 'finetuning',
    estimatedMemory: 52,
    recommendedGPU: ['H100 PCIe', 'H100 SXM'],
    config: {
      baseModel: 'qwen2.5-14b',
      method: 'Full',
      quantization: 'None',
      precision: 'BF16'
    } as FineTuningConfig
  }
];

// 获取所有预设
export const getAllPresets = (): ConfigPreset[] => [
  ...trainingPresets,
  ...inferencePresets,
  ...fineTuningPresets
];

// 按类型获取预设
export const getPresetsByType = (type: 'training' | 'inference' | 'finetuning'): ConfigPreset[] => {
  switch (type) {
    case 'training':
      return trainingPresets;
    case 'inference':
      return inferencePresets;
    case 'finetuning':
      return fineTuningPresets;
    default:
      return [];
  }
};

// 按分类获取预设
export const getPresetsByCategory = (category: ConfigPreset['category']): ConfigPreset[] => {
  return getAllPresets().filter(preset => preset.category === category);
};

// 搜索预设
export const searchPresets = (query: string): ConfigPreset[] => {
  const lowercaseQuery = query.toLowerCase();
  return getAllPresets().filter(preset => 
    preset.name.toLowerCase().includes(lowercaseQuery) ||
    preset.description.toLowerCase().includes(lowercaseQuery) ||
    preset.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}; 