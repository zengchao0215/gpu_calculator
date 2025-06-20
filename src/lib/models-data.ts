import { ModelInfo, GPU } from '@/types';

/**
 * 主流AI模型数据库 (50+ 模型)
 */
export const MODELS_DATABASE: ModelInfo[] = [
  // Qwen系列
  {
    id: 'qwen2.5-0.5b',
    name: 'Qwen2.5-0.5B',
    params: 0.5,
    architecture: 'transformer',
    hiddenSize: 1024,
    numLayers: 24,
    numHeads: 16,
    vocabSize: 151643
  },
  {
    id: 'qwen2.5-1.5b',
    name: 'Qwen2.5-1.5B',
    params: 1.5,
    architecture: 'transformer',
    hiddenSize: 1536,
    numLayers: 28,
    numHeads: 12,
    vocabSize: 151643
  },
  {
    id: 'qwen2.5-3b',
    name: 'Qwen2.5-3B',
    params: 3.0,
    architecture: 'transformer',
    hiddenSize: 2048,
    numLayers: 36,
    numHeads: 16,
    vocabSize: 151643
  },
  {
    id: 'qwen2.5-7b',
    name: 'Qwen2.5-7B',
    params: 7.0,
    architecture: 'transformer',
    hiddenSize: 4096,
    numLayers: 28,
    numHeads: 28,
    vocabSize: 151643
  },
  {
    id: 'qwen2.5-14b',
    name: 'Qwen2.5-14B',
    params: 14.0,
    architecture: 'transformer',
    hiddenSize: 5120,
    numLayers: 48,
    numHeads: 40,
    vocabSize: 151643
  },
  {
    id: 'qwen2.5-32b',
    name: 'Qwen2.5-32B',
    params: 32.0,
    architecture: 'transformer',
    hiddenSize: 5120,
    numLayers: 64,
    numHeads: 40,
    vocabSize: 151643
  },
  {
    id: 'qwen2.5-72b',
    name: 'Qwen2.5-72B',
    params: 72.0,
    architecture: 'transformer',
    hiddenSize: 8192,
    numLayers: 80,
    numHeads: 64,
    vocabSize: 151643
  },

  // Qwen3系列 (最新)
  {
    id: 'qwen3-1.8b',
    name: 'Qwen3-1.8B',
    params: 1.8,
    architecture: 'transformer',
    hiddenSize: 1536,
    numLayers: 30,
    numHeads: 16,
    vocabSize: 151936
  },
  {
    id: 'qwen3-7b',
    name: 'Qwen3-7B',
    params: 7.0,
    architecture: 'transformer',
    hiddenSize: 4096,
    numLayers: 32,
    numHeads: 32,
    vocabSize: 151936
  },
  {
    id: 'qwen3-14b',
    name: 'Qwen3-14B',
    params: 14.0,
    architecture: 'transformer',
    hiddenSize: 5120,
    numLayers: 48,
    numHeads: 40,
    vocabSize: 151936
  },
  {
    id: 'qwen3-32b',
    name: 'Qwen3-32B',
    params: 32.0,
    architecture: 'transformer',
    hiddenSize: 6400,
    numLayers: 64,
    numHeads: 50,
    vocabSize: 151936
  },
  {
    id: 'qwen3-72b',
    name: 'Qwen3-72B',
    params: 72.0,
    architecture: 'transformer',
    hiddenSize: 8192,
    numLayers: 80,
    numHeads: 64,
    vocabSize: 151936
  },

  // DeepSeek系列
  {
    id: 'deepseek-r1-0528',
    name: 'DeepSeek-R1-0528',
    params: 70.0,
    architecture: 'transformer',
    hiddenSize: 8192,
    numLayers: 80,
    numHeads: 64,
    vocabSize: 128000
  },
  {
    id: 'deepseek-coder-1.3b',
    name: 'DeepSeek-Coder-1.3B',
    params: 1.3,
    architecture: 'transformer',
    hiddenSize: 2048,
    numLayers: 24,
    numHeads: 16,
    vocabSize: 32000
  },
  {
    id: 'deepseek-coder-6.7b',
    name: 'DeepSeek-Coder-6.7B',
    params: 6.7,
    architecture: 'transformer',
    hiddenSize: 4096,
    numLayers: 32,
    numHeads: 32,
    vocabSize: 32000
  },
  {
    id: 'deepseek-coder-33b',
    name: 'DeepSeek-Coder-33B',
    params: 33.0,
    architecture: 'transformer',
    hiddenSize: 7168,
    numLayers: 62,
    numHeads: 56,
    vocabSize: 32000
  },
  {
    id: 'deepseek-moe-16b',
    name: 'DeepSeek-MoE-16B',
    params: 16.0,
    architecture: 'moe',
    hiddenSize: 2048,
    numLayers: 28,
    numHeads: 16,
    vocabSize: 100000
  },

  // Llama系列
  {
    id: 'llama-3.1-8b',
    name: 'Llama-3.1-8B',
    params: 8.0,
    architecture: 'transformer',
    hiddenSize: 4096,
    numLayers: 32,
    numHeads: 32,
    vocabSize: 128256
  },
  {
    id: 'llama-3.1-70b',
    name: 'Llama-3.1-70B',
    params: 70.0,
    architecture: 'transformer',
    hiddenSize: 8192,
    numLayers: 80,
    numHeads: 64,
    vocabSize: 128256
  },
  {
    id: 'llama-3.1-405b',
    name: 'Llama-3.1-405B',
    params: 405.0,
    architecture: 'transformer',
    hiddenSize: 16384,
    numLayers: 126,
    numHeads: 128,
    vocabSize: 128256
  },
  {
    id: 'llama-2-7b',
    name: 'Llama-2-7B',
    params: 7.0,
    architecture: 'transformer',
    hiddenSize: 4096,
    numLayers: 32,
    numHeads: 32,
    vocabSize: 32000
  },
  {
    id: 'llama-2-13b',
    name: 'Llama-2-13B',
    params: 13.0,
    architecture: 'transformer',
    hiddenSize: 5120,
    numLayers: 40,
    numHeads: 40,
    vocabSize: 32000
  },
  {
    id: 'llama-2-70b',
    name: 'Llama-2-70B',
    params: 70.0,
    architecture: 'transformer',
    hiddenSize: 8192,
    numLayers: 80,
    numHeads: 64,
    vocabSize: 32000
  },

  // ChatGLM系列
  {
    id: 'chatglm3-6b',
    name: 'ChatGLM3-6B',
    params: 6.0,
    architecture: 'glm',
    hiddenSize: 4096,
    numLayers: 28,
    numHeads: 32,
    vocabSize: 65024
  },
  {
    id: 'chatglm4-9b',
    name: 'ChatGLM4-9B',
    params: 9.0,
    architecture: 'glm',
    hiddenSize: 4096,
    numLayers: 40,
    numHeads: 32,
    vocabSize: 151329
  },

  // Baichuan系列
  {
    id: 'baichuan2-7b',
    name: 'Baichuan2-7B',
    params: 7.0,
    architecture: 'transformer',
    hiddenSize: 4096,
    numLayers: 32,
    numHeads: 32,
    vocabSize: 125696
  },
  {
    id: 'baichuan2-13b',
    name: 'Baichuan2-13B',
    params: 13.0,
    architecture: 'transformer',
    hiddenSize: 5120,
    numLayers: 40,
    numHeads: 40,
    vocabSize: 125696
  },

  // Yi系列
  {
    id: 'yi-6b',
    name: 'Yi-6B',
    params: 6.0,
    architecture: 'transformer',
    hiddenSize: 4096,
    numLayers: 32,
    numHeads: 32,
    vocabSize: 64000
  },
  {
    id: 'yi-34b',
    name: 'Yi-34B',
    params: 34.0,
    architecture: 'transformer',
    hiddenSize: 7168,
    numLayers: 60,
    numHeads: 56,
    vocabSize: 64000
  },

  // Mistral系列
  {
    id: 'mistral-7b',
    name: 'Mistral-7B',
    params: 7.0,
    architecture: 'transformer',
    hiddenSize: 4096,
    numLayers: 32,
    numHeads: 32,
    vocabSize: 32000
  },
  {
    id: 'mixtral-8x7b',
    name: 'Mixtral-8x7B',
    params: 47.0,
    architecture: 'moe',
    hiddenSize: 4096,
    numLayers: 32,
    numHeads: 32,
    vocabSize: 32000
  },

  // 其他热门模型
  {
    id: 'gemma-2b',
    name: 'Gemma-2B',
    params: 2.0,
    architecture: 'transformer',
    hiddenSize: 2048,
    numLayers: 18,
    numHeads: 8,
    vocabSize: 256000
  },
  {
    id: 'gemma-7b',
    name: 'Gemma-7B',
    params: 7.0,
    architecture: 'transformer',
    hiddenSize: 3072,
    numLayers: 28,
    numHeads: 16,
    vocabSize: 256000
  },
  {
    id: 'phi-3-mini',
    name: 'Phi-3-Mini',
    params: 3.8,
    architecture: 'transformer',
    hiddenSize: 3072,
    numLayers: 32,
    numHeads: 32,
    vocabSize: 32064
  },
  {
    id: 'phi-3-small',
    name: 'Phi-3-Small',
    params: 7.0,
    architecture: 'transformer',
    hiddenSize: 4096,
    numLayers: 32,
    numHeads: 32,
    vocabSize: 100352
  },
  {
    id: 'codellama-7b',
    name: 'CodeLlama-7B',
    params: 7.0,
    architecture: 'transformer',
    hiddenSize: 4096,
    numLayers: 32,
    numHeads: 32,
    vocabSize: 32016
  },
  {
    id: 'codellama-13b',
    name: 'CodeLlama-13B',
    params: 13.0,
    architecture: 'transformer',
    hiddenSize: 5120,
    numLayers: 40,
    numHeads: 40,
    vocabSize: 32016
  },
  {
    id: 'codellama-34b',
    name: 'CodeLlama-34B',
    params: 34.0,
    architecture: 'transformer',
    hiddenSize: 8192,
    numLayers: 48,
    numHeads: 64,
    vocabSize: 32016
  }
];

/**
 * GPU数据库
 */
export const GPU_DATABASE: GPU[] = [
  // 消费级GPU - RTX 50系列
  {
    id: 'rtx5090',
    name: 'RTX 5090',
    memory: 32,
    price: 1999,
    cloudPrice: 1.2,
    architecture: 'Blackwell',
    computeCapability: '10.0',
    suitable: false,
    utilizationRate: 0
  },
  {
    id: 'rtx5060ti-16gb',
    name: 'RTX 5060 Ti 16GB',
    memory: 16,
    price: 3599,
    cloudPrice: 0.7,
    architecture: 'Blackwell',
    computeCapability: '10.0',
    suitable: false,
    utilizationRate: 0
  },
  {
    id: 'rtx5060ti',
    name: 'RTX 5060 Ti',
    memory: 8,
    price: 3199,
    cloudPrice: 0.5,
    architecture: 'Blackwell',
    computeCapability: '10.0',
    suitable: false,
    utilizationRate: 0
  },
  {
    id: 'rtx5060',
    name: 'RTX 5060',
    memory: 8,
    price: 2499,
    cloudPrice: 0.4,
    architecture: 'Blackwell',
    computeCapability: '10.0',
    suitable: false,
    utilizationRate: 0
  },

  // 消费级GPU - RTX 40系列
  {
    id: 'rtx4060',
    name: 'RTX 4060',
    memory: 8,
    price: 351,
    cloudPrice: 0.3,
    architecture: 'Ada Lovelace',
    computeCapability: '8.9',
    suitable: false,
    utilizationRate: 0
  },
  {
    id: 'rtx4060ti',
    name: 'RTX 4060 Ti',
    memory: 16,
    price: 499,
    cloudPrice: 0.3,
    architecture: 'Ada Lovelace',
    computeCapability: '8.9',
    suitable: false,
    utilizationRate: 0
  },
  {
    id: 'rtx4070',
    name: 'RTX 4070',
    memory: 12,
    price: 599,
    cloudPrice: 0.4,
    architecture: 'Ada Lovelace',
    computeCapability: '8.9',
    suitable: false,
    utilizationRate: 0
  },
  {
    id: 'rtx4070super',
    name: 'RTX 4070 Super',
    memory: 12,
    price: 699,
    cloudPrice: 0.45,
    architecture: 'Ada Lovelace',
    computeCapability: '8.9',
    suitable: false,
    utilizationRate: 0
  },
  {
    id: 'rtx4080',
    name: 'RTX 4080',
    memory: 16,
    price: 1199,
    cloudPrice: 0.6,
    architecture: 'Ada Lovelace',
    computeCapability: '8.9',
    suitable: false,
    utilizationRate: 0
  },
  {
    id: 'rtx4090',
    name: 'RTX 4090',
    memory: 24,
    price: 1875,
    cloudPrice: 0.83,
    architecture: 'Ada Lovelace',
    computeCapability: '8.9',
    suitable: false,
    utilizationRate: 0
  },
  {
    id: 'rtx3080',
    name: 'RTX 3080',
    memory: 10,
    price: 699,
    cloudPrice: 0.5,
    architecture: 'Ampere',
    computeCapability: '8.6',
    suitable: false,
    utilizationRate: 0
  },
  {
    id: 'rtx3060',
    name: 'RTX 3060',
    memory: 12,
    price: 329,
    cloudPrice: 0.25,
    architecture: 'Ampere',
    computeCapability: '8.6',
    suitable: false,
    utilizationRate: 0
  },
  {
    id: 'rtx3090',
    name: 'RTX 3090',
    memory: 24,
    price: 1599,
    cloudPrice: 0.8,
    architecture: 'Ampere',
    computeCapability: '8.6',
    suitable: false,
    utilizationRate: 0
  },
  {
    id: 'gtx1080',
    name: 'GTX 1080',
    memory: 8,
    price: 100,
    cloudPrice: 0.15,
    architecture: 'Pascal',
    computeCapability: '6.1',
    suitable: false,
    utilizationRate: 0
  },

  // 专业级GPU
  {
    id: 'h200',
    name: 'H200 SXM',
    memory: 141,
    price: 41322,
    cloudPrice: 6.0,
    architecture: 'Hopper',
    computeCapability: '9.0',
    suitable: false,
    utilizationRate: 0
  },
  {
    id: 'h100-80gb',
    name: 'H100 SXM',
    memory: 80,
    price: 30971,
    cloudPrice: 4.5,
    architecture: 'Hopper',
    computeCapability: '9.0',
    suitable: false,
    utilizationRate: 0
  },
  {
    id: 'h800',
    name: 'H800',
    memory: 80,
    price: 31379,
    cloudPrice: 3.8,
    architecture: 'Hopper',
    computeCapability: '9.0',
    suitable: false,
    utilizationRate: 0
  },
  {
    id: 'a100-80gb',
    name: 'A100 SXM',
    memory: 80,
    price: 17200,
    cloudPrice: 3.67,
    architecture: 'Ampere',
    computeCapability: '8.0',
    suitable: false,
    utilizationRate: 0
  },
  {
    id: 'a800',
    name: 'A800',
    memory: 40,
    price: 19999,
    cloudPrice: 2.2,
    architecture: 'Ampere',
    computeCapability: '8.0',
    suitable: false,
    utilizationRate: 0
  },
  {
    id: 'rtx6000',
    name: 'RTX 6000 Ada',
    memory: 48,
    price: 6800,
    cloudPrice: 1.8,
    architecture: 'Ada Lovelace',
    computeCapability: '8.9',
    suitable: false,
    utilizationRate: 0
  },
  {
    id: 'v100-16gb',
    name: 'V100 16GB',
    memory: 16,
    price: 8000,
    cloudPrice: 1.5,
    architecture: 'Volta',
    computeCapability: '7.0',
    suitable: false,
    utilizationRate: 0
  },
  {
    id: 'v100-32gb',
    name: 'V100 32GB',
    memory: 32,
    price: 12000,
    cloudPrice: 2.24,
    architecture: 'Volta',
    computeCapability: '7.0',
    suitable: false,
    utilizationRate: 0
  },
  {
    id: 'l40s',
    name: 'L40S',
    memory: 48,
    price: 8000,
    cloudPrice: 1.89,
    architecture: 'Ada Lovelace',
    computeCapability: '8.9',
    suitable: false,
    utilizationRate: 0
  },
  {
    id: 'l4',
    name: 'L4',
    memory: 24,
    price: 2500,
    cloudPrice: 0.6,
    architecture: 'Ada Lovelace',
    computeCapability: '8.9',
    suitable: false,
    utilizationRate: 0
  },

  // 云端特殊实例
  {
    id: 't4',
    name: 'Tesla T4',
    memory: 16,
    price: 2500,
    cloudPrice: 0.35,
    architecture: 'Turing',
    computeCapability: '7.5',
    suitable: false,
    utilizationRate: 0
  },
  {
    id: 'p4',
    name: 'Tesla P4',
    memory: 8,
    price: 1500,
    cloudPrice: 0.25,
    architecture: 'Pascal',
    computeCapability: '6.1',
    suitable: false,
    utilizationRate: 0
  }
];

/**
 * 根据模型ID获取模型信息
 */
export function getModelById(modelId: string): ModelInfo | undefined {
  return MODELS_DATABASE.find(model => model.id === modelId);
}

/**
 * 根据GPU ID获取GPU信息
 */
export function getGPUById(gpuId: string): GPU | undefined {
  return GPU_DATABASE.find(gpu => gpu.id === gpuId);
}

/**
 * 获取适合的GPU推荐
 */
export function getGPURecommendations(requiredMemoryGB: number): GPU[] {
  return GPU_DATABASE
    .map(gpu => ({
      ...gpu,
      suitable: gpu.memory >= requiredMemoryGB,
      utilizationRate: (requiredMemoryGB / gpu.memory) * 100
    }))
    .filter(gpu => gpu.suitable)
    .sort((a, b) => a.utilizationRate - b.utilizationRate); // 按利用率排序，优先推荐利用率合理的
}

/**
 * 按参数量分类模型
 */
export function getModelsByCategory() {
  return {
    small: MODELS_DATABASE.filter(m => m.params <= 3),
    medium: MODELS_DATABASE.filter(m => m.params > 3 && m.params <= 15),
    large: MODELS_DATABASE.filter(m => m.params > 15 && m.params <= 50),
    xlarge: MODELS_DATABASE.filter(m => m.params > 50)
  };
}

/**
 * 按价格范围分类GPU
 */
export function getGPUsByPriceRange() {
  return {
    budget: GPU_DATABASE.filter(gpu => gpu.price <= 1000),
    mid: GPU_DATABASE.filter(gpu => gpu.price > 1000 && gpu.price <= 5000),
    high: GPU_DATABASE.filter(gpu => gpu.price > 5000 && gpu.price <= 20000),
    enterprise: GPU_DATABASE.filter(gpu => gpu.price > 20000)
  };
} 