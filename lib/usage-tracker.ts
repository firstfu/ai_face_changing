/**
 * 使用量追蹤服務 (Usage Tracking Service)
 * 
 * 管理用戶服務使用量的核心追蹤系統：
 * - 使用量記錄：按月追蹤用戶服務使用次數
 * - 限制檢查：根據訂閱方案驗證使用權限
 * - 統計分析：提供月度與年度使用統計資料
 * - 方案管理：整合訂閱方案的使用限制
 * - 數據完整性：使用 Prisma ORM 確保資料一致性
 * 
 * 核心功能：
 * - trackUsage: 記錄服務使用 (支援批量遞增)
 * - getCurrentUsage: 查詢當月使用量
 * - checkUsageLimit: 驗證用戶使用權限
 * - getUserUsageStats: 生成完整使用統計
 * 
 * 訂閱方案限制：
 * - FREE: 3次/月
 * - CREATOR: 50次/月
 * - PRO: 250次/月
 * - ENTERPRISE: 2000次/月
 * 
 * 資料結構：
 * - 複合主鍵：userId + type + month + year
 * - 原子操作：upsert 確保並發安全
 * - 時間索引：按年月組織資料
 * 
 * 錯誤處理：
 * - 資料庫連線錯誤
 * - 方案不存在的預設處理
 * - 友善的錯誤回應
 * 
 * 使用技術：
 * - Prisma ORM
 * - TypeScript 嚴格型別
 * - 資料庫 upsert 操作
 * - 日期時間處理
 */

import { prisma } from '@/lib/prisma';

export class UsageTracker {
  static async trackUsage(userId: string, type: string = 'face_swap', count: number = 1) {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    try {
      // 使用 upsert 來處理存在和不存在的情況
      await prisma.usageRecord.upsert({
        where: {
          userId_type_month_year: {
            userId,
            type,
            month,
            year,
          }
        },
        update: {
          count: {
            increment: count
          }
        },
        create: {
          userId,
          type,
          month,
          year,
          count,
        }
      });

      return true;
    } catch (error) {
      console.error('Usage tracking error:', error);
      return false;
    }
  }

  static async getCurrentUsage(userId: string, type: string = 'face_swap'): Promise<number> {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    try {
      const record = await prisma.usageRecord.findUnique({
        where: {
          userId_type_month_year: {
            userId,
            type,
            month,
            year,
          }
        }
      });

      return record?.count || 0;
    } catch (error) {
      console.error('Get usage error:', error);
      return 0;
    }
  }

  static async checkUsageLimit(userId: string, type: string = 'face_swap'): Promise<{
    canUse: boolean;
    currentUsage: number;
    limit: number;
    plan: string;
  }> {
    try {
      // 獲取用戶訂閱信息
      const subscription = await prisma.subscription.findUnique({
        where: { userId }
      });

      if (!subscription) {
        return {
          canUse: false,
          currentUsage: 0,
          limit: 0,
          plan: 'NONE'
        };
      }

      // 定義方案限制
      const planLimits = {
        FREE: 3,
        CREATOR: 50,
        PRO: 250,
        ENTERPRISE: 2000
      };

      const limit = planLimits[subscription.plan] || 0;
      const currentUsage = await this.getCurrentUsage(userId, type);

      return {
        canUse: currentUsage < limit && subscription.status === 'ACTIVE',
        currentUsage,
        limit,
        plan: subscription.plan
      };
    } catch (error) {
      console.error('Check usage limit error:', error);
      return {
        canUse: false,
        currentUsage: 0,
        limit: 0,
        plan: 'ERROR'
      };
    }
  }

  static async getUserUsageStats(userId: string, type: string = 'face_swap') {
    try {
      const now = new Date();
      const currentYear = now.getFullYear();

      // 獲取當年度所有月份的使用記錄
      const records = await prisma.usageRecord.findMany({
        where: {
          userId,
          type,
          year: currentYear
        },
        orderBy: {
          month: 'asc'
        }
      });

      // 獲取用戶訂閱信息
      const subscription = await prisma.subscription.findUnique({
        where: { userId }
      });

      const planLimits = {
        FREE: 3,
        CREATOR: 50,
        PRO: 250,
        ENTERPRISE: 2000
      };

      const limit = subscription ? planLimits[subscription.plan] || 0 : 0;

      // 填充完整的12個月數據
      const monthlyData = Array.from({ length: 12 }, (_, index) => {
        const month = index + 1;
        const record = records.find(r => r.month === month);
        return {
          month,
          count: record?.count || 0,
          limit
        };
      });

      const totalUsage = records.reduce((sum, record) => sum + record.count, 0);
      const currentMonthUsage = await this.getCurrentUsage(userId, type);

      return {
        monthlyData,
        totalUsage,
        currentMonthUsage,
        limit,
        plan: subscription?.plan || 'FREE',
        canUse: currentMonthUsage < limit && (subscription?.status === 'ACTIVE' || subscription?.plan === 'FREE')
      };
    } catch (error) {
      console.error('Get usage stats error:', error);
      return null;
    }
  }
}

export const usageTracker = new UsageTracker();