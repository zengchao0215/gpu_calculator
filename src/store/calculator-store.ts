import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { 
  TrainingConfig, 
  InferenceConfig, 
  FineTuningConfig,
  MemoryBreakdown,
  CalculatorType 
} from '@/types';
import { 
  calculateTrainingMemory, 
  calculateInferenceMemory, 
  calculateFineTuningMemory 
} from '@/utils/memory-formulas';

interface CalculationHistory {
  id: string;
  timestamp: number;
  type: CalculatorType;
  config: unknown;
  result: MemoryBreakdown;
  modelName?: string;
  tags?: string[];
}

interface CalculatorStore {
  // 当前活跃的标签页
  activeTab: CalculatorType;
  setActiveTab: (tab: CalculatorType) => void;

  // 防抖计算超时处理器（内部使用）
  _trainingTimeout?: NodeJS.Timeout;
  _inferenceTimeout?: NodeJS.Timeout;
  _fineTuningTimeout?: NodeJS.Timeout;

  // 训练配置
  trainingConfig: TrainingConfig;
  setTrainingConfig: (config: Partial<TrainingConfig>) => void;
  trainingResult: MemoryBreakdown | null;

  // 推理配置
  inferenceConfig: InferenceConfig;
  setInferenceConfig: (config: Partial<InferenceConfig>) => void;
  inferenceResult: MemoryBreakdown | null;

  // 微调配置
  fineTuningConfig: FineTuningConfig;
  setFineTuningConfig: (config: Partial<FineTuningConfig>) => void;
  fineTuningResult: MemoryBreakdown | null;

  // 加载状态
  trainingLoading: boolean;
  inferenceLoading: boolean;
  fineTuningLoading: boolean;

  // 计算历史
  history: CalculationHistory[];
  addToHistory: (type: CalculatorType, config: unknown, result: MemoryBreakdown, modelName?: string) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;

  // 比较功能
  compareList: CalculationHistory[];
  addToCompare: (item: CalculationHistory) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;

  // 用户偏好设置
  preferences: {
    autoSave: boolean;
    showOptimizationTips: boolean;
    defaultPrecision: 'FP32' | 'FP16' | 'BF16';
    theme: 'light' | 'dark' | 'auto';
  };
  setPreferences: (prefs: Partial<CalculatorStore['preferences']>) => void;

  // 计算方法
  calculateTrainingMemory: () => Promise<void>;
  calculateInferenceMemory: () => Promise<void>;
  calculateFineTuningMemory: () => Promise<void>;
  
  // 获取当前结果
  getCurrentResult: () => MemoryBreakdown | null;
}

export const useCalculatorStore = create<CalculatorStore>()(
  persist(
    (set, get) => ({
      // 初始状态
      activeTab: 'training',
      
      // 训练配置默认值
      trainingConfig: {
        modelParams: 7.0,
        batchSize: 4,
        sequenceLength: 2048,
        precision: 'FP16',
        optimizer: 'AdamW',
        gradientCheckpointing: false,
        mixedPrecision: true
      },
      trainingResult: null,

      // 推理配置默认值
      inferenceConfig: {
        modelId: 'qwen2.5-7b',
        precision: 'FP16',
        quantization: 'None',
        batchSize: 1,
        sequenceLength: 2048,
        kvCacheRatio: 1.0
      },
      inferenceResult: null,

      // 微调配置默认值
      fineTuningConfig: {
        baseModel: 'qwen2.5-7b',
        method: 'LoRA',
        loraRank: 4,
        loraAlpha: 32,
        quantization: 'None',
        precision: 'FP16'
      },
      fineTuningResult: null,

      // 加载状态默认值
      trainingLoading: false,
      inferenceLoading: false,
      fineTuningLoading: false,

      // 历史记录
      history: [],
      compareList: [],

      // 用户偏好
      preferences: {
        autoSave: true,
        showOptimizationTips: true,
        defaultPrecision: 'FP16',
        theme: 'auto'
      },

      // Actions
      setActiveTab: (tab) => {
        set({ activeTab: tab });
        // 切换标签页时自动计算
        const state = get();
        switch (tab) {
          case 'training':
            state.calculateTrainingMemory();
            break;
          case 'inference':
            state.calculateInferenceMemory();
            break;
          case 'finetuning':
            state.calculateFineTuningMemory();
            break;
        }
      },

      setTrainingConfig: (config) => {
        set((state) => ({
          trainingConfig: { ...state.trainingConfig, ...config }
        }));
        // 防抖计算 - 300ms后执行
        clearTimeout(get()._trainingTimeout);
        const timeout = setTimeout(() => get().calculateTrainingMemory(), 300);
        set({ _trainingTimeout: timeout });
      },

      setInferenceConfig: (config) => {
        set((state) => ({
          inferenceConfig: { ...state.inferenceConfig, ...config }
        }));
        // 防抖计算 - 300ms后执行
        clearTimeout(get()._inferenceTimeout);
        const timeout = setTimeout(() => get().calculateInferenceMemory(), 300);
        set({ _inferenceTimeout: timeout });
      },

      setFineTuningConfig: (config) => {
        set((state) => ({
          fineTuningConfig: { ...state.fineTuningConfig, ...config }
        }));
        // 防抖计算 - 300ms后执行
        clearTimeout(get()._fineTuningTimeout);
        const timeout = setTimeout(() => get().calculateFineTuningMemory(), 300);
        set({ _fineTuningTimeout: timeout });
      },

      addToHistory: (type, config: unknown, result, modelName) => {
        const newItem: CalculationHistory = {
          id: `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: Date.now(),
          type,
          config,
          result,
          modelName,
          tags: []
        };
        
        set((state) => ({
          history: [newItem, ...state.history].slice(0, 50) // 最多保存50条记录
        }));
      },

      removeFromHistory: (id) => {
        set((state) => ({
          history: state.history.filter(item => item.id !== id)
        }));
      },

      clearHistory: () => {
        set({ history: [] });
      },

      addToCompare: (item) => {
        set((state) => {
          const exists = state.compareList.find(i => i.id === item.id);
          if (exists || state.compareList.length >= 4) return state; // 最多比较4个
          return {
            compareList: [...state.compareList, item]
          };
        });
      },

      removeFromCompare: (id) => {
        set((state) => ({
          compareList: state.compareList.filter(item => item.id !== id)
        }));
      },

      clearCompare: () => {
        set({ compareList: [] });
      },

      setPreferences: (prefs) => {
        set((state) => ({
          preferences: { ...state.preferences, ...prefs }
        }));
      },

      // 计算方法
      calculateTrainingMemory: async () => {
        const { trainingConfig, preferences } = get();
        set({ trainingLoading: true });
        
        try {
          // 模拟异步计算（实际可能涉及复杂计算）
          await new Promise(resolve => setTimeout(resolve, 100));
          const result = calculateTrainingMemory(trainingConfig);
          set({ trainingResult: result, trainingLoading: false });
          
          // 自动保存到历史记录
          if (preferences.autoSave) {
            get().addToHistory('training', trainingConfig, result);
          }
        } catch (error) {
          console.error('Training memory calculation error:', error);
          set({ trainingResult: null, trainingLoading: false });
        }
      },

      calculateInferenceMemory: async () => {
        const { inferenceConfig, preferences } = get();
        set({ inferenceLoading: true });
        
        try {
          await new Promise(resolve => setTimeout(resolve, 100));
          // 从模型数据库获取模型信息
          const { getModelById } = await import('@/lib/models-data');
          const modelInfo = getModelById(inferenceConfig.modelId);
          const result = calculateInferenceMemory(inferenceConfig, modelInfo);
          set({ inferenceResult: result, inferenceLoading: false });
          
          // 自动保存到历史记录
          if (preferences.autoSave) {
            get().addToHistory('inference', inferenceConfig, result, modelInfo?.name || inferenceConfig.modelId);
          }
        } catch (error) {
          console.error('Inference memory calculation error:', error);
          set({ inferenceResult: null, inferenceLoading: false });
        }
      },

      calculateFineTuningMemory: async () => {
        const { fineTuningConfig, preferences } = get();
        set({ fineTuningLoading: true });
        
        try {
          await new Promise(resolve => setTimeout(resolve, 100));
          // 从模型数据库获取模型信息
          const { getModelById } = await import('@/lib/models-data');
          const modelInfo = getModelById(fineTuningConfig.baseModel);
          const result = calculateFineTuningMemory(fineTuningConfig, modelInfo);
          set({ fineTuningResult: result, fineTuningLoading: false });
          
          // 自动保存到历史记录
          if (preferences.autoSave) {
            get().addToHistory('finetuning', fineTuningConfig, result, modelInfo?.name || fineTuningConfig.baseModel);
          }
        } catch (error) {
          console.error('Fine-tuning memory calculation error:', error);
          set({ fineTuningResult: null, fineTuningLoading: false });
        }
      },

      getCurrentResult: () => {
        const { activeTab, trainingResult, inferenceResult, fineTuningResult } = get();
        switch (activeTab) {
          case 'training':
            return trainingResult;
          case 'inference':
            return inferenceResult;
          case 'finetuning':
            return fineTuningResult;
          default:
            return null;
        }
      }
    }),
    {
      name: 'ai-memory-calculator-store',
      storage: createJSONStorage(() => localStorage),
      // 只持久化配置和偏好，不持久化计算结果
      partialize: (state) => ({
        trainingConfig: state.trainingConfig,
        inferenceConfig: state.inferenceConfig,
        fineTuningConfig: state.fineTuningConfig,
        preferences: state.preferences,
        history: state.history.slice(0, 10), // 只保存最近10条历史记录
      }),
    }
  )
); 