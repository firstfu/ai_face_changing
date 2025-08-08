/**
 * Prisma 資料庫客戶端 (Prisma Database Client)
 * 
 * 管理應用程式的資料庫連線與實例：
 * - 單例模式：確保整個應用只有一個 Prisma 實例
 * - 開發環境優化：避免熱重載時重複建立連線
 * - 生產環境配置：適合 serverless 部署的連線管理
 * - 全域實例管理：防止記憶體洩漏與連線池耗盡
 * 
 * 設計模式：
 * - 單例模式 (Singleton Pattern)
 * - 全域實例註冊避免重複建立
 * - 環境區分的實例管理策略
 * 
 * 開發 vs 生產環境：
 * - 開發環境：將實例存於 global 物件避免 HMR 重建
 * - 生產環境：每次都建立新實例確保資源管理
 * - TypeScript 型別安全的全域物件擴充
 * 
 * 資料庫功能：
 * - 用戶認證與會話管理
 * - 訂閱方案與付款記錄
 * - 使用量追蹤與統計
 * - 換臉任務歷史記錄
 * 
 * 使用技術：
 * - Prisma ORM
 * - TypeScript 嚴格型別
 * - 全域物件型別擴充
 * - 環境變數條件判斷
 */

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma