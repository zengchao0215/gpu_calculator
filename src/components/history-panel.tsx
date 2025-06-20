'use client';

import { useState } from 'react';
import { useCalculatorStore } from '@/store/calculator-store';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Trash2, GitCompare, Copy, X } from 'lucide-react';

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HistoryPanel({ isOpen, onClose }: HistoryPanelProps) {
  const {
    history,
    compareList,
    removeFromHistory,
    clearHistory,
    addToCompare,
    removeFromCompare,
    clearCompare,
    setTrainingConfig,
    setInferenceConfig,
    setFineTuningConfig,
    setActiveTab
  } = useCalculatorStore();

  const [activeHistoryTab, setActiveHistoryTab] = useState<'history' | 'compare'>('history');

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 GB';
    const gb = bytes / (1024 ** 3);
    return `${gb.toFixed(2)} GB`;
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'training': return '训练';
      case 'inference': return '推理';
      case 'finetuning': return '微调';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'training': return 'bg-blue-500';
      case 'inference': return 'bg-green-500';
      case 'finetuning': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const handleLoadConfig = (item: unknown) => {
    const historyItem = item as { type: string; config: unknown };
    switch (historyItem.type) {
      case 'training':
        setTrainingConfig(historyItem.config as Record<string, unknown>);
        setActiveTab('training');
        break;
      case 'inference':
        setInferenceConfig(historyItem.config as Record<string, unknown>);
        setActiveTab('inference');
        break;
      case 'finetuning':
        setFineTuningConfig(historyItem.config as Record<string, unknown>);
        setActiveTab('finetuning');
        break;
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-6xl h-[80vh] flex flex-col">
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <h2 className="text-2xl font-bold">计算历史</h2>
          <button
            onClick={onClose}
            className="glass-button !p-2 hover:bg-red-500/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 标签页切换 */}
        <div className="flex border-b border-white/20">
          <button
            onClick={() => setActiveHistoryTab('history')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeHistoryTab === 'history'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            历史记录 ({history.length})
          </button>
          <button
            onClick={() => setActiveHistoryTab('compare')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeHistoryTab === 'compare'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            对比列表 ({compareList.length})
          </button>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-hidden">
          {activeHistoryTab === 'history' ? (
            <div className="h-full flex flex-col">
              {/* 工具栏 */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    共 {history.length} 条记录
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearHistory}
                    className="glass-button !py-2 !px-4 text-sm flex items-center gap-2 hover:bg-red-500/20"
                    disabled={history.length === 0}
                  >
                    <Trash2 className="w-4 h-4" />
                    清空
                  </button>
                </div>
              </div>

              {/* 历史记录列表 */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-glass">
                {history.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    暂无历史记录
                  </div>
                ) : (
                  history.map((item) => (
                    <div
                      key={item.id}
                      className="glass-card-hover p-4 cursor-pointer"
                      onClick={() => handleLoadConfig(item)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`w-3 h-3 rounded-full ${getTypeColor(item.type)}`} />
                            <span className="font-medium">{getTypeLabel(item.type)}</span>
                            {item.modelName && (
                              <span className="text-sm text-gray-600">
                                {item.modelName}
                              </span>
                            )}
                            <span className="text-xs text-gray-500">
                              {formatDistanceToNow(new Date(item.timestamp), { 
                                addSuffix: true, 
                                locale: zhCN 
                              })}
                            </span>
                          </div>
                          
                          <div className="text-lg font-bold text-blue-600 mb-1">
                            总显存: {formatBytes(item.result.total * 1024 ** 3)}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>模型: {formatBytes(item.result.modelParams * 1024 ** 3)}</span>
                            <span>激活: {formatBytes(item.result.activations * 1024 ** 3)}</span>
                            {item.result.optimizer > 0 && (
                              <span>优化器: {formatBytes(item.result.optimizer * 1024 ** 3)}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCompare(item);
                            }}
                            className="glass-button !p-2 text-xs"
                            disabled={compareList.some(c => c.id === item.id) || compareList.length >= 4}
                          >
                            <GitCompare className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(JSON.stringify(item.config, null, 2));
                            }}
                            className="glass-button !p-2 text-xs"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFromHistory(item.id);
                            }}
                            className="glass-button !p-2 text-xs hover:bg-red-500/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              {/* 对比工具栏 */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    已选择 {compareList.length}/4 个配置进行对比
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearCompare}
                    className="glass-button !py-2 !px-4 text-sm flex items-center gap-2 hover:bg-red-500/20"
                    disabled={compareList.length === 0}
                  >
                    <X className="w-4 h-4" />
                    清空对比
                  </button>
                </div>
              </div>

              {/* 对比内容 */}
              <div className="flex-1 overflow-y-auto p-4">
                {compareList.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <GitCompare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>从历史记录中选择配置进行对比</p>
                    <p className="text-sm mt-2">最多可以对比 4 个配置</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {compareList.map((item) => (
                      <div key={item.id} className="glass-card p-4 relative">
                        <button
                          onClick={() => removeFromCompare(item.id)}
                          className="absolute top-2 right-2 glass-button !p-1 hover:bg-red-500/20"
                        >
                          <X className="w-3 h-3" />
                        </button>

                        <div className="mb-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`w-2 h-2 rounded-full ${getTypeColor(item.type)}`} />
                            <span className="font-medium text-sm">{getTypeLabel(item.type)}</span>
                          </div>
                          {item.modelName && (
                            <p className="text-xs text-gray-600 truncate">{item.modelName}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">
                              {formatBytes(item.result.total * 1024 ** 3)}
                            </div>
                            <div className="text-xs text-gray-500">总显存</div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="text-center p-2 bg-white/20 rounded">
                              <div className="font-medium">
                                {formatBytes(item.result.modelParams * 1024 ** 3)}
                              </div>
                              <div className="text-gray-600">模型</div>
                            </div>
                            <div className="text-center p-2 bg-white/20 rounded">
                              <div className="font-medium">
                                {formatBytes(item.result.activations * 1024 ** 3)}
                              </div>
                              <div className="text-gray-600">激活</div>
                            </div>
                          </div>

                          {item.result.optimizer > 0 && (
                            <div className="text-center p-2 bg-white/20 rounded text-xs">
                              <div className="font-medium">
                                {formatBytes(item.result.optimizer * 1024 ** 3)}
                              </div>
                              <div className="text-gray-600">优化器</div>
                            </div>
                          )}

                          <button
                            onClick={() => handleLoadConfig(item)}
                            className="w-full glass-button !py-2 !text-xs"
                          >
                            加载配置
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 