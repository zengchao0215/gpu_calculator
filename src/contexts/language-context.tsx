'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 专业的大模型领域翻译
const translations = {
  zh: {
    // Header
    'header.title': 'Wuhr AI VRAM Insight',
    'header.description': '专业的AI模型显存需求计算工具，支持训练、推理、微调三种模式，基于最新工程实践的精确计算公式，为您的GPU选型和部署规划提供专业指导',
    
    // Navigation
    'nav.history': '历史记录',
    'nav.presets': '预设',
    'nav.settings': '设置',
    'nav.shortcuts': '快捷键',
    'nav.compare': '对比列表',
    'nav.language': '语言',
    
    // Tabs
    'tabs.nlp': 'NLP/语言模型',
    'tabs.multimodal': '多模态模型',
    'tabs.inference': '推理显存',
    'tabs.finetuning': '微调显存',
    'tabs.training': '训练显存',
    'tabs.grpo': 'GRPO',
    
    // Features
    'feature.precise': '精确计算公式',
    'feature.precise.desc': '基于最新AI工程实践，支持混合精度、梯度检查点、量化等优化技术的精确显存计算',
    'feature.models': '130+主流模型',
    'feature.models.desc': '涵盖Qwen、DeepSeek、Llama、ChatGLM等热门模型，参数规格实时更新',
    'feature.gpu': '智能GPU推荐',
    'feature.gpu.desc': '基于显存需求自动匹配最适合的GPU，包含价格对比和利用率分析',
    
    // Footer
    'footer.description': 'AI显存计算器 • 专业GPU显存需求分析工具 • 基于最新AI工程实践',
    'footer.features': '支持训练、推理、微调三种场景 • 130+模型数据库 • 20+GPU规格对比',
    'footer.blog': '博客',
    'footer.api': '模型API',
    'footer.chat': '模型Chat',
    'footer.contact': '联系我们',
    'footer.github': 'GitHub开源',
    'footer.made': 'Made with ❤️ by',
    
    // GPU Recommendations
    'gpu.recommendations': 'GPU推荐',
    'gpu.scenario': '场景',
    'gpu.multi.card.config': '多卡配置',
    'gpu.multi.machine.config': '多机配置推荐',
    'gpu.multi.machine.description': '多机配置支持模型并行和数据并行，可以配置多台8卡机器',
    'gpu.single.card.recommendation': '单卡推荐',
    'gpu.other.options': '个其他选项',
    'gpu.more.options': '还有',
    'gpu.selection.guide': '选择指南',
    'gpu.multi.machine.infiniband': '多机配置支持InfiniBand',
    'gpu.requirement': '需求',
    'gpu.over.24gb.available': '(超过24GB时可用)',
    'gpu.best.config': '最佳配置',
    'gpu.best.recommendation': '最佳推荐',
    'gpu.total.memory': '总显存',
    'gpu.utilization': '利用率',
    'gpu.total.price': '总价格',
    'gpu.per.machine': '每台机器',
    'gpu.machine.count': '机器数量',
    'gpu.gpu.per.machine': '每台GPU',
    'gpu.total.gpus': '总GPU',
    'gpu.memory.capacity': '显存容量',
    'gpu.market.price': '市场价格',
    'gpu.cloud.service': '云服务',
    'gpu.architecture': '架构',
    'gpu.compute.power': '算力',
    'gpu.fitness.score': '适合度',
    'gpu.no.suitable': '暂无合适的GPU推荐',
    'gpu.check.memory.requirement': '请检查显存需求是否合理',
    'gpu.recommended.config': '推荐配置',
    'gpu.memory.utilization.70.90': '显存利用率 70-90%',
    'gpu.latest.cuda.support': '支持最新CUDA架构',
    'gpu.cost.effective': '性价比均衡',
    'gpu.precautions': '注意事项',
    'gpu.reserve.buffer': '预留额外显存缓冲',
    'gpu.consider.power.cooling': '考虑功耗和散热',
    'gpu.evaluate.cloud.cost': '评估云服务成本',
    'gpu.multi.machine.distributed': '多机需要支持分布式训练',
    'gpu.multi.card.hint': '多卡配置适用于显存需求超过24GB的场景。当前需求较小，推荐使用单卡方案。',
    'gpu.current.requirement': '当前',
    'gpu.multi.single.machine.config': '单机{gpusPerNode}卡配置，{totalMemory}GB总显存',
    'gpu.multi.multiple.machines.config': '{numNodes}台机器，每台{gpusPerNode}卡，共{totalGPUs}卡 {totalMemory}GB总显存',
    'gpu.price.budget': '预算级',
    'gpu.price.mid.range': '中端',
    'gpu.price.high.end': '高端',
    'gpu.price.enterprise': '企业级',
    
    // Inference Calculator
    'inference.config': '推理配置',
    'inference.memory.requirement': '推理显存',
    'inference.single': '单次推理',
    'inference.batch': '批量推理',
    'inference.optimization.suggestions': '推理优化建议',
    'inference.long.sequence.suggestion': '长序列推理建议降低KV缓存比例以节省显存',
    'inference.large.batch.suggestion': '大批次推理可提高吞吐量，但需要更多显存',
    'inference.large.model.suggestion': '大模型推理强烈建议使用量化以减少显存需求',
    
    // Training Calculator
    'training.config': '训练配置',
    'training.mixed.precision': '混合精度训练',
    
    // Fine-tuning Calculator
    'finetuning.config': '微调配置',
    'finetuning.method': '微调方法',
    'finetuning.memory.requirement': '微调显存',
    'finetuning.efficiency': '微调效率',
    'finetuning.suggestions': '微调建议',
    'finetuning.full.params': '全参数微调',
    'finetuning.full.description': '全参数微调，更新所有模型参数，效果最好但显存需求最大',
    'finetuning.lora.description': '低秩适配，只训练少量参数，显存效率高，效果接近全参数',
    'finetuning.qlora.description': 'QLoRA，4位量化+LoRA，显存最优',
    'finetuning.prefix.description': 'Prefix Tuning，只训练前缀参数，显存需求中等',
    'finetuning.full.effect.best': '全参数微调，效果最佳但显存需求大',
    'finetuning.lora.params.percent': 'LoRA微调，约',
    'finetuning.params.to.train': '%参数需训练',
    'finetuning.qlora.optimal': 'QLoRA微调，显存最优，适合大模型',
    'finetuning.prefix.one.percent': 'Prefix微调，约1%参数需训练',
    'finetuning.large.model.suggestion': '大模型全参数微调显存需求巨大，建议考虑LoRA或QLoRA',
    'finetuning.rank.too.small': 'Rank值较小，可能限制微调效果，建议尝试更大的Rank',
    
    // Common labels
    'preset.model': '预设模型',
    'parameters': '参数量',
    'hidden.size': '隐藏层大小',
    'layers': '层数',
    'attention.heads': '注意力头数',
    'numerical.precision': '数值精度',
    'quantization.method': '量化方式',
    'no.quantization': '无量化',
    'int8.compression': 'INT8 (4倍压缩)',
    'int4.compression': 'INT4 (8倍压缩)',
    'fp8.compression': 'FP8 (4倍压缩)',
    'batch.size': '批次大小',
    'sequence.length': '序列长度',
    'kv.cache.ratio': 'KV缓存比例',
    'compressed': '压缩',
    'complete': '完整',
    'total.memory.requirement': '总显存需求',
    'quantization.compression.effect': '量化压缩效果',
    'model.size.reduction.75': '模型大小减少约75%',
    'model.size.reduction.87.5': '模型大小减少约87.5%',
    'optimization.suggestions': '优化建议',
    'use.int8.quantization': '使用INT8量化可减少75%的模型显存，对精度影响很小',
    
    // Training Calculator
    'model.parameters.count': '模型参数量',
    'optimizer': '优化器',
    'adamw.recommended': 'AdamW (推荐)',
    'fp32.32bit': 'FP32 (32位浮点)',
    'fp16.16bit': 'FP16 (16位浮点)',
    'bf16.brain.float': 'BF16 (Brain Float 16)',
    'gradient.checkpointing': '梯度检查点',
    'memory.requirement': '显存需求',
    'enable.gradient.checkpointing': '开启梯度检查点可减少约70%的激活值显存',
    'use.fp16.bf16': '使用FP16或BF16可减少约50%的参数和梯度显存',
    'large.model.sgd': '大模型建议考虑SGD优化器以减少优化器状态显存',
    
    // Fine-tuning Calculator specific
    'base.model': '基础模型',
    'small.model.3b': '小模型 (≤3B)',
    'medium.model.3.15b': '中等模型 (3-15B)',
    'large.model.15.50b': '大模型 (15-50B)',
    'xlarge.model.50b': '超大模型 (>50B)',
    'architecture': '架构',
    'lora.recommended': 'LoRA (推荐)',
    'qlora.large.model.recommended': 'QLoRA (大模型推荐)',
    'lora.parameters.config': 'LoRA 参数配置',
    'rank.r': 'Rank (r)',
    'alpha.a': 'Alpha (α)',
    'minimum': '最小',
    'maximum': '最大',
    'rank.larger.more.params': 'Rank越大，LoRA参数越多，效果可能更好但显存更多',
    'alpha.controls.learning.rate': 'Alpha控制LoRA的学习率缩放，通常设为Rank的2-4倍',
    'training.precision': '训练精度',
    'rank.large.memory.increase': 'Rank值较大，显存需求增加，如果显存不足可考虑降低Rank',
    'large.model.use.quantization': '大模型建议使用量化以减少基础模型显存占用',
    'qlora.needs.quantization': 'QLoRA方法需要配合量化使用才能发挥优势',
    'alpha.rank.ratio.too.small': 'Alpha/Rank比值过小，可能导致学习率过低，建议增大Alpha',
    
    // History Panel
    'calculation.history': '计算历史',
    'history.records': '历史记录',
    'compare.list': '对比列表',
    'total.records': '共',
    'records.count': '条记录',
    'clear': '清空',
    'no.history.records': '暂无历史记录',
    'total.memory': '总显存',
    'selected.configs': '已选择',
    'configs.for.compare': '个配置进行对比',
    'clear.compare': '清空对比',
    'select.from.history': '从历史记录中选择配置进行对比',
    'max.4.configs': '最多可以对比 4 个配置',
    'load.config': '加载配置',
    
    // Config Presets Panel
    'config.preset.templates': '配置预设模板',
    'quick.start.project': '选择预设配置快速开始您的',
    'project': '项目',
    'search.presets': '搜索预设配置',
    'all.categories': '所有分类',
    'beginner': '入门级',
    'professional': '专业级',
    'enterprise': '企业级',
    'research': '研究级',
    'estimated.memory': '预估显存',
    'recommended.gpu': '推荐GPU',
    'apply.config': '应用配置',
    'no.matching.presets': '未找到匹配的预设配置',
    'try.adjust.search': '尝试调整搜索条件或分类筛选',
    
    // Multimodal Calculator
    'multimodal.config': '多模态微调配置',
    'multimodal.training.config': '多模态训练配置', 
    'multimodal.inference.config': '多模态推理配置',
    'multimodal.finetuning.config': '多模态微调配置',
    'multimodal.modality.type': '模态类型',
    'multimodal.base.model': '基础模型',
    'multimodal.text.image': '文本 + 图像',
    'multimodal.text.audio': '文本 + 音频',
    'multimodal.text.video': '文本 + 视频',
    'multimodal.audio.video': '音频 + 视频',
    'multimodal.text.audio.video': '文本 + 音频 + 视频',
    'multimodal.parameters': '参数量',
    'multimodal.architecture': '架构',
    'multimodal.hidden.layers': '隐藏层',
    'multimodal.num.layers': '层数',
    'multimodal.text.precision': '文本精度',
    'multimodal.vision.precision': '视觉精度',
    'multimodal.audio.precision': '音频精度',
    'multimodal.batch.size': '批量大小',
    'multimodal.sequence.length': '文本序列长度',
    'multimodal.image.config': '图像配置',
    'multimodal.image.resolution': '图像分辨率',
    'multimodal.patch.size': 'Patch大小',
    'multimodal.num.images': '每样本图像数量',
    'multimodal.vision.encoder': '独立视觉编码器',
    'multimodal.image.tokens': '图像Token统计',
    'multimodal.patches.per.image': '每图像Patch数',
    'multimodal.total.image.tokens': '总图像Token数',
    'multimodal.audio.config': '音频配置',
    'multimodal.sample.rate': '采样率 (Hz)',
    'multimodal.window.length': '音频窗口长度 (秒)',
    'multimodal.audio.encoder': '独立音频编码器',
    'multimodal.video.config': '视频配置',
    'multimodal.frame.rate': '视频帧率 (FPS)',
    'multimodal.video.length': '视频长度 (秒)',
    'multimodal.video.encoder': '独立视频编码器',
    'multimodal.memory.requirement': '多模态训练显存需求',
    'multimodal.memory.requirement.inference': '多模态推理显存需求',
    'multimodal.memory.requirement.finetuning': '多模态微调显存需求',
    
    // Resolution options
    'resolution.224': '224x224 (标准)',
    'resolution.336': '336x336 (中等)',
    'resolution.448': '448x448 (高清)',
    'resolution.512': '512x512 (超清)',
    
    // Patch size options
    'patch.14': '14x14 (细粒度)',
    'patch.16': '16x16 (标准)',
    'patch.32': '32x32 (粗粒度)',
    
    // Sample rate options
    'samplerate.16k': '16kHz (语音)',
    'samplerate.22k': '22.05kHz (高质量语音)',
    'samplerate.44k': '44.1kHz (CD质量)',
    'samplerate.48k': '48kHz (专业音频)',
    
    // Frame rate options
    'framerate.10': '10 FPS (低帧率)',
    'framerate.15': '15 FPS (中等)',
    'framerate.25': '25 FPS (标准)',
    'framerate.30': '30 FPS (高帧率)',
    'framerate.60': '60 FPS (超高帧率)',
    
    // Precision options
    'precision.fp32': 'FP32 (32位浮点)',
    'precision.fp16': 'FP16 (16位浮点)',
    'precision.bf16': 'BF16 (Brain Float)',
    'precision.fp8': 'FP8 (8位浮点)',
    
    // Memory analysis
    'memory.total.requirement': '总显存需求',
    'memory.breakdown': '显存分解',
    'multimodal.features': '模态特性',
    'multimodal.features.text': '支持文本序列编码和生成',
    'multimodal.features.image': '图像被分割为patch进行处理',
    'multimodal.features.audio': '音频通过窗口切片进行编码',
    'multimodal.features.video': '视频按帧序列处理，结合时序信息',
    'multimodal.features.attention': '跨模态注意力机制增加计算开销',
    'multimodal.features.vision.shared': '视觉编码器可选独立或共享参数',
    'multimodal.features.audio.spectrum': '音频编码器处理频谱特征',
    'multimodal.features.cache': '多模态特征缓存用于加速推理',
    
    // Mode terms
    'mode.training': '训练',
    'mode.inference': '推理',
    'mode.finetuning': '微调',
    'mode.multimodal': '多模态',
    
    // GRPO Calculator
    'grpo.config': 'GRPO配置',
    'grpo.preset.model': '预设模型',
    'grpo.parameters': '参数量',
    'grpo.architecture': '架构',
    'grpo.hidden.layers': '隐藏层',
    'grpo.num.layers': '层数',
    'grpo.training.precision': '训练精度',
    'grpo.batch.size': '批量大小',
    'grpo.max.sequence.length': '最大序列长度',
    'grpo.generations.per.prompt': '每提示生成数量',
    'grpo.description': 'GRPO为每个提示生成多个响应进行对比学习',
    'grpo.memory.requirement': 'GRPO显存需求',
    'grpo.advanced.settings': '高级设置',
    'grpo.gradient.accumulation.steps': '梯度累积步数',
    'grpo.use.8bit.optimizer': '8位优化器',
    'grpo.gradient.checkpointing': '梯度检查点',
    'grpo.features': 'GRPO特性',
    'grpo.features.policy.reference': '使用策略模型和参考模型进行对比学习',
    'grpo.features.multiple.responses': '生成多个响应以计算群体相对优势',
    'grpo.features.8bit.optimizer': '支持8位优化器降低内存使用',
    'grpo.features.gradient.checkpointing': '梯度检查点可节省70%激活值内存',
    'grpo.features.memory.saving': '比PPO节省约40-60%显存',
    
    // Loading
    'loading': '加载中...',
    'loading.history': '加载历史记录...',
    'loading.settings': '加载设置...',
  },
  en: {
    // Header
    'header.title': 'Wuhr AI VRAM Insight',
    'header.description': 'Professional GPU memory requirement calculator for AI models, supporting training, inference, and fine-tuning modes with precise formulas based on latest engineering practices',
    
    // Navigation
    'nav.history': 'History',
    'nav.presets': 'Presets',
    'nav.settings': 'Settings',
    'nav.shortcuts': 'Shortcuts',
    'nav.compare': 'Compare List',
    'nav.language': 'Language',
    
    // Tabs
    'tabs.nlp': 'NLP/Language Models',
    'tabs.multimodal': 'Multimodal Models',
    'tabs.inference': 'Inference VRAM',
    'tabs.finetuning': 'Fine-tuning VRAM',
    'tabs.training': 'Training VRAM',
    'tabs.grpo': 'GRPO',
    
    // Features
    'feature.precise': 'Precise Calculation Formulas',
    'feature.precise.desc': 'Based on latest AI engineering practices, supporting mixed precision, gradient checkpointing, quantization and other optimization techniques',
    'feature.models': '130+ Mainstream Models',
    'feature.models.desc': 'Covering popular models like Qwen, DeepSeek, Llama, ChatGLM with real-time parameter specifications',
    'feature.gpu': 'Intelligent GPU Recommendations',
    'feature.gpu.desc': 'Automatically match the most suitable GPUs based on VRAM requirements, including price comparison and utilization analysis',
    
    // Footer
    'footer.description': 'AI VRAM Calculator • Professional GPU Memory Analysis Tool • Based on Latest AI Engineering Practices',
    'footer.features': 'Supporting Training, Inference, Fine-tuning Scenarios • 130+ Model Database • 20+ GPU Specifications',
    'footer.blog': 'Blog',
    'footer.api': 'Model API',
    'footer.chat': 'Model Chat',
    'footer.contact': 'Contact Us',
    'footer.github': 'GitHub Source',
    'footer.made': 'Made with ❤️ by',
    
    // GPU Recommendations
    'gpu.recommendations': 'GPU Recommendations',
    'gpu.scenario': 'Scenario',
    'gpu.multi.card.config': 'Multi-GPU Configuration',
    'gpu.multi.machine.config': 'Multi-Machine Configuration',
    'gpu.multi.machine.description': 'Multi-machine setup supports model and data parallelism with multiple 8-GPU machines',
    'gpu.single.card.recommendation': 'Single GPU Recommendations',
    'gpu.other.options': ' more options',
    'gpu.more.options': '',
    'gpu.selection.guide': 'Selection Guide',
    'gpu.multi.machine.infiniband': 'Multi-machine configuration supports InfiniBand',
    'gpu.requirement': 'Requirement',
    'gpu.over.24gb.available': '(Available for >24GB)',
    'gpu.best.config': 'Best Configuration',
    'gpu.best.recommendation': 'Best Recommendation',
    'gpu.total.memory': 'Total Memory',
    'gpu.utilization': 'Utilization',
    'gpu.total.price': 'Total Price',
    'gpu.per.machine': 'Per Machine',
    'gpu.machine.count': 'Machine Count',
    'gpu.gpu.per.machine': 'GPUs per Machine',
    'gpu.total.gpus': 'Total GPUs',
    'gpu.memory.capacity': 'Memory Capacity',
    'gpu.market.price': 'Market Price',
    'gpu.cloud.service': 'Cloud Service',
    'gpu.architecture': 'Architecture',
    'gpu.compute.power': 'Compute Power',
    'gpu.fitness.score': 'Fitness Score',
    'gpu.no.suitable': 'No suitable GPU recommendations',
    'gpu.check.memory.requirement': 'Please check if memory requirement is reasonable',
    'gpu.recommended.config': 'Recommended Configuration',
    'gpu.memory.utilization.70.90': 'Memory utilization 70-90%',
    'gpu.latest.cuda.support': 'Latest CUDA architecture support',
    'gpu.cost.effective': 'Cost-effective balance',
    'gpu.precautions': 'Precautions',
    'gpu.reserve.buffer': 'Reserve extra memory buffer',
    'gpu.consider.power.cooling': 'Consider power consumption and cooling',
    'gpu.evaluate.cloud.cost': 'Evaluate cloud service costs',
    'gpu.multi.machine.distributed': 'Multi-machine requires distributed training support',
    'gpu.multi.card.hint': 'Multi-GPU configuration is suitable for memory requirements over 24GB. Current requirement is small, single GPU is recommended.',
    'gpu.current.requirement': 'Current',
    'gpu.multi.single.machine.config': 'Single machine {gpusPerNode}-GPU config, {totalMemory}GB total memory',
    'gpu.multi.multiple.machines.config': '{numNodes} machines, {gpusPerNode} GPUs each, total {totalGPUs} GPUs {totalMemory}GB total memory',
    'gpu.price.budget': 'Budget',
    'gpu.price.mid.range': 'Mid-range',
    'gpu.price.high.end': 'High-end',
    'gpu.price.enterprise': 'Enterprise',
    
    // Inference Calculator
    'inference.config': 'Inference Configuration',
    'inference.memory.requirement': 'Inference VRAM',
    'inference.single': 'Single Inference',
    'inference.batch': 'Batch Inference',
    'inference.optimization.suggestions': 'Inference Optimization Suggestions',
    'inference.long.sequence.suggestion': 'For long sequences, consider reducing KV cache ratio to save VRAM',
    'inference.large.batch.suggestion': 'Large batch inference improves throughput but requires more VRAM',
    'inference.large.model.suggestion': 'Quantization is strongly recommended for large model inference to reduce VRAM requirements',
    
    // Training Calculator
    'training.config': 'Training Configuration',
    'training.mixed.precision': 'Mixed Precision Training',
    
    // Fine-tuning Calculator
    'finetuning.config': 'Fine-tuning Configuration',
    'finetuning.method': 'Fine-tuning Method',
    'finetuning.memory.requirement': 'Fine-tuning VRAM',
    'finetuning.efficiency': 'Fine-tuning Efficiency',
    'finetuning.suggestions': 'Fine-tuning Suggestions',
    'finetuning.full.params': 'Full Parameter Fine-tuning',
    'finetuning.full.description': 'Full parameter fine-tuning updates all model parameters, best results but highest VRAM requirement',
    'finetuning.lora.description': 'Low-rank adaptation, trains only a few parameters, high VRAM efficiency with near full-parameter results',
    'finetuning.qlora.description': 'QLoRA, 4-bit quantization + LoRA, optimal VRAM usage',
    'finetuning.prefix.description': 'Prefix Tuning, trains only prefix parameters, moderate VRAM requirement',
    'finetuning.full.effect.best': 'Full parameter fine-tuning, best results but high VRAM requirement',
    'finetuning.lora.params.percent': 'LoRA fine-tuning, approximately ',
    'finetuning.params.to.train': '% parameters to train',
    'finetuning.qlora.optimal': 'QLoRA fine-tuning, optimal VRAM usage, suitable for large models',
    'finetuning.prefix.one.percent': 'Prefix fine-tuning, approximately 1% parameters to train',
    'finetuning.large.model.suggestion': 'Full parameter fine-tuning for large models requires enormous VRAM, consider LoRA or QLoRA',
    'finetuning.rank.too.small': 'Rank value is too small, may limit fine-tuning effectiveness, try larger Rank',
    
    // Common labels
    'preset.model': 'Preset Model',
    'parameters': 'Parameters',
    'hidden.size': 'Hidden Size',
    'layers': 'Layers',
    'attention.heads': 'Attention Heads',
    'numerical.precision': 'Numerical Precision',
    'quantization.method': 'Quantization Method',
    'no.quantization': 'No Quantization',
    'int8.compression': 'INT8 (4x compression)',
    'int4.compression': 'INT4 (8x compression)',
    'fp8.compression': 'FP8 (4x compression)',
    'batch.size': 'Batch Size',
    'sequence.length': 'Sequence Length',
    'kv.cache.ratio': 'KV Cache Ratio',
    'compressed': 'Compressed',
    'complete': 'Complete',
    'total.memory.requirement': 'Total Memory Requirement',
    'quantization.compression.effect': 'Quantization Compression Effect',
    'model.size.reduction.75': 'Model size reduced by approximately 75%',
    'model.size.reduction.87.5': 'Model size reduced by approximately 87.5%',
    'optimization.suggestions': 'Optimization Suggestions',
    'use.int8.quantization': 'Using INT8 quantization can reduce model VRAM by 75% with minimal accuracy impact',
    
    // Training Calculator
    'model.parameters.count': 'Model Parameters Count',
    'optimizer': 'Optimizer',
    'adamw.recommended': 'AdamW (Recommended)',
    'fp32.32bit': 'FP32 (32-bit float)',
    'fp16.16bit': 'FP16 (16-bit float)',
    'bf16.brain.float': 'BF16 (Brain Float 16)',
    'gradient.checkpointing': 'Gradient Checkpointing',
    'memory.requirement': 'Memory Requirement',
    'enable.gradient.checkpointing': 'Enable gradient checkpointing to reduce activation memory by ~70%',
    'use.fp16.bf16': 'Using FP16 or BF16 can reduce parameter and gradient memory by ~50%',
    'large.model.sgd': 'For large models, consider SGD optimizer to reduce optimizer state memory',
    
    // Fine-tuning Calculator specific
    'base.model': 'Base Model',
    'small.model.3b': 'Small Models (≤3B)',
    'medium.model.3.15b': 'Medium Models (3-15B)',
    'large.model.15.50b': 'Large Models (15-50B)',
    'xlarge.model.50b': 'Extra Large Models (>50B)',
    'architecture': 'Architecture',
    'lora.recommended': 'LoRA (Recommended)',
    'qlora.large.model.recommended': 'QLoRA (Large Model Recommended)',
    'lora.parameters.config': 'LoRA Parameters Configuration',
    'rank.r': 'Rank (r)',
    'alpha.a': 'Alpha (α)',
    'minimum': 'Minimum',
    'maximum': 'Maximum',
    'rank.larger.more.params': 'Larger Rank means more LoRA parameters, potentially better results but more memory',
    'alpha.controls.learning.rate': 'Alpha controls LoRA learning rate scaling, typically set to 2-4x Rank',
    'training.precision': 'Training Precision',
    'rank.large.memory.increase': 'Large Rank value increases memory requirement, consider reducing Rank if memory is insufficient',
    'large.model.use.quantization': 'For large models, recommend using quantization to reduce base model memory usage',
    'qlora.needs.quantization': 'QLoRA method needs to be used with quantization to achieve its advantages',
    'alpha.rank.ratio.too.small': 'Alpha/Rank ratio too small, may lead to low learning rate, consider increasing Alpha',
    
    // History Panel
    'calculation.history': 'Calculation History',
    'history.records': 'History Records',
    'compare.list': 'Compare List',
    'total.records': 'Total',
    'records.count': 'records',
    'clear': 'Clear',
    'no.history.records': 'No history records',
    'total.memory': 'Total Memory',
    'selected.configs': 'Selected',
    'configs.for.compare': 'configurations for comparison',
    'clear.compare': 'Clear Compare',
    'select.from.history': 'Select configurations from history for comparison',
    'max.4.configs': 'Maximum 4 configurations can be compared',
    'load.config': 'Load Config',
    
    // Config Presets Panel
    'config.preset.templates': 'Configuration Preset Templates',
    'quick.start.project': 'Select preset configuration to quickly start your',
    'project': 'project',
    'search.presets': 'Search preset configurations...',
    'all.categories': 'All Categories',
    'beginner': 'Beginner',
    'professional': 'Professional',
    'enterprise': 'Enterprise',
    'research': 'Research',
    'estimated.memory': 'Estimated Memory',
    'recommended.gpu': 'Recommended GPU',
    'apply.config': 'Apply Config',
    'no.matching.presets': 'No matching preset configurations found',
    'try.adjust.search': 'Try adjusting search criteria or category filters',
    
    // Multimodal Calculator
    'multimodal.config': 'Multimodal Fine-tuning Configuration',
    'multimodal.training.config': 'Multimodal Training Configuration',
    'multimodal.inference.config': 'Multimodal Inference Configuration',
    'multimodal.finetuning.config': 'Multimodal Fine-tuning Configuration',
    'multimodal.modality.type': 'Modality Type',
    'multimodal.base.model': 'Base Model',
    'multimodal.text.image': 'Text + Image',
    'multimodal.text.audio': 'Text + Audio',
    'multimodal.text.video': 'Text + Video',
    'multimodal.audio.video': 'Audio + Video',
    'multimodal.text.audio.video': 'Text + Audio + Video',
    'multimodal.parameters': 'Parameters',
    'multimodal.architecture': 'Architecture',
    'multimodal.hidden.layers': 'Hidden Size',
    'multimodal.num.layers': 'Layers',
    'multimodal.text.precision': 'Text Precision',
    'multimodal.vision.precision': 'Vision Precision',
    'multimodal.audio.precision': 'Audio Precision',
    'multimodal.batch.size': 'Batch Size',
    'multimodal.sequence.length': 'Text Sequence Length',
    'multimodal.image.config': 'Image Configuration',
    'multimodal.image.resolution': 'Image Resolution',
    'multimodal.patch.size': 'Patch Size',
    'multimodal.num.images': 'Images per Sample',
    'multimodal.vision.encoder': 'Independent Vision Encoder',
    'multimodal.image.tokens': 'Image Token Statistics',
    'multimodal.patches.per.image': 'Patches per Image',
    'multimodal.total.image.tokens': 'Total Image Tokens',
    'multimodal.audio.config': 'Audio Configuration',
    'multimodal.sample.rate': 'Sample Rate (Hz)',
    'multimodal.window.length': 'Audio Window Length (s)',
    'multimodal.audio.encoder': 'Independent Audio Encoder',
    'multimodal.video.config': 'Video Configuration',
    'multimodal.frame.rate': 'Video Frame Rate (FPS)',
    'multimodal.video.length': 'Video Length (s)',
    'multimodal.video.encoder': 'Independent Video Encoder',
    'multimodal.memory.requirement': 'Multimodal Training VRAM Requirement',
    'multimodal.memory.requirement.inference': 'Multimodal Inference VRAM Requirement',
    'multimodal.memory.requirement.finetuning': 'Multimodal Fine-tuning VRAM Requirement',
    
    // Resolution options
    'resolution.224': '224x224 (Standard)',
    'resolution.336': '336x336 (Medium)',
    'resolution.448': '448x448 (High)',
    'resolution.512': '512x512 (Ultra)',
    
    // Patch size options
    'patch.14': '14x14 (Fine-grained)',
    'patch.16': '16x16 (Standard)',
    'patch.32': '32x32 (Coarse-grained)',
    
    // Sample rate options
    'samplerate.16k': '16kHz (Speech)',
    'samplerate.22k': '22.05kHz (High-quality Speech)',
    'samplerate.44k': '44.1kHz (CD Quality)',
    'samplerate.48k': '48kHz (Professional Audio)',
    
    // Frame rate options
    'framerate.10': '10 FPS (Low)',
    'framerate.15': '15 FPS (Medium)',
    'framerate.25': '25 FPS (Standard)',
    'framerate.30': '30 FPS (High)',
    'framerate.60': '60 FPS (Ultra High)',
    
    // Precision options
    'precision.fp32': 'FP32 (32-bit)',
    'precision.fp16': 'FP16 (16-bit)',
    'precision.bf16': 'BF16 (Brain Float)',
    'precision.fp8': 'FP8 (8-bit)',
    
    // Memory analysis
    'memory.total.requirement': 'Total VRAM Requirement',
    'memory.breakdown': 'Memory Breakdown',
    'multimodal.features': 'Modality Features',
    'multimodal.features.text': 'Text sequence encoding and generation support',
    'multimodal.features.image': 'Images are segmented into patches for processing',
    'multimodal.features.audio': 'Audio encoded through window slicing',
    'multimodal.features.video': 'Video processed frame by frame with temporal information',
    'multimodal.features.attention': 'Cross-modal attention mechanisms add computational overhead',
    'multimodal.features.vision.shared': 'Vision encoder can be independent or share parameters',
    'multimodal.features.audio.spectrum': 'Audio encoder processes spectral features',
    'multimodal.features.cache': 'Multimodal feature caching for inference acceleration',
    
    // Mode terms
    'mode.training': 'Training',
    'mode.inference': 'Inference',
    'mode.finetuning': 'Fine-tuning',
    'mode.multimodal': 'Multimodal',
    
    // GRPO Calculator
    'grpo.config': 'GRPO Configuration',
    'grpo.preset.model': 'Preset Model',
    'grpo.parameters': 'Parameters',
    'grpo.architecture': 'Architecture',
    'grpo.hidden.layers': 'Hidden Size',
    'grpo.num.layers': 'Layers',
    'grpo.training.precision': 'Training Precision',
    'grpo.batch.size': 'Batch Size',
    'grpo.max.sequence.length': 'Max Sequence Length',
    'grpo.generations.per.prompt': 'Generations per Prompt',
    'grpo.description': 'GRPO generates multiple responses per prompt for contrastive learning',
    'grpo.memory.requirement': 'GRPO VRAM Requirement',
    'grpo.advanced.settings': 'Advanced Settings',
    'grpo.gradient.accumulation.steps': 'Gradient Accumulation Steps',
    'grpo.use.8bit.optimizer': '8-bit Optimizer',
    'grpo.gradient.checkpointing': 'Gradient Checkpointing',
    'grpo.features': 'GRPO Features',
    'grpo.features.policy.reference': 'Uses policy and reference models for contrastive learning',
    'grpo.features.multiple.responses': 'Generates multiple responses to compute group relative preference',
    'grpo.features.8bit.optimizer': 'Supports 8-bit optimizer to reduce memory usage',
    'grpo.features.gradient.checkpointing': 'Gradient checkpointing saves 70% activation memory',
    'grpo.features.memory.saving': 'Saves approximately 40-60% VRAM compared to PPO',
    
    // Loading
    'loading': 'Loading...',
    'loading.history': 'Loading history...',
    'loading.settings': 'Loading settings...',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('zh');

  useEffect(() => {
    // 从 localStorage 读取保存的语言设置
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    } else {
      // 检测浏览器语言
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('zh')) {
        setLanguageState('zh');
      } else {
        setLanguageState('en');
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    // 更新 HTML lang 属性
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en-US';
    
    // 触发自定义事件，通知需要重新计算
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    const value = translations[language]?.[key as keyof typeof translations[typeof language]];
    if (value && params) {
      // 替换模板中的参数
      return value.replace(/\{([^}]+)\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? String(params[paramKey]) : match;
      });
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 