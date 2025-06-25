'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Gpu, Zap, AlertTriangle, CheckCircle, Star, Users, Calculator } from 'lucide-react';
import { AnimatedNumber } from '@/components/animated-number';
import { getGPURecommendations, getMultiGPURecommendations } from '@/lib/models-data';
import { formatMemorySize, assessMemoryUsage } from '@/utils/memory-formulas';
import { useLanguage } from '@/contexts/language-context';

interface GPURecommendationsProps {
  requiredMemoryGB: number;
  title?: string;
}

export function GPURecommendations({ requiredMemoryGB, title }: GPURecommendationsProps) {
  const [enableMultiGPU, setEnableMultiGPU] = useState(false);
  const { t } = useLanguage();
  
  const displayTitle = title || t('gpu.recommendations');

  // 获取推荐的GPU
  const recommendations = useMemo(() => 
    getGPURecommendations(requiredMemoryGB), [requiredMemoryGB]
  );

  // 获取多机GPU配置推荐
  const multiGPUConfigs = useMemo(() => {
    if (!enableMultiGPU || requiredMemoryGB <= 24) return [];
    return getMultiGPURecommendations(requiredMemoryGB).slice(0, 8);
  }, [requiredMemoryGB, enableMultiGPU]);

  // 按适合度和价格排序单卡推荐
  const sortedRecommendations = useMemo(() => {
    return recommendations
      .map(gpu => ({
        ...gpu,
        usage: assessMemoryUsage(requiredMemoryGB, gpu.memory),
        fitScore: gpu.memory >= requiredMemoryGB ? 
          (100 - ((gpu.memory - requiredMemoryGB) / gpu.memory) * 50) : 0
      }))
      .sort((a, b) => {
        // 首先按是否满足需求排序
        if (a.fitScore > 0 && b.fitScore === 0) return -1;
        if (a.fitScore === 0 && b.fitScore > 0) return 1;
        
        // 然后按利用率排序（70-90%为最佳）
        const aOptimal = Math.abs(a.usage.utilizationRate - 80);
        const bOptimal = Math.abs(b.usage.utilizationRate - 80);
        return aOptimal - bOptimal;
      });
  }, [recommendations, requiredMemoryGB]);

  const getUtilizationColor = (rate: number) => {
    if (rate <= 70) return 'text-green-500';
    if (rate <= 90) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getUtilizationIcon = (rate: number) => {
    if (rate <= 70) return CheckCircle;
    if (rate <= 90) return AlertTriangle;
    return AlertTriangle;
  };

  const getPriceCategory = (price: number) => {
    if (price <= 1000) return { label: t('gpu.price.budget'), color: 'text-green-600', bg: 'bg-green-500/10' };
    if (price <= 5000) return { label: t('gpu.price.mid.range'), color: 'text-blue-600', bg: 'bg-blue-500/10' };
    if (price <= 20000) return { label: t('gpu.price.high.end'), color: 'text-purple-600', bg: 'bg-purple-500/10' };
    return { label: t('gpu.price.enterprise'), color: 'text-red-600', bg: 'bg-red-500/10' };
  };

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl glass-card">
          <Gpu className="w-5 h-5 text-indigo-500" />
        </div>
        <h3 className="text-xl font-semibold">{displayTitle}</h3>
        <div className="ml-auto text-sm text-gray-600">
          {t('gpu.requirement')}: <span className="font-mono text-indigo-600">{formatMemorySize(requiredMemoryGB)}</span>
        </div>
      </div>

      {/* 多卡配置选项 */}
      <div className="mb-6 p-4 glass-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-500" />
            <span className="font-medium">{t('gpu.multi.card.config')}</span>
            <span className="text-xs text-gray-500">
              {requiredMemoryGB <= 24 
                ? `${t('gpu.over.24gb.available')} (${t('gpu.current.requirement')}: ${requiredMemoryGB.toFixed(1)}GB)`
                : `(${t('gpu.current.requirement')}: ${requiredMemoryGB.toFixed(1)}GB)`
              }
            </span>
          </div>
          <button
            onClick={() => setEnableMultiGPU(!enableMultiGPU)}
            className={`w-12 h-6 rounded-full transition-all duration-300 ${
              enableMultiGPU ? 'bg-cyan-500' : requiredMemoryGB <= 24 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-600'
            }`}
            disabled={requiredMemoryGB <= 24}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
              enableMultiGPU ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        {requiredMemoryGB <= 24 && (
          <div className="text-xs text-gray-500 p-3 bg-gray-500/10 rounded-lg">
            💡 {t('gpu.multi.card.hint')}
          </div>
        )}
        
        {enableMultiGPU && requiredMemoryGB > 24 && (
          <div className="space-y-3">
            <p className="text-xs text-gray-500">
              {t('gpu.multi.machine.description')}
            </p>
          </div>
        )}
      </div>

      {/* 多卡推荐 */}
      {enableMultiGPU && multiGPUConfigs.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-4 h-4 text-cyan-500" />
            <h4 className="font-medium">{t('gpu.multi.machine.config')}</h4>
          </div>
          
          <div className="space-y-3">
            {multiGPUConfigs.map((config, index) => {
              const utilizationRate = (requiredMemoryGB / config.totalMemory) * 100;
              const UtilizationIcon = getUtilizationIcon(utilizationRate);
              const isRecommended = index === 0;
              
              return (
                <motion.div
                  key={`${config.gpu.id}-${config.numNodes}-${config.gpusPerNode}`}
                  className={`relative p-4 rounded-xl border transition-all duration-300 ${
                    isRecommended 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/40' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {isRecommended && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {t('gpu.best.config')}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="font-semibold text-lg mb-1">
                        {config.gpu.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {config.suggestionKey ? t(config.suggestionKey, config.suggestionParams) : config.suggestion}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-gray-500 text-xs">{t('gpu.total.memory')}</div>
                        <div className="font-mono font-medium">
                          {config.totalMemory}GB
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs">{t('gpu.utilization')}</div>
                        <div className={`font-mono font-medium flex items-center gap-1 ${getUtilizationColor(utilizationRate)}`}>
                          <UtilizationIcon className="w-3 h-3" />
                          {utilizationRate.toFixed(1)}%
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-gray-500 text-xs">{t('gpu.total.price')}</div>
                        <div className="font-mono font-medium text-green-600">
                          ${config.totalCost.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs">{t('gpu.per.machine')}</div>
                        <div className="font-mono font-medium text-blue-600">
                          {config.memoryPerNode}GB
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 配置详情 */}
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <div className="grid grid-cols-3 gap-4 text-xs text-gray-400">
                      <div>
                        <span className="text-gray-500">{t('gpu.machine.count')}:</span>
                        <span className="ml-1 font-mono">{config.numNodes}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">{t('gpu.gpu.per.machine')}:</span>
                        <span className="ml-1 font-mono">{config.gpusPerNode}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">{t('gpu.total.gpus')}:</span>
                        <span className="ml-1 font-mono">{config.totalGPUs}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* 单卡推荐 */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Gpu className="w-4 h-4 text-indigo-500" />
          <h4 className="font-medium">{t('gpu.single.card.recommendation')}</h4>
        </div>

        {sortedRecommendations.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Gpu className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>{t('gpu.no.suitable')}</p>
            <p className="text-sm mt-1">{t('gpu.check.memory.requirement')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedRecommendations.slice(0, 6).map((gpu, index) => {
              const UtilizationIcon = getUtilizationIcon(gpu.usage.utilizationRate);
              const priceCategory = getPriceCategory(gpu.price);
              const isRecommended = index === 0 && gpu.fitScore > 0;
              
              return (
                <motion.div
                  key={gpu.id}
                  className={`relative p-4 rounded-xl border transition-all duration-300 ${
                    isRecommended 
                      ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-indigo-500/40' 
                      : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/30'
                  }`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* 推荐标签 */}
                  {isRecommended && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {t('gpu.best.recommendation')}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg">{gpu.name}</h4>
                        <div className={`px-2 py-1 rounded-lg text-xs font-medium ${priceCategory.bg} ${priceCategory.color}`}>
                          {priceCategory.label}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <div className="text-gray-500 text-xs">{t('gpu.memory.capacity')}</div>
                          <div className="font-mono font-medium">
                            <AnimatedNumber value={gpu.memory} format={(n) => `${n}GB`} />
                          </div>
                        </div>

                        <div>
                          <div className="text-gray-500 text-xs">{t('gpu.utilization')}</div>
                          <div className={`font-mono font-medium flex items-center gap-1 ${getUtilizationColor(gpu.usage.utilizationRate)}`}>
                            <UtilizationIcon className="w-3 h-3" />
                            <AnimatedNumber 
                              value={gpu.usage.utilizationRate} 
                              format={(n) => `${n.toFixed(1)}%`} 
                            />
                          </div>
                        </div>

                        <div>
                          <div className="text-gray-500 text-xs">{t('gpu.market.price')}</div>
                          <div className="font-mono font-medium text-green-600">
                            $<AnimatedNumber value={gpu.price} format={(n) => n.toLocaleString()} />
                          </div>
                        </div>

                        <div>
                          <div className="text-gray-500 text-xs">{t('gpu.cloud.service')}</div>
                          <div className="font-mono font-medium text-blue-600">
                            $<AnimatedNumber value={gpu.cloudPrice || 0} format={(n) => `${n.toFixed(2)}/h`} />
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-xs">
                        <span className="text-gray-500">{t('gpu.architecture')}:</span>
                        <span className="font-mono">{gpu.architecture}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-500">{t('gpu.compute.power')}:</span>
                        <span className="font-mono">{gpu.computeCapability}</span>
                      </div>

                      {/* 特性显示 */}
                      {gpu.features && gpu.features.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {gpu.features.slice(0, 4).map((feature, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 bg-white/10 rounded-md">
                              {feature}
                            </span>
                          ))}
                          {gpu.features.length > 4 && (
                            <span className="text-xs px-2 py-1 bg-white/10 rounded-md">
                              +{gpu.features.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      {/* 状态消息 */}
                      <div className="mt-3">
                        <div className={`text-xs px-2 py-1 rounded ${
                          gpu.usage.status === 'optimal' ? 'bg-green-500/10 text-green-700' :
                          gpu.usage.status === 'warning' ? 'bg-yellow-500/10 text-yellow-700' :
                          'bg-red-500/10 text-red-700'
                        }`}>
                          {gpu.usage.message}
                        </div>
                      </div>
                    </div>

                    {/* 适合度分数 */}
                    <div className="ml-4 text-center">
                      <div className="text-2xl font-bold text-indigo-600">
                        <AnimatedNumber value={gpu.fitScore} format={(n) => n.toFixed(0)} />
                      </div>
                      <div className="text-xs text-gray-500">{t('gpu.fitness.score')}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* 显示更多选项提示 */}
            {sortedRecommendations.length > 6 && (
                          <div className="text-center text-sm text-gray-500 pt-4">
              {sortedRecommendations.length - 6} {t('gpu.other.options')}
            </div>
            )}
          </div>
        )}
      </div>

      {/* GPU选择指南 */}
      <div className="mt-6 pt-6 border-t border-white/20">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-500" />
          {t('gpu.selection.guide')}
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <div className="font-medium text-green-600 mb-1">✓ {t('gpu.recommended.config')}</div>
            <ul className="space-y-1 text-xs">
              <li>• {t('gpu.memory.utilization.70.90')}</li>
              <li>• {t('gpu.latest.cuda.support')}</li>
              <li>• {t('gpu.cost.effective')}</li>
              {enableMultiGPU && <li>• {t('gpu.multi.machine.infiniband')}</li>}
            </ul>
          </div>
          <div>
            <div className="font-medium text-yellow-600 mb-1">⚠️ {t('gpu.precautions')}</div>
            <ul className="space-y-1 text-xs">
              <li>• {t('gpu.reserve.buffer')}</li>
              <li>• {t('gpu.consider.power.cooling')}</li>
              <li>• {t('gpu.evaluate.cloud.cost')}</li>
              {enableMultiGPU && <li>• {t('gpu.multi.machine.distributed')}</li>}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 