/**
 * 显存计算工具实现
 * 提供各种显存计算功能
 */

import { 
  calculateInferenceMemory,
  calculateTrainingMemory,
  calculateFineTuningMemory,
  calculateGRPOMemory,
  calculateMultimodalMemory
} from '@/utils/memory-formulas';
import { MODELS_DATABASE, GPU_DATABASE } from '@/lib/models-data';
import { 
  InferenceParamsSchema,
  TrainingParamsSchema,
  FineTuningParamsSchema,
  GRPOParamsSchema,
  MultimodalParamsSchema,
  type VRAMCalculationResult
} from '../types';
import { mcpLogger, MCPError, MCP_ERROR_CODES, withErrorHandling } from '../logger';
import { addCalculationHistory } from '../resources/history';

/**
 * 创建标准化的计算结果
 */
function createCalculationResult(
  result: any,
  mode: string,
  modelName: string
): VRAMCalculationResult {
  return {
    totalVRAM: result.total,
    breakdown: {
      modelWeights: result.breakdown.find((b: any) => b.label.includes('模型'))?.value || 0,
      optimizer: result.breakdown.find((b: any) => b.label.includes('优化器'))?.value || 0,
      gradients: result.breakdown.find((b: any) => b.label.includes('梯度'))?.value || 0,
      activations: result.breakdown.find((b: any) => b.label.includes('激活'))?.value || 0,
      kvCache: result.breakdown.find((b: any) => b.label.includes('KV'))?.value || 0,
      other: result.breakdown.find((b: any) => b.label.includes('其他'))?.value || 0
    },
    recommendations: {
      gpus: GPU_DATABASE
        .filter(gpu => gpu.memory >= result.total)
        .slice(0, 3)
        .map(gpu => ({
          name: gpu.name,
          vram: gpu.memory,
          utilization: (result.total / gpu.memory) * 100,
          price: gpu.price
        })),
      optimizations: getOptimizationSuggestions(mode, result.total)
    }
  };
}

/**
 * 获取优化建议
 */
function getOptimizationSuggestions(mode: string, totalVRAM: number): string[] {
  const suggestions: string[] = [];
  
  switch (mode) {
    case 'inference':
      suggestions.push("考虑使用量化技术减少显存占用");
      suggestions.push("调整批次大小以适应可用显存");
      suggestions.push("使用KV缓存优化长序列推理");
      break;
    case 'training':
      suggestions.push("启用梯度检查点可减少70%激活值显存");
      suggestions.push("使用混合精度训练");
      suggestions.push("考虑梯度累积减少批次大小");
      break;
    case 'finetuning':
      suggestions.push("使用LoRA等PEFT方法大幅减少显存占用");
      suggestions.push("QLoRA可进一步减少基础模型显存占用");
      suggestions.push("调整LoRA rank以平衡性能和显存");
      break;
    case 'grpo':
      suggestions.push("使用PEFT方法减少可训练参数");
      suggestions.push("基础模型量化减少权重显存");
      suggestions.push("调整偏好组大小平衡性能和显存");
      break;
    case 'multimodal':
      suggestions.push("降低图像分辨率减少patch数量");
      suggestions.push("减少视频帧数控制序列长度");
      suggestions.push("使用更大的patch_size");
      break;
  }
  
  if (totalVRAM > 24) {
    suggestions.push("考虑使用多GPU分布式计算");
  }
  
  return suggestions;
}

/**
 * 注册显存计算工具
 */
export function registerCalculationTools(server: any) {
  // GRPO显存计算工具
  server.registerTool(
    "calculate_grpo_vram",
    {
      title: "GRPO显存计算",
      description: "计算Group-wise Ranking Preference Optimization的显存需求",
      inputSchema: GRPOParamsSchema
    },
    withErrorHandling(async (params) => {
      mcpLogger.info("开始GRPO显存计算", { modelId: params.modelId, numGenerations: params.numGenerations });
      
      const model = MODELS_DATABASE.find(m => m.id === params.modelId);
      if (!model) {
        throw new MCPError(`模型 ${params.modelId} 未找到`, MCP_ERROR_CODES.MODEL_NOT_FOUND);
      }

      const config = {
        precision: params.precision,
        batchSize: params.batchSize,
        numGenerations: params.numGenerations,
        sequenceLength: params.sequenceLength,
        use8BitOptimizer: true,
        gradientCheckpointing: true
      };

      const result = calculateGRPOMemory(config, {
        params: model.params,
        hiddenSize: model.hiddenSize,
        numLayers: model.numLayers,
        numHeads: model.numHeads
      });

      const calculationResult = createCalculationResult(result, 'grpo', model.name);

      // 添加到历史记录
      addCalculationHistory(
        'grpo',
        params.modelId,
        model.name,
        params,
        {
          totalVRAM: result.total,
          breakdown: calculationResult.breakdown
        },
        calculationResult.recommendations
      );

      mcpLogger.info("GRPO显存计算完成", { 
        modelId: params.modelId, 
        totalVRAM: result.total,
        numGenerations: params.numGenerations 
      });

      return {
        content: [{
          type: "text",
          text: JSON.stringify(calculationResult, null, 2)
        }]
      };
    }, "GRPO显存计算")
  );

  // 多模态显存计算工具
  server.registerTool(
    "calculate_multimodal_vram",
    {
      title: "多模态显存计算",
      description: "计算多模态模型的显存需求",
      inputSchema: MultimodalParamsSchema
    },
    withErrorHandling(async (params) => {
      mcpLogger.info("开始多模态显存计算", { 
        modelId: params.modelId, 
        mode: params.mode,
        imageCount: params.imageCount,
        audioSeconds: params.audioSeconds,
        videoFrames: params.videoFrames
      });
      
      const model = MODELS_DATABASE.find(m => m.id === params.modelId);
      if (!model) {
        throw new MCPError(`模型 ${params.modelId} 未找到`, MCP_ERROR_CODES.MODEL_NOT_FOUND);
      }

      // 计算总序列长度
      const textSeqLength = params.textTokens;
      const imageSeqLength = params.imageCount > 0 ? 
        Math.pow(params.imageResolution / 14, 2) * params.imageCount : 0; // 假设patch_size=14
      const audioSeqLength = params.audioSeconds > 0 ? 
        (params.audioSeconds * 1000) / 80 : 0; // 80ms per token
      const videoSeqLength = params.videoFrames > 0 ? 
        params.videoFrames * Math.pow(params.imageResolution / 14, 2) : 0;
      
      const totalSequenceLength = textSeqLength + imageSeqLength + audioSeqLength + videoSeqLength;

      const config = {
        batchSize: params.batchSize,
        sequenceLength: totalSequenceLength,
        textPrecision: params.precision,
        modalityType: ['text'],
        imageResolution: params.imageResolution,
        numImages: params.imageCount,
        patchSize: 14,
        mode: params.mode
      };

      // 添加模态类型
      if (params.imageCount > 0) config.modalityType.push('image');
      if (params.audioSeconds > 0) config.modalityType.push('audio');
      if (params.videoFrames > 0) config.modalityType.push('video');

      const result = calculateMultimodalMemory(config, {
        params: model.params,
        hiddenSize: model.hiddenSize,
        numLayers: model.numLayers
      });

      const calculationResult = createCalculationResult(result, 'multimodal', model.name);

      // 添加多模态特定信息
      calculationResult.breakdown.sequenceBreakdown = {
        text: textSeqLength,
        image: imageSeqLength,
        audio: audioSeqLength,
        video: videoSeqLength,
        total: totalSequenceLength
      };

      // 添加到历史记录
      addCalculationHistory(
        'multimodal',
        params.modelId,
        model.name,
        params,
        {
          totalVRAM: result.total,
          breakdown: calculationResult.breakdown
        },
        calculationResult.recommendations
      );

      mcpLogger.info("多模态显存计算完成", { 
        modelId: params.modelId, 
        totalVRAM: result.total,
        totalSequenceLength 
      });

      return {
        content: [{
          type: "text",
          text: JSON.stringify(calculationResult, null, 2)
        }]
      };
    }, "多模态显存计算")
  );

  mcpLogger.info("显存计算工具注册完成", { 
    tools: ['calculate_grpo_vram', 'calculate_multimodal_vram']
  });
}
