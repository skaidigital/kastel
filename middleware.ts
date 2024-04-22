import { NextRequest, NextResponse } from 'next/server';
import { getMarketAndLang } from './lib/utils';

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const country = request.geo?.country || 'NO';

  if (pathname === '/') {
    const marketAndLang = getMarketAndLang(country);
    return NextResponse.redirect(origin + marketAndLang);
  }

  return NextResponse.next();
}
