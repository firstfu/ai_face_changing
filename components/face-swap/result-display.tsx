/**
 * 結果展示組件 (Result Display Component)
 * 
 * 換臉結果的完整展示與管理界面：
 * - 狀態展示：成功/失敗/處理中的視覺化狀態
 * - 圖片對比：原始、目標、結果的三欄式對比展示
 * - 下載功能：高清圖片下載與檔名自動生成
 * - 分享功能：原生分享 API 與剪貼簿整合
 * - 詳細資訊：模型資訊、處理時間、品質設定
 * 
 * 用戶體驗設計：
 * - 魔法主題的視覺設計 (✨ Sparkles, 🏆 Trophy)
 * - 漸層背景與陰影效果
 * - 處理中的動態載入動畫
 * - 成功狀態的慶祝效果
 * - 失敗狀態的錯誤資訊展示
 * 
 * 技術整合：
 * - Zustand 狀態管理
 * - Web Share API 支援
 * - Clipboard API 整合
 * - File 下載處理
 * - 響應式圖片展示
 * 
 * 使用技術：
 * - React 19 Client Component
 * - Web APIs (Share, Clipboard, URL)
 * - Tailwind CSS 動畫與漸層
 * - 條件渲染與狀態管理
 */

'use client';

import { useState } from 'react';
import { Download, Share2, RotateCcw, Clock, CheckCircle, XCircle, Sparkles, Trophy, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFaceSwapStore } from '@/stores/face-swap-store';

export function ResultDisplay() {
  const { currentSwap } = useFaceSwapStore();
  const [isDownloading, setIsDownloading] = useState(false);

  if (!currentSwap) {
    return null;
  }

  const getStatusIcon = () => {
    switch (currentSwap.status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'processing':
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (currentSwap.status) {
      case 'completed':
        return '✨ 完美完成';
      case 'failed':
        return '❌ 處理失敗';
      case 'processing':
        return '🎨 正在施展魔法';
      case 'pending':
        return '⏳ 準備中';
      default:
        return '未知狀態';
    }
  };

  const getStatusVariant = () => {
    switch (currentSwap.status) {
      case 'completed':
        return 'default' as const;
      case 'failed':
        return 'destructive' as const;
      case 'processing':
      case 'pending':
        return 'secondary' as const;
      default:
        return 'outline' as const;
    }
  };

  const handleDownload = async () => {
    if (!currentSwap.resultImageUrl) return;

    setIsDownloading(true);
    try {
      const response = await fetch(currentSwap.resultImageUrl);
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `face-swap-result-${currentSwap.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('下載失敗:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!currentSwap.resultImageUrl) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'AI 換臉結果',
          text: '看看我的 AI 換臉結果！',
          url: currentSwap.resultImageUrl,
        });
      } else {
        // 複製到剪貼簿
        await navigator.clipboard.writeText(currentSwap.resultImageUrl);
        // 這裡可以顯示一個 toast 通知
      }
    } catch (error) {
      console.error('分享失敗:', error);
    }
  };

  return (
    <Card className="p-8 space-y-6 bg-gradient-to-br from-white to-purple-50/30 border-purple-200/50">
      {/* 狀態標題 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {currentSwap.status === 'completed' ? (
            <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
              <Trophy className="h-6 w-6 text-white" />
            </div>
          ) : (
            getStatusIcon()
          )}
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              換臉結果
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              任務 {currentSwap.id.slice(0, 8)}
            </p>
          </div>
        </div>
        <Badge 
          variant={getStatusVariant()} 
          className={currentSwap.status === 'completed' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0' : ''}
        >
          {getStatusText()}
        </Badge>
      </div>

      {/* 圖片對比展示 */}
      <div className="space-y-4">
        {currentSwap.status === 'completed' && (
          <div className="text-center mb-4">
            <Badge className="px-4 py-1.5 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-300">
              <Star className="h-3 w-3 mr-1" />
              換臉成功！看看您的新面孔
            </Badge>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 來源圖片 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">1</div>
                原始臉部
              </label>
            </div>
            <div className="aspect-square relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src={currentSwap.sourceImageUrl}
                alt="來源圖片"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 backdrop-blur rounded text-white text-xs">
                被替換的臉
              </div>
            </div>
          </div>

          {/* 目標圖片 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">2</div>
                目標臉部
              </label>
            </div>
            <div className="aspect-square relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src={currentSwap.targetImageUrl}
                alt="目標圖片"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 backdrop-blur rounded text-white text-xs">
                新的臉部來源
              </div>
            </div>
          </div>

          {/* 結果圖片 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">✓</div>
                最終成果
              </label>
              {currentSwap.status === 'completed' && (
                <Badge className="bg-green-100 text-green-700 border-green-300">
                  <Sparkles className="h-3 w-3 mr-1" />
                  完成
                </Badge>
              )}
            </div>
            <div className="aspect-square relative rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 ring-4 ring-purple-500 ring-offset-2">
              {currentSwap.status === 'completed' && currentSwap.resultImageUrl ? (
                <img
                  src={currentSwap.resultImageUrl}
                  alt="換臉結果"
                  className="w-full h-full object-cover"
                />
              ) : currentSwap.status === 'failed' ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
                  <div className="text-center space-y-3 p-6">
                    <div className="p-4 rounded-full bg-red-100 w-fit mx-auto">
                      <XCircle className="h-12 w-12 text-red-500" />
                    </div>
                    <p className="text-base font-semibold text-red-700">處理失敗</p>
                    {currentSwap.error && (
                      <p className="text-sm text-red-600 bg-red-100 rounded-lg p-2">{currentSwap.error}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
                  <div className="text-center space-y-3">
                    <div className="relative">
                      <div className="animate-spin h-12 w-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto"></div>
                      <Sparkles className="h-6 w-6 text-purple-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                    </div>
                    <p className="text-sm font-medium text-purple-700">正在施展魔法...</p>
                    <div className="flex justify-center gap-1">
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 模型資訊 */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">使用模型：</span>
            <span className="font-medium ml-1">{currentSwap.model}</span>
          </div>
          <div>
            <span className="text-muted-foreground">品質設定：</span>
            <span className="font-medium ml-1">
              {currentSwap.quality === 'high' ? '高品質' : '標準品質'}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">建立時間：</span>
            <span className="font-medium ml-1">
              {new Date(currentSwap.createdAt).toLocaleString('zh-TW')}
            </span>
          </div>
          {currentSwap.completedAt && (
            <div>
              <span className="text-muted-foreground">完成時間：</span>
              <span className="font-medium ml-1">
                {new Date(currentSwap.completedAt).toLocaleString('zh-TW')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 操作按鈕 */}
      {currentSwap.status === 'completed' && currentSwap.resultImageUrl && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800">大功告成！</span>
            </div>
            <p className="text-sm text-green-700">
              您的換臉已經完成，現在可以下載或分享給朋友了！
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1 h-12 text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all"
            >
              <Download className="h-5 w-5 mr-2" />
              {isDownloading ? '正在下載...' : '下載高清圖片'}
            </Button>
            
            <Button
              onClick={handleShare}
              variant="outline"
              className="h-12 px-6 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50"
            >
              <Share2 className="h-5 w-5 mr-2" />
              分享
            </Button>
            
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="h-12 px-6 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100"
            >
              <ArrowRight className="h-5 w-5 mr-2 rotate-180" />
              再試一次
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}