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