/**
 * ECPay AIO Node.js 模組型別宣告 (ECPay AIO Module Type Declarations)
 * 
 * 為第三方 ECPay AIO Node.js SDK 提供 TypeScript 型別定義：
 * - 解決第三方套件缺乏型別定義的問題
 * - 提供完整的 API 介面型別安全
 * - 支援金流整合的完整開發體驗
 * - 確保編譯時期的型別檢查
 * 
 * 核心型別定義：
 * - ECPayConfig: SDK 初始化配置
 * - PaymentData: 付款請求資料結構
 * - ECPayPayment: 主要服務類別
 * - payment_client: 付款客戶端介面
 * 
 * 功能覆蓋：
 * - 商戶配置與環境設定
 * - 付款方式選擇與限制
 * - 訂單資料結構定義
 * - HTML 表單產生介面
 * 
 * 安全特性：
 * - HashKey 與 HashIV 型別定義
 * - 加密類型與簽章配置
 * - 回調 URL 結構化定義
 * 
 * 使用技術：
 * - TypeScript Declaration Files
 * - Module Declaration 語法
 * - Interface 型別定義
 * - Optional Properties 支援
 */

declare module 'ecpay_aio_nodejs' {
  interface ECPayConfig {
    OperationMode: string;
    MercProfile: {
      MerchantID: string;
      HashKey: string;
      HashIV: string;
    };
    IgnorePayment?: string[];
    IsProjectContractor?: boolean;
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

  class ECPayPayment {
    payment_client: {
      aio_check_out_all: (data: PaymentData) => string;
    };
  }

  function ECPayPaymentConstructor(config: ECPayConfig): ECPayPayment;
  
  export = ECPayPaymentConstructor;
}