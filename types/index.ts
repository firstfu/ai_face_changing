/**
 * 型別定義入口檔 (Types Entry Point)
 * 
 * 統一匯出所有型別定義，提供：
 * - 中央化的型別匯出管理
 * - 簡化的匯入路徑
 * - 型別定義的模組化組織
 * - 未來擴充的彈性架構
 * 
 * 包含的型別模組：
 * - face-swap: 換臉功能相關型別
 * - 未來可擴充更多功能模組
 * 
 * 使用方式：
 * import { SwapRequest, SwapResult } from '@/types';
 * 
 * 使用技術：
 * - TypeScript 模組重新匯出
 * - ES6 模組語法
 */

export * from './face-swap';