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
  },

  // 多模态模型 - 视觉语言模型
  {
    id: 'qwen2-vl-7b',
    name: 'Qwen2-VL-7B',
    params: 7.6,
    architecture: 'multimodal',
    hiddenSize: 4096,
    numLayers: 28,
    numHeads: 28,
    vocabSize: 151936
  },
  {
    id: 'qwen2.5-vl-3b',
    name: 'Qwen2.5-VL-3B',
    params: 3.1,
    architecture: 'multimodal',
    hiddenSize: 2048,
    numLayers: 36,
    numHeads: 16,
    vocabSize: 151936
  },
  {
    id: 'qwen2.5-vl-7b',
    name: 'Qwen2.5-VL-7B',
    params: 8.3,
    architecture: 'multimodal',
    hiddenSize: 4096,
    numLayers: 28,
    numHeads: 28,
    vocabSize: 151936
  },
  {
    id: 'qwen2.5-vl-72b',
    name: 'Qwen2.5-VL-72B',
    params: 72.7,
    architecture: 'multimodal',
    hiddenSize: 8192,
    numLayers: 80,
    numHeads: 64,
    vocabSize: 151936
  },

  // LLaVA系列
  {
    id: 'llava-1.5-7b',
    name: 'LLaVA-1.5-7B',
    params: 7.0,
    architecture: 'multimodal',
    hiddenSize: 4096,
    numLayers: 32,
    numHeads: 32,
    vocabSize: 32000
  },
  {
    id: 'llava-1.5-13b',
    name: 'LLaVA-1.5-13B',
    params: 13.0,
    architecture: 'multimodal',
    hiddenSize: 5120,
    numLayers: 40,
    numHeads: 40,
    vocabSize: 32000
  },
  {
    id: 'llava-next-34b',
    name: 'LLaVA-NeXT-34B',
    params: 34.0,
    architecture: 'multimodal',
    hiddenSize: 8192,
    numLayers: 60,
    numHeads: 64,
    vocabSize: 32064
  },

  // Idefics系列
  {
    id: 'idefics2-8b',
    name: 'Idefics2-8B',
    params: 8.0,
    architecture: 'multimodal',
    hiddenSize: 4096,
    numLayers: 32,
    numHeads: 32,
    vocabSize: 32000
  },

  // Microsoft Phi多模态
  {
    id: 'phi-4-multimodal',
    name: 'Phi-4-Multimodal',
    params: 5.6,
    architecture: 'multimodal',
    hiddenSize: 3072,
    numLayers: 32,
    numHeads: 32,
    vocabSize: 200064
  },

  // 音频模型
  {
    id: 'whisper-large-v3',
    name: 'Whisper-Large-v3',
    params: 1.55,
    architecture: 'audio-text',
    hiddenSize: 1280,
    numLayers: 32,
    numHeads: 20,
    vocabSize: 51865
  },
  {
    id: 'whisper-medium',
    name: 'Whisper-Medium',
    params: 0.769,
    architecture: 'audio-text',
    hiddenSize: 1024,
    numLayers: 24,
    numHeads: 16,
    vocabSize: 51865
  },
  {
    id: 'whisper-small',
    name: 'Whisper-Small',
    params: 0.244,
    architecture: 'audio-text',
    hiddenSize: 768,
    numLayers: 12,
    numHeads: 12,
    vocabSize: 51865
  },

  // 多模态音频视频模型
  {
    id: 'jamba-1.5-mini',
    name: 'Jamba-1.5-Mini',
    params: 12.0,
    architecture: 'hybrid-mamba',
    hiddenSize: 4096,
    numLayers: 32,
    numHeads: 32,
    vocabSize: 65536
  },
  {
    id: 'openomni-7b',
    name: 'OpenOmni-7B',
    params: 7.0,
    architecture: 'omnimodal',
    hiddenSize: 4096,
    numLayers: 32,
    numHeads: 32,
    vocabSize: 32000
  },

  // 视频理解模型
  {
    id: 'video-llama-7b',
    name: 'Video-LLaMA-7B',
    params: 7.0,
    architecture: 'video-text',
    hiddenSize: 4096,
    numLayers: 32,
    numHeads: 32,
    vocabSize: 32000
  },

  // 文档理解模型
  {
    id: 'nougat-base',
    name: 'Nougat-Base',
    params: 0.35,
    architecture: 'document-ocr',
    hiddenSize: 1024,
    numLayers: 4,
    numHeads: 16,
    vocabSize: 8842
  }
];

/**
 * GPU数据库
 */
export const GPU_DATABASE: GPU[] = [
  // RTX 50系列 - 基于最新2025年1月价格信息
  {
    id: 'rtx-5090',
    name: 'RTX 5090',
    memory: 32,
    architecture: 'Blackwell',
    computeCapability: '9.0',
    price: 1999,  // MSRP更新
    cloudPrice: 3.5,  // 云服务价格更新
    features: ['DLSS 4', 'RT Cores Gen 4', 'Tensor Cores Gen 5', 'PCIe 5.0', 'GDDR7', '575W TDP']
  },
  {
    id: 'rtx-5080',
    name: 'RTX 5080',
    memory: 16,
    architecture: 'Blackwell',
    computeCapability: '9.0',
    price: 999,   // MSRP确认
    cloudPrice: 1.8,
    features: ['DLSS 4', 'RT Cores Gen 4', 'Tensor Cores Gen 5', 'PCIe 5.0', 'GDDR7', '360W TDP']
  },
  {
    id: 'rtx-5070-ti',
    name: 'RTX 5070 Ti',
    memory: 16,
    architecture: 'Blackwell',
    computeCapability: '9.0',
    price: 749,   // MSRP确认
    cloudPrice: 1.4,
    features: ['DLSS 4', 'RT Cores Gen 4', 'Tensor Cores Gen 5', 'PCIe 5.0', 'GDDR7', '300W TDP']
  },
  {
    id: 'rtx-5070',
    name: 'RTX 5070',
    memory: 12,
    architecture: 'Blackwell',
    computeCapability: '9.0',
    price: 549,   // MSRP确认
    cloudPrice: 1.0,
    features: ['DLSS 4', 'RT Cores Gen 4', 'Tensor Cores Gen 5', 'PCIe 5.0', 'GDDR7', '250W TDP']
  },
  {
    id: 'rtx-5060-ti-16gb',
    name: 'RTX 5060 Ti 16GB',
    memory: 16,
    architecture: 'Blackwell',
    computeCapability: '9.0',
    price: 429,   // 修正价格
    cloudPrice: 0.8,
    features: ['DLSS 4', 'RT Cores Gen 4', 'Tensor Cores Gen 5', 'PCIe 5.0', 'GDDR7', '180W TDP']
  },
  {
    id: 'rtx-5060-ti',
    name: 'RTX 5060 Ti 8GB',
    memory: 8,
    architecture: 'Blackwell',
    computeCapability: '9.0',
    price: 379,   // 修正价格
    cloudPrice: 0.6,
    features: ['DLSS 4', 'RT Cores Gen 4', 'Tensor Cores Gen 5', 'PCIe 5.0', 'GDDR7', '180W TDP']
  },
  {
    id: 'rtx-5060',
    name: 'RTX 5060',
    memory: 8,
    architecture: 'Blackwell',
    computeCapability: '9.0',
    price: 299,   // 修正价格
    cloudPrice: 0.5,
    features: ['DLSS 4', 'RT Cores Gen 4', 'Tensor Cores Gen 5', 'PCIe 5.0', 'GDDR7', '145W TDP']
  },

  // RTX 40系列 - 更新当前市场价格
  {
    id: 'rtx-4090',
    name: 'RTX 4090',
    memory: 24,
    architecture: 'Ada Lovelace',
    computeCapability: '8.9',
    price: 2819,  // 当前市场价格（缺货涨价）
    cloudPrice: 2.5,
    features: ['DLSS 3', 'RT Cores Gen 3', 'AV1 Encode', 'PCIe 4.0', '450W TDP']
  },
  {
    id: 'rtx-4080-super',
    name: 'RTX 4080 Super',
    memory: 16,
    architecture: 'Ada Lovelace',
    computeCapability: '8.9',
    price: 1200,  // 估算缺货价格
    cloudPrice: 1.8,
    features: ['DLSS 3', 'RT Cores Gen 3', 'AV1 Encode', 'PCIe 4.0', '320W TDP']
  },
  {
    id: 'rtx-4080',
    name: 'RTX 4080',
    memory: 16,
    architecture: 'Ada Lovelace',
    computeCapability: '8.9',
    price: 1100,  // 估算缺货价格
    cloudPrice: 1.6,
    features: ['DLSS 3', 'RT Cores Gen 3', 'AV1 Encode', 'PCIe 4.0', '320W TDP']
  },
  {
    id: 'rtx-4070-ti-super',
    name: 'RTX 4070 Ti Super',
    memory: 16,
    architecture: 'Ada Lovelace',
    computeCapability: '8.9',
    price: 1198,  // 当前Amazon价格
    cloudPrice: 1.3,
    features: ['DLSS 3', 'RT Cores Gen 3', 'AV1 Encode', 'PCIe 4.0', '285W TDP']
  },
  {
    id: 'rtx-4070-ti',
    name: 'RTX 4070 Ti',
    memory: 12,
    architecture: 'Ada Lovelace',
    computeCapability: '8.9',
    price: 900,   // 估算缺货价格
    cloudPrice: 1.1,
    features: ['DLSS 3', 'RT Cores Gen 3', 'AV1 Encode', 'PCIe 4.0', '285W TDP']
  },
  {
    id: 'rtx-4070-super',
    name: 'RTX 4070 Super',
    memory: 12,
    architecture: 'Ada Lovelace',
    computeCapability: '8.9',
    price: 849,   // 当前市场价格
    cloudPrice: 1.0,
    features: ['DLSS 3', 'RT Cores Gen 3', 'AV1 Encode', 'PCIe 4.0', '220W TDP']
  },
  {
    id: 'rtx-4070',
    name: 'RTX 4070',
    memory: 12,
    architecture: 'Ada Lovelace',
    computeCapability: '8.9',
    price: 849,   // 当前市场价格
    cloudPrice: 0.9,
    features: ['DLSS 3', 'RT Cores Gen 3', 'AV1 Encode', 'PCIe 4.0', '200W TDP']
  },
  {
    id: 'rtx-4060-ti-16gb',
    name: 'RTX 4060 Ti 16GB',
    memory: 16,
    architecture: 'Ada Lovelace',
    computeCapability: '8.9',
    price: 679,   // 当前市场价格
    cloudPrice: 0.8,
    features: ['DLSS 3', 'RT Cores Gen 3', 'AV1 Encode', 'PCIe 4.0', '165W TDP']
  },
  {
    id: 'rtx-4060-ti',
    name: 'RTX 4060 Ti',
    memory: 8,
    architecture: 'Ada Lovelace',
    computeCapability: '8.9',
    price: 543,   // 当前市场价格
    cloudPrice: 0.7,
    features: ['DLSS 3', 'RT Cores Gen 3', 'AV1 Encode', 'PCIe 4.0', '165W TDP']
  },
  {
    id: 'rtx-4060',
    name: 'RTX 4060',
    memory: 8,
    architecture: 'Ada Lovelace',
    computeCapability: '8.9',
    price: 329,   // 当前市场价格
    cloudPrice: 0.6,
    features: ['DLSS 3', 'RT Cores Gen 3', 'AV1 Encode', 'PCIe 4.0', '115W TDP']
  },

  // 专业级GPU
  {
    id: 'h200',
    name: 'H200 SXM',
    memory: 141,
    architecture: 'Hopper',
    computeCapability: '9.0',
    price: 41322,
    cloudPrice: 6.0,
    features: ['HBM3e', 'NVLink 4.0', 'Transformer Engine', 'Multi-Instance GPU', '700W TDP']
  },
  {
    id: 'h100-80gb',
    name: 'H100 SXM',
    memory: 80,
    architecture: 'Hopper',
    computeCapability: '9.0',
    price: 30971,
    cloudPrice: 4.5,
    features: ['HBM3', 'NVLink 4.0', 'Transformer Engine', 'Multi-Instance GPU', '700W TDP']
  },
  {
    id: 'h800',
    name: 'H800',
    memory: 80,
    architecture: 'Hopper',
    computeCapability: '9.0',
    price: 31379,
    cloudPrice: 3.8,
    features: ['HBM3', 'NVLink 4.0', 'Transformer Engine', 'Multi-Instance GPU', '700W TDP']
  },
  {
    id: 'a100-80gb',
    name: 'A100 SXM',
    memory: 80,
    architecture: 'Ampere',
    computeCapability: '8.0',
    price: 17200,
    cloudPrice: 3.67,
    features: ['HBM2e', 'NVLink 3.0', 'Tensor Cores Gen 3', 'Multi-Instance GPU', '400W TDP']
  },
  {
    id: 'a100-40gb',
    name: 'A100 40GB',
    memory: 40,
    architecture: 'Ampere',
    computeCapability: '8.0',
    price: 11000,
    cloudPrice: 3.06,
    features: ['HBM2e', 'NVLink 3.0', 'Tensor Cores Gen 3', 'Multi-Instance GPU', '400W TDP']
  },
  {
    id: 'a800',
    name: 'A800',
    memory: 40,
    architecture: 'Ampere',
    computeCapability: '8.0',
    price: 19999,
    cloudPrice: 2.2,
    features: ['HBM2e', 'NVLink 3.0', 'Tensor Cores Gen 3', 'Multi-Instance GPU', '400W TDP']
  },
  {
    id: 'rtx6000-ada',
    name: 'RTX 6000 Ada',
    memory: 48,
    architecture: 'Ada Lovelace',
    computeCapability: '8.9',
    price: 6800,
    cloudPrice: 1.8,
    features: ['Professional Drivers', 'ECC Memory', 'RTX Technology', 'PCIe 4.0', '300W TDP']
  },
  {
    id: 'rtx-a6000',
    name: 'RTX A6000',
    memory: 48,
    architecture: 'Ampere',
    computeCapability: '8.6',
    price: 4650,
    cloudPrice: 1.89,
    features: ['Professional Drivers', 'ECC Memory', 'RTX Technology', 'PCIe 4.0', '300W TDP']
  },
  {
    id: 'rtx-a5000',
    name: 'RTX A5000',
    memory: 24,
    architecture: 'Ampere',
    computeCapability: '8.6',
    price: 2310,
    cloudPrice: 1.28,
    features: ['Professional Drivers', 'ECC Memory', 'RTX Technology', 'PCIe 4.0', '230W TDP']
  },
  {
    id: 'l40s',
    name: 'L40S',
    memory: 48,
    architecture: 'Ada Lovelace',
    computeCapability: '8.9',
    price: 8000,
    cloudPrice: 1.89,
    features: ['Professional Drivers', 'Optimized for AI/HPC', 'PCIe 4.0', '350W TDP']
  },
  {
    id: 'l4',
    name: 'L4',
    memory: 24,
    architecture: 'Ada Lovelace',
    computeCapability: '8.9',
    price: 2500,
    cloudPrice: 0.6,
    features: ['Professional Drivers', 'Optimized for Inference', 'PCIe 4.0', '72W TDP']
  },
  {
    id: 'v100-32gb',
    name: 'V100 32GB',
    memory: 32,
    architecture: 'Volta',
    computeCapability: '7.0',
    price: 12000,
    cloudPrice: 2.24,
    features: ['HBM2', 'NVLink 2.0', 'Tensor Cores Gen 1', 'ECC Memory', '300W TDP']
  },
  {
    id: 'v100-16gb',
    name: 'V100 16GB',
    memory: 16,
    architecture: 'Volta',
    computeCapability: '7.0',
    price: 8000,
    cloudPrice: 1.5,
    features: ['HBM2', 'NVLink 2.0', 'Tensor Cores Gen 1', 'ECC Memory', '300W TDP']
  },

  // RTX 30系列
  {
    id: 'rtx-3090',
    name: 'RTX 3090',
    memory: 24,
    architecture: 'Ampere',
    computeCapability: '8.6',
    price: 1599,
    cloudPrice: 0.8,
    features: ['DLSS 2', 'RT Cores Gen 2', 'PCIe 4.0', '350W TDP']
  },
  {
    id: 'rtx-3080-ti',
    name: 'RTX 3080 Ti',
    memory: 12,
    architecture: 'Ampere',
    computeCapability: '8.6',
    price: 1199,
    cloudPrice: 0.65,
    features: ['DLSS 2', 'RT Cores Gen 2', 'PCIe 4.0', '350W TDP']
  },
  {
    id: 'rtx-3080',
    name: 'RTX 3080',
    memory: 10,
    architecture: 'Ampere',
    computeCapability: '8.6',
    price: 699,
    cloudPrice: 0.5,
    features: ['DLSS 2', 'RT Cores Gen 2', 'PCIe 4.0', '320W TDP']
  },
  {
    id: 'rtx-3070-ti',
    name: 'RTX 3070 Ti',
    memory: 8,
    architecture: 'Ampere',
    computeCapability: '8.6',
    price: 599,
    cloudPrice: 0.45,
    features: ['DLSS 2', 'RT Cores Gen 2', 'PCIe 4.0', '290W TDP']
  },
  {
    id: 'rtx-3070',
    name: 'RTX 3070',
    memory: 8,
    architecture: 'Ampere',
    computeCapability: '8.6',
    price: 499,
    cloudPrice: 0.4,
    features: ['DLSS 2', 'RT Cores Gen 2', 'PCIe 4.0', '220W TDP']
  },
  {
    id: 'rtx-3060-ti',
    name: 'RTX 3060 Ti',
    memory: 8,
    architecture: 'Ampere',
    computeCapability: '8.6',
    price: 399,
    cloudPrice: 0.35,
    features: ['DLSS 2', 'RT Cores Gen 2', 'PCIe 4.0', '200W TDP']
  },
  {
    id: 'rtx-3060',
    name: 'RTX 3060',
    memory: 12,
    architecture: 'Ampere',
    computeCapability: '8.6',
    price: 329,
    cloudPrice: 0.25,
    features: ['DLSS 2', 'RT Cores Gen 2', 'PCIe 4.0', '170W TDP']
  },

  // 云端特殊实例
  {
    id: 't4',
    name: 'Tesla T4',
    memory: 16,
    architecture: 'Turing',
    computeCapability: '7.5',
    price: 2500,
    cloudPrice: 0.35,
    features: ['Tensor Cores Gen 2', 'INT8/INT4 Inference', 'PCIe 3.0', '70W TDP']
  },
  {
    id: 'p4',
    name: 'Tesla P4',
    memory: 8,
    architecture: 'Pascal',
    computeCapability: '6.1',
    price: 1500,
    cloudPrice: 0.25,
    features: ['GDDR5', 'Optimized for Inference', 'PCIe 3.0', '50W TDP']
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
    .filter(gpu => gpu.memory >= requiredMemoryGB)
    .sort((a, b) => {
      // 按显存利用率排序，优先推荐利用率在70-90%之间的
      const aUtilization = (requiredMemoryGB / a.memory) * 100;
      const bUtilization = (requiredMemoryGB / b.memory) * 100;
      
      const aOptimal = Math.abs(aUtilization - 80);
      const bOptimal = Math.abs(bUtilization - 80);
      
      return aOptimal - bOptimal;
    });
}

/**
 * 多机GPU配置推荐（支持多台8卡机器）
 */
export interface MultiGPUConfig {
  gpu: GPU;
  gpusPerNode: number; // 每台机器的GPU数量
  numNodes: number;    // 机器数量
  totalGPUs: number;   // 总GPU数量
  totalMemory: number; // 总显存（GB）
  totalCost: number;   // 总成本
  memoryPerNode: number; // 每台机器总显存
  suggestion: string;  // 推荐理由
}

export function getMultiGPURecommendations(requiredMemoryGB: number): MultiGPUConfig[] {
  const recommendations: MultiGPUConfig[] = [];
  
  // 单卡无法满足的情况下，推荐多卡配置
  const suitableGPUs = GPU_DATABASE.filter(gpu => gpu.memory >= 8); // 至少8GB显存的GPU
  
  for (const gpu of suitableGPUs) {
    const gpuMemory = gpu.memory;
    
    // 计算需要的GPU数量（考虑70%利用率为最优）
    const optimalGPUsNeeded = Math.ceil(requiredMemoryGB / (gpuMemory * 0.7));
    
    // 尝试不同的机器配置
    for (const gpusPerNode of [1, 2, 4, 8]) {
      if (optimalGPUsNeeded <= gpusPerNode) {
        // 单台机器就够了
        const config: MultiGPUConfig = {
          gpu,
          gpusPerNode,
          numNodes: 1,
          totalGPUs: gpusPerNode,
          totalMemory: gpuMemory * gpusPerNode,
          totalCost: gpu.price * gpusPerNode,
          memoryPerNode: gpuMemory * gpusPerNode,
          suggestion: `单机${gpusPerNode}卡配置，${(gpuMemory * gpusPerNode).toFixed(0)}GB总显存`
        };
        recommendations.push(config);
      } else {
        // 需要多台机器
        const nodesNeeded = Math.ceil(optimalGPUsNeeded / gpusPerNode);
        if (nodesNeeded <= 16) { // 最多推荐16台机器
          const totalGPUs = nodesNeeded * gpusPerNode;
          const config: MultiGPUConfig = {
            gpu,
            gpusPerNode,
            numNodes: nodesNeeded,
            totalGPUs,
            totalMemory: gpuMemory * totalGPUs,
            totalCost: gpu.price * totalGPUs,
            memoryPerNode: gpuMemory * gpusPerNode,
            suggestion: `${nodesNeeded}台机器，每台${gpusPerNode}卡，共${totalGPUs}卡 ${(gpuMemory * totalGPUs).toFixed(0)}GB总显存`
          };
          recommendations.push(config);
        }
      }
    }
  }
  
  // 排序：优先考虑成本效益和实用性
  return recommendations
    .filter(config => config.totalMemory >= requiredMemoryGB)
    .sort((a, b) => {
      // 计算成本效益（每GB显存的成本）
      const aCostPerGB = a.totalCost / a.totalMemory;
      const bCostPerGB = b.totalCost / b.totalMemory;
      
      // 优先推荐成本效益好的配置
      if (Math.abs(aCostPerGB - bCostPerGB) > 50) {
        return aCostPerGB - bCostPerGB;
      }
      
      // 成本相近时，优先推荐机器数量少的
      return a.numNodes - b.numNodes;
    })
    .slice(0, 20); // 最多返回20个推荐
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

/**
 * 根据架构类型过滤模型
 */
export function getModelsByArchitecture(type: 'nlp' | 'multimodal'): ModelInfo[] {
  if (type === 'nlp') {
    // NLP模型：transformer, glm, moe 架构
    return MODELS_DATABASE.filter(model => 
      ['transformer', 'glm', 'moe'].includes(model.architecture)
    );
  } else {
    // 多模态模型：multimodal 架构
    return MODELS_DATABASE.filter(model => 
      model.architecture === 'multimodal'
    );
  }
}

/**
 * 根据架构类型按系列分组模型
 */
export function getModelsByCategoryAndArchitecture(type: 'nlp' | 'multimodal') {
  const filteredModels = getModelsByArchitecture(type);
  
  const categories = filteredModels.reduce((acc, model) => {
    const category = model.name.split('-')[0];
    if (!acc[category]) acc[category] = [];
    acc[category].push(model);
    return acc;
  }, {} as Record<string, ModelInfo[]>);
  
  return categories;
} 