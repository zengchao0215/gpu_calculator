'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Gpu, Zap, AlertTriangle, CheckCircle, Star } from 'lucide-react';
import { AnimatedNumber } from '@/components/animated-number';
import { getGPURecommendations } from '@/lib/models-data';
import { formatMemorySize, assessMemoryUsage } from '@/utils/memory-formulas';

interface GPURecommendationsProps {
  requiredMemoryGB: number;
  title?: string;
}

export function GPURecommendations({ requiredMemoryGB, title = "GPU推荐" }: GPURecommendationsProps) {
  // 获取推荐的GPU
  const recommendations = useMemo(() => 
    getGPURecommendations(requiredMemoryGB), [requiredMemoryGB]
  );

  // 按适合度和价格排序
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
    if (price <= 1000) return { label: '预算级', color: 'text-green-600', bg: 'bg-green-500/10' };
    if (price <= 5000) return { label: '中端', color: 'text-blue-600', bg: 'bg-blue-500/10' };
    if (price <= 20000) return { label: '高端', color: 'text-purple-600', bg: 'bg-purple-500/10' };
    return { label: '企业级', color: 'text-red-600', bg: 'bg-red-500/10' };
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
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="ml-auto text-sm text-gray-600">
          需求: <span className="font-mono text-indigo-600">{formatMemorySize(requiredMemoryGB)}</span>
        </div>
      </div>

      {sortedRecommendations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Gpu className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>暂无合适的GPU推荐</p>
          <p className="text-sm mt-1">请检查显存需求是否合理</p>
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
                    最佳推荐
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
                        <div className="text-gray-500 text-xs">显存容量</div>
                        <div className="font-mono font-medium">
                          <AnimatedNumber value={gpu.memory} format={(n) => `${n}GB`} />
                        </div>
                      </div>

                      <div>
                        <div className="text-gray-500 text-xs">利用率</div>
                        <div className={`font-mono font-medium flex items-center gap-1 ${getUtilizationColor(gpu.usage.utilizationRate)}`}>
                          <UtilizationIcon className="w-3 h-3" />
                          <AnimatedNumber 
                            value={gpu.usage.utilizationRate} 
                            format={(n) => `${n.toFixed(1)}%`} 
                          />
                        </div>
                      </div>

                      <div>
                        <div className="text-gray-500 text-xs">市场价格</div>
                        <div className="font-mono font-medium text-green-600">
                          $<AnimatedNumber value={gpu.price} format={(n) => n.toLocaleString()} />
                        </div>
                      </div>

                      <div>
                        <div className="text-gray-500 text-xs">云服务</div>
                        <div className="font-mono font-medium text-blue-600">
                          $<AnimatedNumber value={gpu.cloudPrice || 0} format={(n) => `${n.toFixed(2)}/h`} />
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs">
                      <span className="text-gray-500">架构:</span>
                      <span className="font-mono">{gpu.architecture}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-500">算力:</span>
                      <span className="font-mono">{gpu.computeCapability}</span>
                    </div>

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
                    <div className="text-xs text-gray-500">适合度</div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* 显示更多选项提示 */}
          {sortedRecommendations.length > 6 && (
            <div className="text-center text-sm text-gray-500 pt-4">
              还有 {sortedRecommendations.length - 6} 个其他选项
            </div>
          )}
        </div>
      )}

      {/* GPU选择指南 */}
      <div className="mt-6 pt-6 border-t border-white/20">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-500" />
          选择指南
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <div className="font-medium text-green-600 mb-1">✓ 推荐配置</div>
            <ul className="space-y-1 text-xs">
              <li>• 显存利用率 70-90%</li>
              <li>• 支持最新CUDA架构</li>
              <li>• 性价比均衡</li>
            </ul>
          </div>
          <div>
            <div className="font-medium text-yellow-600 mb-1">⚠️ 注意事项</div>
            <ul className="space-y-1 text-xs">
              <li>• 预留额外显存缓冲</li>
              <li>• 考虑功耗和散热</li>
              <li>• 评估云服务成本</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 