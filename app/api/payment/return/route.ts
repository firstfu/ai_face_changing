import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // 獲取返回參數
    const formData = await request.formData();
    const params: Record<string, string> = {};
    
    formData.forEach((value, key) => {
      params[key] = value.toString();
    });

    console.log('ECPay return received:', params);

    // 根據付款結果重定向
    const rtnCode = params.RtnCode;
    const tradeNo = params.MerchantTradeNo;

    if (rtnCode === '1') {
      // 付款成功，重定向到成功頁面
      return NextResponse.redirect(
        new URL(`/subscription?payment=success&tradeNo=${tradeNo}`, request.url)
      );
    } else {
      // 付款失敗，重定向到失敗頁面
      return NextResponse.redirect(
        new URL(`/subscription?payment=failed&message=${encodeURIComponent(params.RtnMsg || '付款失敗')}`, request.url)
      );
    }

  } catch (error) {
    console.error('Payment return error:', error);
    
    // 發生錯誤，重定向到錯誤頁面
    return NextResponse.redirect(
      new URL('/subscription?payment=error', request.url)
    );
  }
}

// 也處理 GET 請求（某些情況下 ECPay 可能使用 GET）
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rtnCode = searchParams.get('RtnCode');
  const tradeNo = searchParams.get('MerchantTradeNo');

  if (rtnCode === '1') {
    return NextResponse.redirect(
      new URL(`/subscription?payment=success&tradeNo=${tradeNo}`, request.url)
    );
  } else {
    const message = searchParams.get('RtnMsg') || '付款失敗';
    return NextResponse.redirect(
      new URL(`/subscription?payment=failed&message=${encodeURIComponent(message)}`, request.url)
    );
  }
}