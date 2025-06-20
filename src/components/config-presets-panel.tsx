'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Zap, Filter, Star, CheckCircle } from 'lucide-react';
import { ConfigPreset, getPresetsByType, searchPresets } from '@/lib/config-presets';
import { useCalculatorStore } from '@/store/calculator-store';
import { MemoryBreakdown } from '@/types';

interface ConfigPresetsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentType: 'training' | 'inference' | 'finetuning';
}

const categoryLabels = {
  beginner: '入门级',
  professional: '专业级',
  enterprise: '企业级',
  research: '研究级'
};

const categoryColors = {
  beginner: 'bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30',
  professional: 'bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30',
  enterprise: 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30',
  research: 'bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/30'
};

export function ConfigPresetsPanel({ isOpen, onClose, currentType }: ConfigPresetsPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPreset, setSelectedPreset] = useState<ConfigPreset | null>(null);

  const { 
    setTrainingConfig, 
    setInferenceConfig, 
    setFineTuningConfig,
    addToHistory 
  } = useCalculatorStore();

  const allPresets = getPresetsByType(currentType);
  
  const filteredPresets = searchQuery 
    ? searchPresets(searchQuery).filter(p => p.type === currentType)
    : allPresets.filter(preset => 
        selectedCategory === 'all' || preset.category === selectedCategory
      );

  const handleApplyPreset = (preset: ConfigPreset) => {
    try {
             switch (preset.type) {
         case 'training':
           setTrainingConfig(preset.config);
           break;
         case 'inference':
           setInferenceConfig(preset.config);
           break;
         case 'finetuning':
           setFineTuningConfig(preset.config);
           break;
       }

      // 添加到历史记录
      const result: MemoryBreakdown = {
        total: preset.estimatedMemory,
        modelParams: preset.estimatedMemory * 0.5,
        gradients: preset.estimatedMemory * 0.2,
        optimizer: preset.estimatedMemory * 0.15,
        activations: preset.estimatedMemory * 0.1,
        kvCache: preset.estimatedMemory * 0.05,
        breakdown: []
      };
      addToHistory(preset.type, preset.config, result, preset.name);

      onClose();
    } catch (error) {
      console.error('应用预设失败:', error);
    }
  };

  const formatMemory = (gb: number) => {
    return gb >= 1000 ? `${(gb / 1000).toFixed(1)}TB` : `${gb}GB`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* 主面板 */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div className="glass-card p-6 max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* 标题栏 */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl glass-card">
                    <Star className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">配置预设模板</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      选择预设配置快速开始您的{currentType === 'training' ? '训练' : currentType === 'inference' ? '推理' : '微调'}项目
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 搜索和筛选 */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜索预设配置..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 glass-input"
                  />
                </div>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="glass-input px-4 py-2 min-w-32"
                >
                  <option value="all">所有分类</option>
                  <option value="beginner">入门级</option>
                  <option value="professional">专业级</option>
                  <option value="enterprise">企业级</option>
                  <option value="research">研究级</option>
                </select>
              </div>

              {/* 预设列表 */}
              <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 h-full overflow-y-auto scrollbar-glass">
                  {filteredPresets.map((preset) => (
                    <motion.div
                      key={preset.id}
                      className={`glass-card p-4 cursor-pointer border-2 transition-all ${
                        selectedPreset?.id === preset.id 
                          ? 'border-blue-500/50 bg-blue-500/10' 
                          : 'border-transparent hover:border-white/30'
                      }`}
                      onClick={() => setSelectedPreset(preset)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* 预设信息 */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{preset.name}</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                            {preset.description}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs border ${categoryColors[preset.category]}`}>
                          {categoryLabels[preset.category]}
                        </span>
                      </div>

                      {/* 标签 */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {preset.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-white/10 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                        {preset.tags.length > 3 && (
                          <span className="px-2 py-1 bg-white/10 rounded text-xs">
                            +{preset.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* 规格信息 */}
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">预估显存:</span>
                          <span className="font-medium">{formatMemory(preset.estimatedMemory)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">推荐GPU:</span>
                          <span className="font-medium text-right flex-1 ml-2">
                            {preset.recommendedGPU[0]}
                            {preset.recommendedGPU.length > 1 && ' 等'}
                          </span>
                        </div>
                      </div>

                      {/* 选中指示器 */}
                      {selectedPreset?.id === preset.id && (
                        <motion.div
                          className="absolute top-2 right-2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", duration: 0.3 }}
                        >
                          <CheckCircle className="w-5 h-5 text-blue-500" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 底部操作栏 */}
              {selectedPreset && (
                <motion.div
                  className="mt-6 p-4 glass-card border-t border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{selectedPreset.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        显存需求: {formatMemory(selectedPreset.estimatedMemory)} • 
                        推荐GPU: {selectedPreset.recommendedGPU.join(', ')}
                      </p>
                    </div>
                    <button
                      onClick={() => handleApplyPreset(selectedPreset)}
                      className="glass-button-primary flex items-center gap-2 px-6 py-2"
                    >
                      <Zap className="w-4 h-4" />
                      应用配置
                    </button>
                  </div>
                </motion.div>
              )}

              {/* 无结果提示 */}
              {filteredPresets.length === 0 && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>未找到匹配的预设配置</p>
                    <p className="text-sm mt-1">尝试调整搜索条件或分类筛选</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 