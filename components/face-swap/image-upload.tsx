/**
 * 圖片上傳組件 (Image Upload Component)
 * 
 * 提供完整的圖片上傳功能與用戶體驗：
 * - 拖放上傳：支援拖拽檔案到指定區域
 * - 點擊上傳：傳統檔案選擇器整合
 * - 即時預覽：上傳後立即顯示圖片預覽
 * - 檔案驗證：格式、大小、類型的全面驗證
 * - 錯誤處理：友善的錯誤訊息與視覺回饋
 * 
 * 交互特色：
 * - 拖拽時的視覺狀態變化 (hover effects)
 * - 漸層色彩與動畫效果
 * - emoji 表情符號增加親和力
 * - 響應式設計與無障礙支持
 * - 可重複使用的通用組件設計
 * 
 * 技術特性：
 * - TypeScript 完整型別定義
 * - useCallback 性能優化
 * - URL.createObjectURL 預覽處理
 * - 檔案大小與格式驗證
 * - 支援 JPEG、PNG、WebP 格式
 * 
 * 使用技術：
 * - React 19 Hooks
 * - File API 與拖放 API
 * - Tailwind CSS 漸層與動畫
 * - Lucide React 圖標
 */

'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Sparkles, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface ImageUploadProps {
  label: string;
  onImageChange: (file: File | null) => void;
  maxSize?: number; // MB
  acceptedTypes?: string[];
  preview?: string | null;
}

export function ImageUpload({
  label,
  onImageChange,
  maxSize = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  preview
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `請上傳支援的高清圖片格式：${acceptedTypes.map(type => 
        type.split('/')[1].toUpperCase()
      ).join(', ')} 📸`;
    }

    if (file.size > maxSize * 1024 * 1024) {
      return `圖片大小不能超過 ${maxSize}MB，請壓縮後重試 📉`;
    }

    return null;
  }, [acceptedTypes, maxSize]);

  const handleFileSelect = useCallback((file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    onImageChange(file);
  }, [validateFile, onImageChange]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleRemove = useCallback(() => {
    onImageChange(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onImageChange]);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Label className="text-base font-semibold">{label}</Label>
        {!preview && (
          <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700">
            必選
          </span>
        )}
      </div>
      
      <Card
        className={`relative border-2 transition-all duration-300 overflow-hidden ${
          isDragging
            ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 scale-105 shadow-xl'
            : preview
            ? 'border-solid border-purple-300 shadow-lg'
            : 'border-dashed border-purple-200 hover:border-purple-400 hover:shadow-md hover:bg-gradient-to-br hover:from-purple-50/50 hover:to-pink-50/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
        />

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={!preview ? handleClick : undefined}
          className={`relative aspect-square min-h-[200px] flex items-center justify-center p-6 ${
            !preview ? 'cursor-pointer' : ''
          }`}
        >
          {preview ? (
            <>
              <img
                src={preview}
                alt="預覽圖片"
                className="w-full h-full object-cover rounded-lg"
              />
              <Button
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center transition-all">
                  {isDragging ? (
                    <Upload className="h-10 w-10 text-purple-600 animate-bounce" />
                  ) : (
                    <Camera className="h-10 w-10 text-purple-600" />
                  )}
                </div>
                {!isDragging && (
                  <div className="absolute -bottom-1 left-0 right-0 mx-auto w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <Sparkles className="h-3 w-3 text-white animate-pulse" />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <p className="text-base font-semibold text-foreground">
                  {isDragging ? (
                    <span className="text-purple-600">放開即可上傳 🎆</span>
                  ) : (
                    <span>點擊或拖拽上傳圖片</span>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">
                  支援 <span className="font-medium">JPG, PNG, WebP</span> 高清格式
                </p>
                <p className="text-xs text-muted-foreground">
                  最大 {maxSize}MB · 建議使用正面清晰照片
                </p>
              </div>

              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300 hover:border-purple-500 hover:shadow-md transition-all"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                選擇圖片檔案
              </Button>
            </div>
          )}
        </div>
      </Card>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
          <X className="h-4 w-4 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
}