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