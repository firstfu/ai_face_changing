'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
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
      return `請上傳支援的圖片格式：${acceptedTypes.map(type => 
        type.split('/')[1].toUpperCase()
      ).join(', ')}`;
    }

    if (file.size > maxSize * 1024 * 1024) {
      return `圖片大小不能超過 ${maxSize}MB`;
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
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      
      <Card
        className={`relative border-2 border-dashed transition-colors duration-200 ${
          isDragging
            ? 'border-primary bg-primary/5'
            : preview
            ? 'border-solid border-border'
            : 'border-muted-foreground/25 hover:border-muted-foreground/50'
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
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                {isDragging ? (
                  <Upload className="h-8 w-8 text-primary" />
                ) : (
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  {isDragging ? '放開以上傳圖片' : '點擊上傳或拖放圖片'}
                </p>
                <p className="text-xs text-muted-foreground">
                  支援 JPG, PNG, WebP 格式，最大 {maxSize}MB
                </p>
              </div>

              <Button type="button" variant="outline" size="sm">
                選擇檔案
              </Button>
            </div>
          )}
        </div>
      </Card>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}