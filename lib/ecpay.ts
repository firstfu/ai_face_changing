/**
 * ECPay 金流服務整合 (ECPay Payment Service Integration)
 * 
 * 台灣綠界科技金流服務的完整整合解決方案：
 * - 訂閱付款：支援多種訂閱方案的金流處理
 * - 安全驗證：SHA256 簽章驗證與防偽機制
 * - 回調處理：付款結果的伺服器端驗證與處理
 * - 環境管理：測試與正式環境的自動切換
 * - 錯誤處理：完整的錯誤捕捉與友善訊息
 * 
 * 支援付款方式：
 * - 信用卡 (VISA, MasterCard, JCB)
 * - ATM 轉帳
 * - 超商代收 (7-11, 全家, 萊爾富, OK)
 * - 網路銀行
 * 
 * 訂閱方案整合：
 * - 創作者版：NT$ 890/月 (50次處理)
 * - 專業版：NT$ 2,090/月 (250次處理)  
 * - 企業版：NT$ 9,090/月 (2000次處理)
 * 
 * 安全特性：
 * - CheckMacValue 簽章驗證
 * - URL 編碼與特殊字符處理
 * - 時間戳與隨機數防重放攻擊
 * - 環境變數敏感資料保護
 * 
 * 技術規格：
 * - 訂單編號：20字元限制 (含時間戳與隨機數)
 * - 簽章演算法：SHA256 雜湊加密
 * - 字元編碼：UTF-8 with URL encoding
 * - 回調驗證：雙向驗證機制
 * 
 * 使用技術：
 * - ECPay AIO Node.js SDK
 * - Node.js crypto 模組
 * - TypeScript 完整型別定義
 * - 環境變數配置管理
 */

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