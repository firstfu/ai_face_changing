/**
 * 實用工具函數庫 (Utility Functions Library)
 * 
 * 提供通用的輔助函數，主要用於樣式處理：
 * - cn: 類別名稱合併函數，整合 clsx 與 tailwind-merge
 * - 支援條件式類別名稱組合
 * - 自動解決 Tailwind CSS 類別衝突
 * - 型別安全的參數處理
 * 
 * 主要用途：
 * - shadcn/ui 組件的樣式合併
 * - 條件式 CSS 類別應用
 * - Tailwind 類別優先級處理
 * - 組件變體樣式管理
 * 
 * 使用範例：
 * cn("bg-red-500", "bg-blue-500") // "bg-blue-500" (後者優先)
 * cn("text-lg", { "text-xl": isLarge }) // 條件式樣式
 * cn(["flex", "items-center"], "justify-between") // 陣列與字串混用
 * 
 * 技術整合：
 * - clsx: 條件式類別名稱組合
 * - tailwind-merge: 智能 Tailwind 類別合併
 * - TypeScript 完整型別支援
 * 
 * 使用技術：
 * - clsx 條件式類別處理
 * - tailwind-merge 衝突解析
 * - TypeScript ClassValue 型別
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
