'use client';

import { useState } from 'react';
import { Download, Share2, RotateCcw, Clock, CheckCircle, XCircle } from 'lucide-react';
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
        return '處理完成';
      case 'failed':
        return '處理失敗';
      case 'processing':
        return '處理中';
      case 'pending':
        return '等待處理';
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
    <Card className="p-6 space-y-6">
      {/* 狀態標題 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <div>
            <h3 className="font-semibold">處理結果</h3>
            <p className="text-sm text-muted-foreground">
              ID: {currentSwap.id}
            </p>
          </div>
        </div>
        <Badge variant={getStatusVariant()}>
          {getStatusText()}
        </Badge>
      </div>

      {/* 圖片對比展示 */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 來源圖片 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">來源圖片</label>
            <div className="aspect-square relative rounded-lg overflow-hidden bg-muted">
              <img
                src={currentSwap.sourceImageUrl}
                alt="來源圖片"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 目標圖片 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">目標圖片</label>
            <div className="aspect-square relative rounded-lg overflow-hidden bg-muted">
              <img
                src={currentSwap.targetImageUrl}
                alt="目標圖片"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 結果圖片 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">換臉結果</label>
            <div className="aspect-square relative rounded-lg overflow-hidden bg-muted">
              {currentSwap.status === 'completed' && currentSwap.resultImageUrl ? (
                <img
                  src={currentSwap.resultImageUrl}
                  alt="換臉結果"
                  className="w-full h-full object-cover"
                />
              ) : currentSwap.status === 'failed' ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <XCircle className="h-12 w-12 text-red-500 mx-auto" />
                    <p className="text-sm text-muted-foreground">處理失敗</p>
                    {currentSwap.error && (
                      <p className="text-xs text-red-500">{currentSwap.error}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                    <p className="text-sm text-muted-foreground">處理中...</p>
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
        <div className="flex gap-3">
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            {isDownloading ? '下載中...' : '下載結果'}
          </Button>
          
          <Button
            onClick={handleShare}
            variant="outline"
          >
            <Share2 className="h-4 w-4 mr-2" />
            分享
          </Button>
          
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            重新開始
          </Button>
        </div>
      )}
    </Card>
  );
}