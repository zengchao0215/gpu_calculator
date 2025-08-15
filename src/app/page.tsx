'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Calculator, Cpu, Zap, History, Settings, Keyboard, Star, Users, MessageSquare, Image, Github } from 'lucide-react';
import { SimpleThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { useTheme } from '@/contexts/theme-context';
import { useLanguage } from '@/contexts/language-context';
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
    loading: () => <div className="glass-card p-8 text-center">Loading...</div>,
    ssr: false 
  }
);

const InferenceCalculator = dynamic(
  () => import('@/components/calculators/inference-calculator').then(mod => ({ default: mod.InferenceCalculator })),
  { 
    loading: () => <div className="glass-card p-8 text-center">Loading...</div>,
    ssr: false 
  }
);

const FineTuningCalculator = dynamic(
  () => import('@/components/calculators/fine-tuning-calculator').then(mod => ({ default: mod.FineTuningCalculator })),
  { 
    loading: () => <div className="glass-card p-8 text-center">Loading...</div>,
    ssr: false 
  }
);

const GRPOCalculator = dynamic(
  () => import('@/components/calculators/grpo-calculator').then(mod => ({ default: mod.GRPOCalculator })),
  {
    loading: () => <div className="glass-card p-8 text-center">Loading...</div>,
    ssr: false
  }
);

const AdvancedFineTuningCalculator = dynamic(
  () => import('@/components/calculators/advanced-fine-tuning-calculator').then(mod => ({ default: mod.AdvancedFineTuningCalculator })),
  {
    loading: () => <div className="glass-card p-8 text-center">Loading...</div>,
    ssr: false
  }
);

const MultimodalCalculator = dynamic(
  () => import('@/components/calculators/multimodal-calculator').then(mod => ({ default: mod.MultimodalCalculator })),
  { 
    loading: () => <div className="glass-card p-8 text-center">Loading...</div>,
    ssr: false 
  }
);

// 懒加载面板组件
const HistoryPanel = dynamic(() => import('@/components/history-panel'), {
  loading: () => <div className="glass-card p-8 text-center">Loading history...</div>,
});

const SettingsPanel = dynamic(() => import('@/components/settings-panel'), {
  loading: () => <div className="glass-card p-8 text-center">Loading settings...</div>,
});

export default function Home() {
  const { 
    primaryTab,
    setPrimaryTab,
    activeTab, 
    setActiveTab, 
    getCurrentResult, 
    history,
    compareList,
    multimodalConfig,
    setMultimodalConfig
  } = useCalculatorStore();
  
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const { toggleTheme } = useTheme();
  const { t } = useLanguage();
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
    switchToInference: () => {
      setActiveTab('inference');
      performanceMonitor.recordInteraction();
    },
    switchToTraining: () => {
      setActiveTab('training');
      performanceMonitor.recordInteraction();
    },
    switchToFineTuning: () => {
      setActiveTab('finetuning');
      performanceMonitor.recordInteraction();
    },
    switchToGRPO: () => {
      setActiveTab('grpo');
      performanceMonitor.recordInteraction();
    },
    switchToMultimodal: () => {
      setPrimaryTab('multimodal');
      setActiveTab('inference'); // 切换到多模态的推理页
      performanceMonitor.recordInteraction();
    },
    switchToNLP: () => {
      setPrimaryTab('nlp');
      setActiveTab('inference'); // 切换到NLP的推理页
      performanceMonitor.recordInteraction();
    },
    showHelp: () => {
      setShowKeyboardHelp(true);
      performanceMonitor.recordInteraction();
    }
  });
  
  useKeyboardShortcuts(shortcuts);
  
  // 监听语言切换事件，重新计算以更新Memory Breakdown标签
  useEffect(() => {
    const handleLanguageChange = () => {
      // 延迟一点确保localStorage已更新
      setTimeout(() => {
        // 重新计算当前活跃的计算器
        if (primaryTab === 'multimodal') {
          useCalculatorStore.getState().calculateMultimodalMemory();
        } else {
          switch (activeTab) {
            case 'training':
              useCalculatorStore.getState().calculateTrainingMemory();
              break;
            case 'inference':
              useCalculatorStore.getState().calculateInferenceMemory();
              break;
            case 'finetuning':
              useCalculatorStore.getState().calculateFineTuningMemory();
              break;
            case 'grpo':
              useCalculatorStore.getState().calculateGRPOMemory();
              break;
          }
        }
      }, 100);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, [primaryTab, activeTab]);
  
  const currentResult = getCurrentResult();
  const requiredMemoryGB = currentResult ? currentResult.total : 25;

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
              {t('header.title')}
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('header.description')}
          </p>
          
          {/* 工具栏 */}
          <div className="flex items-center justify-center gap-2 md:gap-4 mt-8">
            <button
              onClick={() => setShowHistory(true)}
              className="glass-button flex items-center gap-1 md:gap-2 relative"
            >
              <History className="w-4 h-4" />
              <span>{t('nav.history')}</span>
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
              <span className="hidden md:inline">{t('nav.presets')}</span>
            </button>
            
            <button
              onClick={() => setShowSettings(true)}
              className="glass-button flex items-center gap-1 md:gap-2"
            >
              <Settings className="w-4 h-4" />
              <span>{t('nav.settings')}</span>
            </button>
            
            <button
              onClick={() => setShowKeyboardHelp(true)}
              className="glass-button flex items-center gap-1 md:gap-2"
              title={t('nav.shortcuts')}
            >
              <Keyboard className="w-4 h-4" />
              <span className="hidden md:inline">{t('nav.shortcuts')}</span>
            </button>
            
            <LanguageToggle />
            
            <SimpleThemeToggle />
            
            <a
              href="https://github.com/st-lzh/vram-wuhrai"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button p-3 rounded-xl"
              title="GitHub Repository"
            >
              <Github className="w-5 h-5" />
            </a>
            
            {compareList.length > 0 && (
              <button
                onClick={() => setShowHistory(true)}
                className="glass-button flex items-center gap-1 md:gap-2 bg-purple-500/20 relative"
              >
                <span>{t('nav.compare')}</span>
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center">
                  {compareList.length}
                </span>
              </button>
            )}
          </div>
        </motion.header>

        {/* 功能标签页 - 二级分组结构 */}
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* 主分组标签页 */}
          <Tabs value={primaryTab} onValueChange={(value) => setPrimaryTab(value as typeof primaryTab)} className="w-full">
            <div className="flex justify-center mb-6">
              <TabsList className="grid w-full max-w-2xl grid-cols-3">
                <TabsTrigger value="nlp" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>{t('tabs.nlp')}</span>
                </TabsTrigger>
                <TabsTrigger value="multimodal" className="flex items-center gap-2">
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <Image className="w-4 h-4" />
                  <span>{t('tabs.multimodal')}</span>
                </TabsTrigger>
                <TabsTrigger value="advanced" className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  <span>{t('tabs.advanced')}</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* NLP模型组 */}
            <TabsContent value="nlp" className="space-y-6">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)} className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList className="grid w-full max-w-4xl grid-cols-4">
                    <TabsTrigger value="inference" className="flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      <span className="hidden sm:inline">{t('tabs.inference')}</span>
                      <span className="sm:hidden">{t('tabs.inference').split(' ')[0]}</span>
                    </TabsTrigger>
                    <TabsTrigger value="finetuning" className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      <span className="hidden sm:inline">{t('tabs.finetuning')}</span>
                      <span className="sm:hidden">{t('tabs.finetuning').split(' ')[0]}</span>
                    </TabsTrigger>
                    <TabsTrigger value="training" className="flex items-center gap-2">
                      <Calculator className="w-4 h-4" />
                      <span className="hidden sm:inline">{t('tabs.training')}</span>
                      <span className="sm:hidden">{t('tabs.training').split(' ')[0]}</span>
                    </TabsTrigger>
                    <TabsTrigger value="grpo" className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="hidden sm:inline">{t('tabs.grpo')}</span>
                      <span className="sm:hidden">{t('tabs.grpo')}</span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="inference" className="space-y-8">
                  <motion.div
                    key="nlp-inference-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <InferenceCalculator />
                  </motion.div>
                </TabsContent>

                <TabsContent value="finetuning" className="space-y-8">
                  <motion.div
                    key="nlp-finetuning-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FineTuningCalculator />
                  </motion.div>
                </TabsContent>

                <TabsContent value="training" className="space-y-8">
                  <motion.div
                    key="nlp-training-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <TrainingCalculator />
                  </motion.div>
                </TabsContent>

                <TabsContent value="grpo" className="space-y-8">
                  <motion.div
                    key="nlp-grpo-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <GRPOCalculator />
                  </motion.div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* 多模态模型组 */}
            <TabsContent value="multimodal" className="space-y-6">
              <Tabs value={multimodalConfig.mode} onValueChange={(value) => setMultimodalConfig({ mode: value as 'training' | 'inference' | 'finetuning' })} className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList className="grid w-full max-w-3xl grid-cols-3">
                    <TabsTrigger value="inference" className="flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      <span className="hidden sm:inline">{t('tabs.inference')}</span>
                      <span className="sm:hidden">{t('tabs.inference').split(' ')[0]}</span>
                    </TabsTrigger>
                    <TabsTrigger value="finetuning" className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      <span className="hidden sm:inline">{t('tabs.finetuning')}</span>
                      <span className="sm:hidden">{t('tabs.finetuning').split(' ')[0]}</span>
                    </TabsTrigger>
                    <TabsTrigger value="training" className="flex items-center gap-2">
                      <Calculator className="w-4 h-4" />
                      <span className="hidden sm:inline">{t('tabs.training')}</span>
                      <span className="sm:hidden">{t('tabs.training').split(' ')[0]}</span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="inference" className="space-y-8">
                  <motion.div
                    key="multimodal-inference-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <MultimodalCalculator mode="inference" />
                  </motion.div>
                </TabsContent>

                <TabsContent value="finetuning" className="space-y-8">
                  <motion.div
                    key="multimodal-finetuning-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <MultimodalCalculator mode="finetuning" />
                  </motion.div>
                </TabsContent>

                <TabsContent value="training" className="space-y-8">
                  <motion.div
                    key="multimodal-training-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <MultimodalCalculator mode="training" />
                  </motion.div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* 高级微调组 */}
            <TabsContent value="advanced" className="space-y-6">
              <motion.div
                key="advanced-finetuning-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <AdvancedFineTuningCalculator />
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
            title={`${
              primaryTab === 'nlp' ? t('tabs.nlp') : t('tabs.multimodal')
            } - ${
              primaryTab === 'multimodal' 
                ? (multimodalConfig.mode === 'training' ? t('tabs.training') : 
                   multimodalConfig.mode === 'inference' ? t('tabs.inference') : t('tabs.finetuning'))
                : (activeTab === 'training' ? t('tabs.training') : 
                   activeTab === 'inference' ? t('tabs.inference') : 
                   activeTab === 'finetuning' ? t('tabs.finetuning') :
                   activeTab === 'grpo' ? t('tabs.grpo') : 'Unknown')
            } ${t('gpu.scenario')} ${t('gpu.recommendations')}`}
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
            <h3 className="text-lg font-semibold mb-3">{t('feature.precise')}</h3>
            <p className="text-gray-600 text-sm">
              {t('feature.precise.desc')}
            </p>
          </div>

          <div className="glass-card-hover p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl glass-card flex items-center justify-center">
              <Brain className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold mb-3">{t('feature.models')}</h3>
            <p className="text-gray-600 text-sm">
              {t('feature.models.desc')}
            </p>
          </div>

          <div className="glass-card-hover p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl glass-card flex items-center justify-center">
              <Cpu className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold mb-3">{t('feature.gpu')}</h3>
            <p className="text-gray-600 text-sm">
              {t('feature.gpu.desc')}
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
            <p className="text-xs text-gray-400 mt-3">
              {t('footer.made')} <a href="https://wuhrai.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Wuhr AI Team</a>
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
