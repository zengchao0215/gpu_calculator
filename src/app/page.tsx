'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Calculator, Cpu, Zap, History, Settings, Keyboard, Star } from 'lucide-react';
import { SimpleThemeToggle } from '@/components/ui/theme-toggle';
import { useTheme } from '@/contexts/theme-context';
import { useKeyboardShortcuts, getDefaultShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { KeyboardShortcutsHelp } from '@/components/keyboard-shortcuts-help';
import { ConfigPresetsPanel } from '@/components/config-presets-panel';
import { ErrorNotification } from '@/components/error-notification';
import { useErrorHandler } from '@/hooks/use-error-handler';
import { usePerformanceMonitor } from '@/hooks/use-performance-monitor';
import { useCalculatorStore } from '@/store/calculator-store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import dynamic from 'next/dynamic';
import { GPURecommendations } from '@/components/gpu-recommendations';

// 懒加载计算器组件
const TrainingCalculator = dynamic(
  () => import('@/components/calculators/training-calculator').then(mod => ({ default: mod.TrainingCalculator })),
  { 
    loading: () => <div className="glass-card p-8 text-center">加载中...</div>,
    ssr: false 
  }
);

const InferenceCalculator = dynamic(
  () => import('@/components/calculators/inference-calculator').then(mod => ({ default: mod.InferenceCalculator })),
  { 
    loading: () => <div className="glass-card p-8 text-center">加载中...</div>,
    ssr: false 
  }
);

const FineTuningCalculator = dynamic(
  () => import('@/components/calculators/fine-tuning-calculator').then(mod => ({ default: mod.FineTuningCalculator })),
  { 
    loading: () => <div className="glass-card p-8 text-center">加载中...</div>,
    ssr: false 
  }
);

// 懒加载面板组件
const HistoryPanel = dynamic(() => import('@/components/history-panel'), {
  loading: () => <div className="glass-card p-8 text-center">加载历史记录...</div>,
});

const SettingsPanel = dynamic(() => import('@/components/settings-panel'), {
  loading: () => <div className="glass-card p-8 text-center">加载设置...</div>,
});

export default function Home() {
  const { 
    activeTab, 
    setActiveTab, 
    getCurrentResult, 
    history,
    compareList 
  } = useCalculatorStore();
  
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const { toggleTheme } = useTheme();
  // const { isMobile, isTablet } = useResponsive();
  
  // 错误处理和性能监控
  const errorHandler = useErrorHandler();
  const performanceMonitor = usePerformanceMonitor();
  
  // 配置键盘快捷键
  const shortcuts = getDefaultShortcuts({
    showHistory: () => {
      setShowHistory(true);
      performanceMonitor.recordInteraction();
    },
    showSettings: () => {
      setShowSettings(true);
      performanceMonitor.recordInteraction();
    },
    toggleTheme: () => {
      toggleTheme();
      performanceMonitor.recordInteraction();
    },
    switchToTraining: () => {
      setActiveTab('training');
      performanceMonitor.recordInteraction();
    },
    switchToInference: () => {
      setActiveTab('inference');
      performanceMonitor.recordInteraction();
    },
    switchToFineTuning: () => {
      setActiveTab('finetuning');
      performanceMonitor.recordInteraction();
    },
    showHelp: () => {
      setShowKeyboardHelp(true);
      performanceMonitor.recordInteraction();
    }
  });
  
  useKeyboardShortcuts(shortcuts);
  
  const currentResult = getCurrentResult();
  const requiredMemoryGB = currentResult ? currentResult.total : 24;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 背景装饰球 */}
      <div className="floating-orb floating-orb-1"></div>
      <div className="floating-orb floating-orb-2"></div>
      <div className="floating-orb floating-orb-3"></div>
      <div className="floating-orb floating-orb-4"></div>
      
      {/* 主要内容 */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.header 
          className="text-center mb-12"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-2xl glass-card">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Wuhr AI VRAM Insight
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            专业的AI模型显存需求计算工具，支持训练、推理、微调三种模式，基于最新工程实践的精确计算公式，
            为您的GPU选型和部署规划提供专业指导
          </p>
          
          {/* 工具栏 */}
          <div className="flex items-center justify-center gap-2 md:gap-4 mt-8">
            <button
              onClick={() => setShowHistory(true)}
              className="glass-button flex items-center gap-1 md:gap-2 relative"
            >
              <History className="w-4 h-4" />
              <span>历史记录</span>
              {history.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                  {history.length}
                </span>
              )}
            </button>
            
            <button
              onClick={() => {
                setShowPresets(true);
                performanceMonitor.recordInteraction();
              }}
              className="glass-button flex items-center gap-1 md:gap-2"
            >
              <Star className="w-4 h-4" />
              <span className="hidden md:inline">预设</span>
            </button>
            
            <button
              onClick={() => setShowSettings(true)}
              className="glass-button flex items-center gap-1 md:gap-2"
            >
              <Settings className="w-4 h-4" />
              <span>设置</span>
            </button>
            
            <button
              onClick={() => setShowKeyboardHelp(true)}
              className="glass-button flex items-center gap-1 md:gap-2"
              title="键盘快捷键 (?)"
            >
              <Keyboard className="w-4 h-4" />
              <span className="hidden md:inline">快捷键</span>
            </button>
            
            <SimpleThemeToggle />
            
            {compareList.length > 0 && (
              <button
                onClick={() => setShowHistory(true)}
                className="glass-button flex items-center gap-1 md:gap-2 bg-purple-500/20 relative"
              >
                <span>对比列表</span>
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center">
                  {compareList.length}
                </span>
              </button>
            )}
          </div>
        </motion.header>

        {/* 功能标签页 */}
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'training' | 'inference' | 'finetuning')} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="training" className="flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  <span className="hidden sm:inline">训练显存</span>
                  <span className="sm:hidden">训练</span>
                </TabsTrigger>
                <TabsTrigger value="inference" className="flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  <span className="hidden sm:inline">推理显存</span>
                  <span className="sm:hidden">推理</span>
                </TabsTrigger>
                <TabsTrigger value="finetuning" className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span className="hidden sm:inline">微调显存</span>
                  <span className="sm:hidden">微调</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="training" className="space-y-8">
              <motion.div
                key="training-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TrainingCalculator />
              </motion.div>
            </TabsContent>

            <TabsContent value="inference" className="space-y-8">
              <motion.div
                key="inference-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <InferenceCalculator />
              </motion.div>
            </TabsContent>

            <TabsContent value="finetuning" className="space-y-8">
              <motion.div
                key="finetuning-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <FineTuningCalculator />
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* GPU推荐区域 - 可以根据当前计算结果显示 */}
        <motion.div
          className="max-w-7xl mx-auto mt-12"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <GPURecommendations 
            requiredMemoryGB={requiredMemoryGB}
            title={`${activeTab === 'training' ? '训练' : activeTab === 'inference' ? '推理' : '微调'}场景GPU推荐`}
          />
        </motion.div>

        {/* 功能特色展示 */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="glass-card-hover p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl glass-card flex items-center justify-center">
              <Calculator className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold mb-3">精确计算公式</h3>
            <p className="text-gray-600 text-sm">
              基于最新AI工程实践，支持混合精度、梯度检查点、量化等优化技术的精确显存计算
            </p>
          </div>

          <div className="glass-card-hover p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl glass-card flex items-center justify-center">
              <Brain className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold mb-3">50+主流模型</h3>
            <p className="text-gray-600 text-sm">
              涵盖Qwen、DeepSeek、Llama、ChatGLM等热门模型，参数规格实时更新
            </p>
          </div>

          <div className="glass-card-hover p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl glass-card flex items-center justify-center">
              <Cpu className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold mb-3">智能GPU推荐</h3>
            <p className="text-gray-600 text-sm">
              基于显存需求自动匹配最适合的GPU，包含价格对比和利用率分析
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="text-center mt-16 py-8 border-t border-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="glass-card inline-block p-4">
            <p className="text-sm text-gray-600">
              AI显存计算器 • 专业GPU显存需求分析工具 • 基于最新AI工程实践
            </p>
            <p className="text-xs text-gray-500 mt-2">
              支持训练、推理、微调三种场景 • 50+模型数据库 • 20+GPU规格对比
            </p>
            <div className="mt-4 flex justify-center items-center gap-4 text-xs">
              <a href="https://wuhrai.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">
                博客
              </a>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <a href="https://ai.wuhrai.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">
                模型API
              </a>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <a href="https://gpt.wuhrai.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">
                模型Chat
              </a>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <a href="mailto:1139804291@qq.com" className="text-blue-500 hover:text-blue-600 transition-colors">
                联系我们
              </a>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Made with ❤️ by <a href="https://wuhrai.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Wuhr AI Team</a>
            </p>
          </div>
        </motion.footer>
      </div>
      
      {/* 历史记录面板 */}
      <HistoryPanel 
        isOpen={showHistory} 
        onClose={() => setShowHistory(false)} 
      />
      
      {/* 设置面板 */}
      <SettingsPanel 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
      
      {/* 键盘快捷键帮助面板 */}
      <KeyboardShortcutsHelp 
        isOpen={showKeyboardHelp}
        onClose={() => setShowKeyboardHelp(false)}
        shortcuts={shortcuts}
      />
      
      {/* 配置预设面板 */}
      <ConfigPresetsPanel 
        isOpen={showPresets}
        onClose={() => setShowPresets(false)}
        currentType={activeTab}
      />
      
      {/* 错误通知 */}
      <ErrorNotification 
        errors={errorHandler.errors}
        onRemoveError={errorHandler.removeError}
        onClearAll={errorHandler.clearAllErrors}
      />
    </div>
  );
}
