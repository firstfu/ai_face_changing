/**
 * 用戶儀表板頁面 (User Dashboard Page)
 * 
 * 登入用戶的主控台，提供完整的帳戶管理與服務使用介面：
 * - 用戶歡迎區塊與基本資訊顯示
 * - 訂閱方案狀態與使用量統計
 * - 月使用量進度條與限制提醒
 * - 整合換臉工具與結果展示
 * - 帳戶創建日期與會員資訊
 * - 升級方案建議與快速操作按鈕
 * 
 * 功能特色：
 * - 即時使用量監控與視覺化
 * - 智能使用量警告 (80% 以上顯示提醒)
 * - 方案差異化的 UI 顯示
 * - 企業版特殊標識 (Crown 圖標)
 * - 響應式設計適配各種螢幕
 * 
 * 使用技術：
 * - Next.js 15 Server Components
 * - Prisma ORM 資料庫查詢
 * - NextAuth.js 身份驗證
 * - 動態方案限制管理
 * - Progress 組件視覺化
 */

import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Video, 
  Image, 
  Calendar, 
  TrendingUp, 
  Users, 
  Zap,
  Crown,
  Settings,
  Download
} from 'lucide-react';
import Link from 'next/link';
import { FaceSwapForm } from '@/components/face-swap/face-swap-form';
import { ResultDisplay } from '@/components/face-swap/result-display';

async function getUserData(userId: string) {
  const [user, subscription, currentUsage] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      }
    }),
    prisma.subscription.findUnique({
      where: { userId },
    }),
    prisma.usageRecord.findUnique({
      where: {
        userId_type_month_year: {
          userId,
          type: 'face_swap',
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
        }
      }
    })
  ]);

  return { user, subscription, currentUsage: currentUsage?.count || 0 };
}

const planLimits = {
  FREE: { limit: 3, name: '免費版' },
  CREATOR: { limit: 50, name: '創作者版' },
  PRO: { limit: 250, name: '專業版' },
  ENTERPRISE: { limit: 2000, name: '企業版' }
};

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/auth/signin');
  }

  const { user, subscription, currentUsage } = await getUserData(session.user.id as string);

  if (!user || !subscription) {
    redirect('/auth/signin');
  }

  const planInfo = planLimits[subscription.plan];
  const usagePercentage = (currentUsage / planInfo.limit) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                歡迎回來，{user.name}！
              </h1>
              <p className="text-muted-foreground">
                管理您的 AI 換臉專案和訂閱方案
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge 
                className={`px-3 py-1 ${
                  subscription.plan === 'FREE' ? 'bg-gray-100 text-gray-700' :
                  subscription.plan === 'CREATOR' ? 'bg-orange-100 text-orange-700' :
                  subscription.plan === 'PRO' ? 'bg-blue-100 text-blue-700' :
                  'bg-purple-100 text-purple-700'
                }`}
              >
                {subscription.plan === 'ENTERPRISE' && <Crown className="w-3 h-3 mr-1" />}
                {planInfo.name}
              </Badge>
              <Link href="/subscription">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-1" />
                  管理訂閱
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Usage Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-blue-100">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <Badge variant="outline" className="text-xs">
                本月
              </Badge>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800 mb-1">
                {currentUsage}
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                使用次數 / {planInfo.limit}
              </p>
              <Progress value={usagePercentage} className="h-2" />
            </div>
          </Card>

          {/* Plan Status */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-green-100">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
              <Badge 
                className={`text-xs ${
                  subscription.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                  'bg-red-100 text-red-700'
                }`}
              >
                {subscription.status === 'ACTIVE' ? '有效' : '已暫停'}
              </Badge>
            </div>
            <div>
              <div className="text-lg font-bold text-slate-800 mb-1">
                {planInfo.name}
              </div>
              <p className="text-sm text-muted-foreground">
                到期：{new Date(subscription.currentPeriodEnd).toLocaleDateString('zh-TW')}
              </p>
            </div>
          </Card>

          {/* Account Age */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-purple-100">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-slate-800 mb-1">
                會員
              </div>
              <p className="text-sm text-muted-foreground">
                註冊於：{new Date(user.createdAt).toLocaleDateString('zh-TW')}
              </p>
            </div>
          </Card>

          {/* Quick Action */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-orange-100">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-slate-800 mb-1">
                效率提升
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                AI 創作工具
              </p>
              <Button size="sm" className="w-full">
                <Video className="w-4 h-4 mr-1" />
                開始創作
              </Button>
            </div>
          </Card>
        </div>

        {/* Usage Warning */}
        {usagePercentage > 80 && (
          <Card className="p-4 mb-8 border-orange-200 bg-orange-50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-orange-800">
                  使用量即將達到上限
                </p>
                <p className="text-xs text-orange-700">
                  您本月已使用 {currentUsage}/{planInfo.limit} 次，建議考慮升級方案
                </p>
              </div>
              <Link href="/subscription">
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  升級方案
                </Button>
              </Link>
            </div>
          </Card>
        )}

        {/* Main Content */}
        <div className="space-y-8">
          {/* Face Swap Tool */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-blue-100">
                <Image className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  AI 換臉工具
                </h2>
                <p className="text-muted-foreground">
                  上傳您的圖片，開始專業創作
                </p>
              </div>
              <div className="ml-auto">
                <Badge variant="outline" className="text-xs">
                  剩餘 {planInfo.limit - currentUsage} 次
                </Badge>
              </div>
            </div>

            <FaceSwapForm />
          </Card>

          {/* Results */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-green-100">
                <Download className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  處理結果
                </h2>
                <p className="text-muted-foreground">
                  查看和下載您的創作成果
                </p>
              </div>
            </div>

            <ResultDisplay />
          </Card>
        </div>
      </div>
    </div>
  );
}