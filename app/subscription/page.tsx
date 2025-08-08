'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Crown, 
  Zap, 
  CheckCircle, 
  Star, 
  Calendar,
  CreditCard,
  AlertTriangle,
  TrendingUp,
  Gift
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

interface SubscriptionData {
  id: string;
  plan: 'FREE' | 'CREATOR' | 'PRO' | 'ENTERPRISE';
  status: 'ACTIVE' | 'CANCELED' | 'PAST_DUE' | 'INCOMPLETE';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

interface UsageData {
  current: number;
  limit: number;
  plan: string;
}

const planConfig = {
  FREE: {
    name: '免費版',
    price: 0,
    limit: 3,
    color: 'gray',
    features: ['標準品質輸出', '社群技術支援']
  },
  CREATOR: {
    name: '創作者版',
    price: 890,
    limit: 50,
    color: 'orange',
    features: ['高清品質輸出', '基礎批量處理', 'Email 技術支援']
  },
  PRO: {
    name: '專業版',
    price: 2090,
    limit: 250,
    color: 'blue',
    features: ['4K 專業輸出', '高級批量處理', '優先技術支援', '專案管理工具']
  },
  ENTERPRISE: {
    name: '企業版',
    price: 9090,
    limit: 2000,
    color: 'purple',
    features: ['所有專業版功能', 'REST API 存取', '團隊協作功能', '專屬客戶經理', '超量使用 $3/次']
  }
};

export default function SubscriptionPage() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);

  // 處理付款結果通知
  useEffect(() => {
    const paymentStatus = searchParams.get('payment');
    const tradeNo = searchParams.get('tradeNo');
    const message = searchParams.get('message');

    if (paymentStatus === 'success') {
      toast.success(`付款成功！訂單號：${tradeNo}`);
    } else if (paymentStatus === 'failed') {
      toast.error(`付款失敗：${message || '未知錯誤'}`);
    } else if (paymentStatus === 'error') {
      toast.error('付款過程中發生錯誤，請聯繫客服');
    }
  }, [searchParams]);

  // 獲取訂閱和使用量資料
  useEffect(() => {
    if (session?.user) {
      fetchSubscriptionData();
    }
  }, [session]);

  const fetchSubscriptionData = async () => {
    try {
      const [subRes, usageRes] = await Promise.all([
        fetch('/api/subscription'),
        fetch('/api/usage')
      ]);

      if (subRes.ok) {
        const subData = await subRes.json();
        setSubscription(subData.subscription);
      }

      if (usageRes.ok) {
        const usageData = await usageRes.json();
        setUsage(usageData.usage);
      }
    } catch (error) {
      console.error('Failed to fetch subscription data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (plan: 'CREATOR' | 'PRO' | 'ENTERPRISE') => {
    setUpgrading(true);
    
    try {
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      });

      const data = await response.json();

      if (response.ok) {
        // 創建臨時表單提交到 ECPay
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5'; // 測試環境
        form.innerHTML = data.paymentHtml;
        document.body.appendChild(form);
        form.submit();
      } else {
        toast.error(data.error || '升級失敗');
      }
    } catch (error) {
      toast.error('升級過程中發生錯誤');
    } finally {
      setUpgrading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p>載入中...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="mb-4">請先登入查看訂閱資訊</p>
          <Link href="/auth/signin">
            <Button>前往登入</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const currentPlan = subscription ? planConfig[subscription.plan] : planConfig.FREE;
  const usagePercentage = usage ? (usage.current / usage.limit) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 text-sm mb-4 inline-block">
            ← 回到儀表板
          </Link>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            訂閱管理
          </h1>
          <p className="text-muted-foreground">
            管理您的訂閱方案和付款設定
          </p>
        </div>

        {/* Current Subscription */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${
                currentPlan.color === 'gray' ? 'bg-gray-100' :
                currentPlan.color === 'orange' ? 'bg-orange-100' :
                currentPlan.color === 'blue' ? 'bg-blue-100' :
                'bg-purple-100'
              }`}>
                {subscription?.plan === 'ENTERPRISE' ? (
                  <Crown className={`h-6 w-6 ${
                    currentPlan.color === 'purple' ? 'text-purple-600' : 'text-gray-600'
                  }`} />
                ) : (
                  <Star className={`h-6 w-6 ${
                    currentPlan.color === 'gray' ? 'text-gray-600' :
                    currentPlan.color === 'orange' ? 'text-orange-600' :
                    currentPlan.color === 'blue' ? 'text-blue-600' :
                    'text-purple-600'
                  }`} />
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  目前方案：{currentPlan.name}
                </h2>
                <p className="text-muted-foreground">
                  {subscription?.status === 'ACTIVE' ? '使用中' : '已暫停'}
                </p>
              </div>
            </div>
            <Badge className={`${
              subscription?.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {subscription?.status === 'ACTIVE' ? '有效' : subscription?.status || 'FREE'}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Usage */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-blue-600" />
                <span className="font-medium">本月使用量</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{usage?.current || 0} / {usage?.limit || 0} 次</span>
                  <span>{usage?.limit ? Math.max(0, usage.limit - (usage.current || 0)) : 0} 次剩餘</span>
                </div>
                <Progress value={usagePercentage} className="h-2" />
              </div>
            </div>

            {/* Billing Period */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-green-600" />
                <span className="font-medium">計費週期</span>
              </div>
              {subscription && subscription.plan !== 'FREE' ? (
                <div className="text-sm space-y-1">
                  <p>開始：{new Date(subscription.currentPeriodStart).toLocaleDateString('zh-TW')}</p>
                  <p>到期：{new Date(subscription.currentPeriodEnd).toLocaleDateString('zh-TW')}</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">永久免費</p>
              )}
            </div>

            {/* Price */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="h-4 w-4 text-purple-600" />
                <span className="font-medium">月費</span>
              </div>
              <div className="text-2xl font-bold">
                {currentPlan.price === 0 ? (
                  <span className="text-green-600">免費</span>
                ) : (
                  <span>NT$ {currentPlan.price.toLocaleString()}</span>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Usage Warning */}
        {usagePercentage > 80 && (
          <Card className="p-4 mb-8 border-orange-200 bg-orange-50">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-orange-800">
                  使用量即將達到上限
                </p>
                <p className="text-xs text-orange-700">
                  建議升級到更高級的方案以獲得更多使用次數
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Available Plans */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-slate-800 mb-6">升級方案</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(planConfig).map(([planKey, plan]) => {
              if (planKey === 'FREE') return null;
              
              const isCurrentPlan = subscription?.plan === planKey;
              const isDowngrade = subscription && Object.keys(planConfig).indexOf(subscription.plan) > Object.keys(planConfig).indexOf(planKey);
              
              return (
                <Card 
                  key={planKey}
                  className={`p-6 relative ${
                    isCurrentPlan ? 'ring-2 ring-blue-500' : ''
                  } ${planKey === 'PRO' ? 'ring-2 ring-blue-500' : ''}`}
                >
                  {planKey === 'PRO' && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <Badge className="px-2 py-1 bg-blue-600 text-white text-xs">
                        <Star className="h-3 w-3 mr-1" />
                        推薦
                      </Badge>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-bold mb-2">{plan.name}</h4>
                    <div className="text-3xl font-bold mb-1">
                      NT$ {plan.price.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">每月 {plan.limit} 次處理</p>
                    <p className="text-xs text-muted-foreground">
                      NT$ {plan.price > 0 ? (plan.price / plan.limit).toFixed(1) : '0'}/次
                    </p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${
                      isCurrentPlan 
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : planKey === 'PRO'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-600 hover:bg-gray-700'
                    }`}
                    onClick={() => !isCurrentPlan && !isDowngrade && handleUpgrade(planKey as any)}
                    disabled={isCurrentPlan || isDowngrade || upgrading}
                  >
                    {isCurrentPlan ? (
                      '目前方案'
                    ) : isDowngrade ? (
                      '無法降級'
                    ) : upgrading ? (
                      '處理中...'
                    ) : (
                      <>
                        <TrendingUp className="w-4 h-4 mr-1" />
                        立即升級
                      </>
                    )}
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Help */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Gift className="h-5 w-5 text-blue-600" />
            <h3 className="font-bold text-slate-800">需要協助？</h3>
          </div>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>• 訂閱方案可隨時升級，立即生效</p>
            <p>• 使用量每月 1 日重置</p>
            <p>• 如有任何問題，請聯繫客服：support@contentswappro.com</p>
          </div>
        </Card>
      </div>
    </div>
  );
}