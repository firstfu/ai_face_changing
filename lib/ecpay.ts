import ecpay_payment from 'ecpay_aio_nodejs';
import crypto from 'crypto';

interface ECPayConfig {
  MerchantID: string;
  HashKey: string;
  HashIV: string;
  Mode: string;
  ReturnURL: string;
  OrderResultURL: string;
  ClientBackURL: string;
}

interface PaymentData {
  MerchantTradeNo: string;
  MerchantTradeDate: string;
  PaymentType: string;
  TotalAmount: number;
  TradeDesc: string;
  ItemName: string;
  ReturnURL: string;
  OrderResultURL: string;
  ClientBackURL: string;
  ChoosePayment: string;
  EncryptType: number;
}

class ECPayService {
  private config: ECPayConfig;
  private payment: any;

  constructor() {
    this.config = {
      MerchantID: process.env.ECPAY_MERCHANT_ID || '',
      HashKey: process.env.ECPAY_HASH_KEY || '',
      HashIV: process.env.ECPAY_HASH_IV || '',
      Mode: process.env.NODE_ENV === 'production' ? '1' : '0', // 0: 測試模式, 1: 正式模式
      ReturnURL: process.env.ECPAY_RETURN_URL || '',
      OrderResultURL: process.env.ECPAY_ORDER_RESULT_URL || '',
      ClientBackURL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    };

    // 初始化 ECPay
    this.payment = ecpay_payment({
      OperationMode: this.config.Mode,
      MercProfile: {
        MerchantID: this.config.MerchantID,
        HashKey: this.config.HashKey,
        HashIV: this.config.HashIV,
      },
      IgnorePayment: [
        // 忽略的付款方式，可以根據需求調整
      ],
      IsProjectContractor: false,
    });
  }

  // 生成訂單編號
  generateTradeNo(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `CSP${timestamp}${random}`.substring(0, 20); // ECPay 限制 20 字元
  }

  // 創建訂閱付款
  async createSubscriptionPayment(params: {
    userId: string;
    plan: 'CREATOR' | 'PRO' | 'ENTERPRISE';
    amount: number;
    userEmail: string;
  }) {
    const { userId, plan, amount, userEmail } = params;
    const tradeNo = this.generateTradeNo();
    const tradeDate = new Date().toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '/');

    const paymentData: PaymentData = {
      MerchantTradeNo: tradeNo,
      MerchantTradeDate: tradeDate,
      PaymentType: 'aio',
      TotalAmount: amount,
      TradeDesc: `ContentSwap Pro ${plan} 訂閱`,
      ItemName: `ContentSwap Pro ${plan} 月費方案`,
      ReturnURL: this.config.ReturnURL,
      OrderResultURL: this.config.OrderResultURL,
      ClientBackURL: `${this.config.ClientBackURL}/subscription?payment=success`,
      ChoosePayment: 'ALL', // 允許所有付款方式
      EncryptType: 1,
    };

    try {
      const html = this.payment.payment_client.aio_check_out_all(paymentData);
      
      return {
        success: true,
        html,
        tradeNo,
        data: paymentData
      };
    } catch (error) {
      console.error('ECPay payment creation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // 驗證回調簽名
  verifyCallback(params: Record<string, any>): boolean {
    try {
      const checkMacValue = params.CheckMacValue;
      delete params.CheckMacValue; // 移除 CheckMacValue 參數

      // 按照 ECPay 規則排序並生成檢核碼
      const sortedParams = Object.keys(params)
        .sort()
        .map(key => `${key}=${params[key]}`)
        .join('&');

      const hashString = `HashKey=${this.config.HashKey}&${sortedParams}&HashIV=${this.config.HashIV}`;
      const encodedString = encodeURIComponent(hashString)
        .toLowerCase()
        .replace(/%20/g, '+')
        .replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16));

      const hash = crypto
        .createHash('sha256')
        .update(encodedString)
        .digest('hex')
        .toUpperCase();

      return hash === checkMacValue;
    } catch (error) {
      console.error('Callback verification error:', error);
      return false;
    }
  }

  // 處理付款結果
  async handlePaymentResult(params: Record<string, any>) {
    const isValid = this.verifyCallback(params);
    
    if (!isValid) {
      throw new Error('Invalid callback signature');
    }

    return {
      success: params.RtnCode === '1',
      tradeNo: params.MerchantTradeNo,
      tradeAmount: parseInt(params.TradeAmt),
      paymentDate: params.PaymentDate,
      paymentType: params.PaymentType,
      rtnMsg: params.RtnMsg,
    };
  }
}

export const ecpayService = new ECPayService();

// 訂閱方案配置
export const subscriptionPlans = {
  CREATOR: {
    name: '創作者版',
    price: 890, // 新台幣
    limit: 50,
    features: ['高清品質輸出', '基礎批量處理', 'Email 技術支援']
  },
  PRO: {
    name: '專業版',
    price: 2090, // 新台幣
    limit: 250,
    features: ['4K 專業輸出', '高級批量處理', '優先技術支援', '專案管理工具']
  },
  ENTERPRISE: {
    name: '企業版',
    price: 9090, // 新台幣
    limit: 2000,
    features: ['所有專業版功能', 'REST API 存取', '團隊協作功能', '專屬客戶經理', '超量使用 $3/次']
  }
} as const;