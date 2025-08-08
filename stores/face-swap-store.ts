/**
 * 換臉功能狀態管理 (Face Swap State Management)
 * 
 * 使用 Zustand 管理換臉應用的全域狀態：
 * - 圖片管理：來源與目標圖片的上傳與預覽
 * - 處理狀態：載入、進度、錯誤的即時追蹤
 * - 結果管理：當前結果與歷史記錄的維護
 * - 用戶資料：使用量與訂閱狀態的同步
 * - 持久化儲存：關鍵資料的本地儲存
 * 
 * 核心功能：
 * - 圖片上傳與預覽生成 (URL.createObjectURL)
 * - API 請求的完整生命周期管理
 * - 輪詢機制追蹤 AI 處理進度
 * - 錯誤處理與用戶友善訊息
 * - 使用量限制檢查與提醒
 * 
 * 狀態結構：
 * - 處理狀態：isLoading, progress, error
 * - 圖片資料：sourceImage, targetImage, previews
 * - 結果資料：currentSwap, swapHistory
 * - 用戶資料：userUsage, userSubscription
 * 
 * 非同步操作：
 * - startSwap: 啟動換臉處理
 * - checkSwapStatus: 輪詢處理狀態 (最多60次)
 * - fetchUserData: 獲取用戶資料
 * 
 * 持久化策略：
 * - 儲存歷史記錄與用戶資料
 * - 排除暫時性狀態 (isLoading, progress)
 * - 使用 localStorage 本地儲存
 * 
 * 使用技術：
 * - Zustand 狀態管理
 * - TypeScript 完整型別
 * - Web APIs (URL, FormData, fetch)
 * - 輪詢機制與超時處理
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SwapResult, SwapRequest } from '@/types';

interface UserUsage {
  current: number;
  limit: number;
  plan: string;
  canUse: boolean;
}

interface UserSubscription {
  id: string;
  plan: 'FREE' | 'CREATOR' | 'PRO' | 'ENTERPRISE';
  status: 'ACTIVE' | 'CANCELED' | 'PAST_DUE' | 'INCOMPLETE';
  currentPeriodStart: string;
  currentPeriodEnd: string;
}

interface FaceSwapStore {
  // 狀態
  currentSwap: SwapResult | null;
  swapHistory: SwapResult[];
  isLoading: boolean;
  progress: number;
  error: string | null;

  // 圖片相關
  sourceImage: File | null;
  targetImage: File | null;
  sourceImagePreview: string | null;
  targetImagePreview: string | null;

  // 用戶相關
  userUsage: UserUsage | null;
  userSubscription: UserSubscription | null;

  // Actions
  setSourceImage: (file: File | null) => void;
  setTargetImage: (file: File | null) => void;
  startSwap: (request: Omit<SwapRequest, 'sourceImage' | 'targetImage'>) => Promise<void>;
  checkSwapStatus: (id: string) => Promise<void>;
  clearCurrentSwap: () => void;
  setError: (error: string | null) => void;
  setProgress: (progress: number) => void;
  
  // 用戶狀態管理
  fetchUserData: () => Promise<void>;
  updateUsage: (usage: UserUsage) => void;
  updateSubscription: (subscription: UserSubscription) => void;
  clearUserData: () => void;
}

export const useFaceSwapStore = create<FaceSwapStore>()(
  persist(
    (set, get) => ({
      // 初始狀態
      currentSwap: null,
      swapHistory: [],
      isLoading: false,
      progress: 0,
      error: null,
      sourceImage: null,
      targetImage: null,
      sourceImagePreview: null,
      targetImagePreview: null,
      
      // 用戶狀態
      userUsage: null,
      userSubscription: null,

  // Actions
  setSourceImage: (file) => {
    const preview = file ? URL.createObjectURL(file) : null;
    set({ 
      sourceImage: file, 
      sourceImagePreview: preview,
      error: null 
    });
  },

  setTargetImage: (file) => {
    const preview = file ? URL.createObjectURL(file) : null;
    set({ 
      targetImage: file, 
      targetImagePreview: preview,
      error: null 
    });
  },

  startSwap: async (options) => {
    const { sourceImage, targetImage } = get();
    
    if (!sourceImage || !targetImage) {
      set({ error: '請選擇來源圖片和目標圖片' });
      return;
    }

    set({ isLoading: true, error: null, progress: 10 });

    try {
      const formData = new FormData();
      formData.append('sourceImage', sourceImage);
      formData.append('targetImage', targetImage);
      formData.append('quality', options.quality);

      const response = await fetch('/api/swap/image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('已達到本月使用上限，請升級方案或等待下月重置');
        } else if (response.status === 401) {
          throw new Error('請先登入才能使用此服務');
        } else if (response.status === 403) {
          throw new Error('訂閱狀態異常，請檢查您的訂閱方案');
        }
        throw new Error(data.error || '換臉請求失敗');
      }
      
      if (!data.success) {
        throw new Error(data.error || '換臉失敗');
      }

      // 更新使用量
      if (data.usage) {
        set((state) => ({
          userUsage: state.userUsage ? {
            ...state.userUsage,
            current: data.usage.current,
          } : null
        }));
      }

      // 建立新的換臉記錄
      const newSwap: SwapResult = {
        id: data.predictionId,
        status: 'processing',
        sourceImageUrl: get().sourceImagePreview!,
        targetImageUrl: get().targetImagePreview!,
        model: data.model,
        quality: options.quality,
        createdAt: new Date().toISOString(),
      };

      set({ 
        currentSwap: newSwap,
        progress: 30 
      });

      // 開始輪詢狀態
      get().checkSwapStatus(data.predictionId);

    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : '發生未知錯誤',
        isLoading: false,
        progress: 0 
      });
    }
  },

  checkSwapStatus: async (id) => {
    const maxAttempts = 60; // 最多檢查 60 次 (約 5 分鐘)
    let attempts = 0;

    const poll = async () => {
      try {
        const response = await fetch(`/api/status/${id}`);
        
        if (!response.ok) {
          throw new Error('無法獲取處理狀態');
        }

        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || '狀態檢查失敗');
        }

        const { prediction } = data;
        const currentSwap = get().currentSwap;

        if (!currentSwap) return;

        // 更新進度
        const progressMap = {
          starting: 40,
          processing: 70,
          succeeded: 100,
          failed: 0,
          canceled: 0,
        };

        set({ 
          progress: progressMap[prediction.status as keyof typeof progressMap] || 50 
        });

        if (prediction.status === 'succeeded') {
          const completedSwap: SwapResult = {
            ...currentSwap,
            status: 'completed',
            resultImageUrl: prediction.output,
            completedAt: prediction.completed_at,
          };

          set(state => ({
            currentSwap: completedSwap,
            swapHistory: [completedSwap, ...state.swapHistory],
            isLoading: false,
            progress: 100,
          }));

        } else if (prediction.status === 'failed') {
          const failedSwap: SwapResult = {
            ...currentSwap,
            status: 'failed',
            error: prediction.error || '處理失敗',
            completedAt: prediction.completed_at,
          };

          set(state => ({
            currentSwap: failedSwap,
            swapHistory: [failedSwap, ...state.swapHistory],
            isLoading: false,
            progress: 0,
            error: prediction.error || '處理失敗',
          }));

        } else if (prediction.status === 'processing' || prediction.status === 'starting') {
          attempts++;
          if (attempts < maxAttempts) {
            setTimeout(poll, 5000); // 每 5 秒檢查一次
          } else {
            throw new Error('處理超時，請稍後再試');
          }
        }

      } catch (error) {
        set({ 
          error: error instanceof Error ? error.message : '狀態檢查失敗',
          isLoading: false,
          progress: 0 
        });
      }
    };

    // 開始輪詢
    setTimeout(poll, 2000); // 2 秒後開始第一次檢查
  },

  clearCurrentSwap: () => {
    set({
      currentSwap: null,
      isLoading: false,
      progress: 0,
      error: null,
    });
  },

  setError: (error) => {
    set({ error, isLoading: false });
  },

  setProgress: (progress) => {
    set({ progress });
  },

  // 用戶狀態管理
  fetchUserData: async () => {
    try {
      const [usageResponse, subscriptionResponse] = await Promise.all([
        fetch('/api/usage'),
        fetch('/api/subscription')
      ]);

      if (usageResponse.ok) {
        const usageData = await usageResponse.json();
        if (usageData.success) {
          set({ userUsage: usageData.usage });
        }
      }

      if (subscriptionResponse.ok) {
        const subscriptionData = await subscriptionResponse.json();
        if (subscriptionData.success) {
          set({ userSubscription: subscriptionData.subscription });
        }
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  },

  updateUsage: (usage) => {
    set({ userUsage: usage });
  },

  updateSubscription: (subscription) => {
    set({ userSubscription: subscription });
  },

  clearUserData: () => {
    set({
      userUsage: null,
      userSubscription: null,
    });
  },
    }),
    {
      name: 'face-swap-store',
      partialize: (state) => ({
        swapHistory: state.swapHistory,
        userUsage: state.userUsage,
        userSubscription: state.userSubscription,
      }),
    }
  )
);