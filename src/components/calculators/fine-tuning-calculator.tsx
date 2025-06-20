'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Brain, Layers, TrendingUp, Lightbulb } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AnimatedNumber } from '@/components/animated-number';
import { LoadingOverlay } from '@/components/ui/loading-spinner';
import { formatMemorySize } from '@/utils/memory-formulas';
import { getModelById, MODELS_DATABASE } from '@/lib/models-data';
import { FineTuningConfig, FineTuningMethod, PrecisionType, QuantizationType } from '@/types';
import { useCalculatorStore } from '@/store/calculator-store';

export function FineTuningCalculator() {
  const { 
    fineTuningConfig: config, 
    setFineTuningConfig: setConfig,
    fineTuningResult: memoryResult,
    fineTuningLoading: isLoading
  } = useCalculatorStore();

  // 获取基础模型信息
  const baseModel = useMemo(() => 
    getModelById(config.baseModel), [config.baseModel]
  );

  const handleConfigChange = (key: keyof FineTuningConfig, value: unknown) => {
    setConfig({ [key]: value });
  };

  // 按参数量分组模型
  const modelsBySize = useMemo(() => {
    return {
      small: MODELS_DATABASE.filter(m => m.params <= 3),
      medium: MODELS_DATABASE.filter(m => m.params > 3 && m.params <= 15),
      large: MODELS_DATABASE.filter(m => m.params > 15 && m.params <= 50),
      xlarge: MODELS_DATABASE.filter(m => m.params > 50)
    };
  }, []);

  const methodDescriptions = {
    'Full': '全参数微调，更新所有模型参数，效果最好但显存需求最大',
    'LoRA': '低秩适配，只训练少量参数，显存效率高，效果接近全参数',
    'QLoRA': '量化LoRA，结合量化技术，显存需求最小，适合大模型',
    'Prefix': 'Prefix Tuning，只训练前缀参数，显存需求中等'
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
      {/* 配置面板 */}
      <motion.div
        className="glass-card p-6 space-y-6"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl glass-card">
            <Brain className="w-5 h-5 text-purple-500" />
          </div>
          <h3 className="text-xl font-semibold">微调配置</h3>
        </div>

        {/* 基础模型选择 */}
        <div className="space-y-3">
          <label className="text-sm font-medium">基础模型</label>
          <Select 
            value={config.baseModel} 
            onValueChange={(value) => handleConfigChange('baseModel', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase">
                小模型 (≤3B)
              </div>
              {modelsBySize.small.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name} ({model.params}B)
                </SelectItem>
              ))}
              
              <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase">
                中等模型 (3-15B)
              </div>
              {modelsBySize.medium.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name} ({model.params}B)
                </SelectItem>
              ))}
              
              <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase">
                大模型 (15-50B)
              </div>
              {modelsBySize.large.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name} ({model.params}B)
                </SelectItem>
              ))}
              
              <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase">
                超大模型 (&gt;50B)
              </div>
              {modelsBySize.xlarge.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name} ({model.params}B)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* 模型信息显示 */}
          {baseModel && (
            <div className="p-3 bg-white/10 rounded-lg border border-white/20 text-xs space-y-1">
              <div className="flex justify-between">
                <span>参数量:</span>
                <span className="font-mono">{baseModel.params}B</span>
              </div>
              <div className="flex justify-between">
                <span>架构:</span>
                <span className="font-mono">{baseModel.architecture}</span>
              </div>
            </div>
          )}
        </div>

        {/* 微调方法选择 */}
        <div className="space-y-3">
          <label className="text-sm font-medium">微调方法</label>
          <Select 
            value={config.method} 
            onValueChange={(value: FineTuningMethod) => handleConfigChange('method', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Full">全参数微调</SelectItem>
              <SelectItem value="LoRA">LoRA (推荐)</SelectItem>
              <SelectItem value="QLoRA">QLoRA (大模型推荐)</SelectItem>
              <SelectItem value="Prefix">Prefix Tuning</SelectItem>
            </SelectContent>
          </Select>
          
          {/* 方法说明 */}
          <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20 text-xs">
            {methodDescriptions[config.method]}
          </div>
        </div>

        {/* LoRA 特定配置 */}
        {(config.method === 'LoRA' || config.method === 'QLoRA') && (
          <div className="space-y-4 p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="text-sm font-medium text-purple-600">LoRA 参数配置</div>
            
            {/* LoRA Rank */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm">Rank (r)</label>
                <AnimatedNumber 
                  value={config.loraRank!} 
                  className="text-sm font-mono text-purple-600"
                />
              </div>
              <Slider
                value={[config.loraRank!]}
                onValueChange={([value]) => handleConfigChange('loraRank', value)}
                max={128}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1 (最小)</span>
                <span>128 (最大)</span>
              </div>
            </div>

            {/* LoRA Alpha */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm">Alpha (α)</label>
                <AnimatedNumber 
                  value={config.loraAlpha!} 
                  className="text-sm font-mono text-purple-600"
                />
              </div>
              <Slider
                value={[config.loraAlpha!]}
                onValueChange={([value]) => handleConfigChange('loraAlpha', value)}
                max={128}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1</span>
                <span>128</span>
              </div>
            </div>

            <div className="text-xs text-gray-600">
              <div>• Rank越大，LoRA参数越多，效果可能更好但显存更多</div>
              <div>• Alpha控制LoRA的学习率缩放，通常设为Rank的2-4倍</div>
            </div>
          </div>
        )}

        {/* 量化和精度配置 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <label className="text-sm font-medium">量化方式</label>
            <Select 
              value={config.quantization} 
              onValueChange={(value: QuantizationType) => handleConfigChange('quantization', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="None">无量化</SelectItem>
                <SelectItem value="INT8">INT8 (4倍压缩)</SelectItem>
                <SelectItem value="INT4">INT4 (8倍压缩)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">训练精度</label>
            <Select 
              value={config.precision} 
              onValueChange={(value: PrecisionType) => handleConfigChange('precision', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FP32">FP32</SelectItem>
                <SelectItem value="FP16">FP16</SelectItem>
                <SelectItem value="BF16">BF16</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* 结果面板 */}
      <motion.div
        className="space-y-6"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <LoadingOverlay isLoading={isLoading}>
        {/* 总显存需求 */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl glass-card">
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold">微调显存</h3>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
              <AnimatedNumber 
                value={memoryResult?.total || 0} 
                format={formatMemorySize}
              />
            </div>
            <p className="text-sm text-gray-600">总显存需求</p>
          </div>

          {/* 方法效率显示 */}
          <div className="mt-4 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="text-xs text-purple-700 font-medium">
              微调效率
            </div>
            <div className="text-sm mt-1">
              {config.method === 'Full' && '全参数微调，效果最佳但显存需求大'}
              {config.method === 'LoRA' && `LoRA微调，约${((config.loraRank! * 2 * 4096) / (baseModel?.params || 7) / 1e9 * 100).toFixed(2)}%参数需训练`}
              {config.method === 'QLoRA' && 'QLoRA微调，显存最优，适合大模型'}
              {config.method === 'Prefix' && 'Prefix微调，约1%参数需训练'}
            </div>
          </div>
        </div>

        {/* 显存分解 */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl glass-card">
              <Layers className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold">显存分解</h3>
          </div>
          
          <div className="space-y-4">
            {memoryResult?.breakdown?.map((item, index) => (
              <motion.div
                key={item.label}
                className="space-y-2"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AnimatedNumber 
                      value={item.value} 
                      format={formatMemorySize}
                      className="font-mono text-xs"
                    />
                    <span className="text-xs text-gray-500">
                      (<AnimatedNumber value={item.percentage} format={(n) => `${n.toFixed(1)}%`} />)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 微调建议 */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl glass-card">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
            </div>
            <h3 className="text-lg font-semibold">微调建议</h3>
          </div>
          
          <div className="space-y-3 text-sm">
            {config.method === 'Full' && baseModel && baseModel.params > 7 && (
              <div className="flex items-start gap-2 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                <span>大模型全参数微调显存需求巨大，建议考虑LoRA或QLoRA</span>
              </div>
            )}

            {config.method === 'LoRA' && config.loraRank! < 8 && (
              <div className="flex items-start gap-2 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                <span>Rank值较小，可能限制微调效果，建议尝试更大的Rank</span>
              </div>
            )}

            {config.method === 'LoRA' && config.loraRank! > 64 && (
              <div className="flex items-start gap-2 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0" />
                <span>Rank值较大，显存需求增加，如果显存不足可考虑降低Rank</span>
              </div>
            )}

            {config.quantization === 'None' && baseModel && baseModel.params > 13 && (
              <div className="flex items-start gap-2 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                <span>大模型建议使用量化以减少基础模型显存占用</span>
              </div>
            )}

            {config.method === 'QLoRA' && config.quantization === 'None' && (
              <div className="flex items-start gap-2 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                <span>QLoRA方法需要配合量化使用才能发挥优势</span>
              </div>
            )}

            {config.loraAlpha! / config.loraRank! < 1 && (config.method === 'LoRA' || config.method === 'QLoRA') && (
              <div className="flex items-start gap-2 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                <span>Alpha/Rank比值过小，可能导致学习率过低，建议增大Alpha</span>
              </div>
            )}
          </div>
        </div>
        </LoadingOverlay>
      </motion.div>
    </div>
  );
} 