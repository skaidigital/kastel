import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_NAMES } from './data/constants';
import { getMarketAndLang } from './lib/utils';

type AvailableMarkets = {
  [key: string]: string;
};
const availableMarkets: AvailableMarkets = { no: 'NO', sv: 'SE' };

const cookieSettings: Partial<ResponseCookie> = {
  path: '/',
  sameSite: 'lax'
};

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const country = request.geo?.country || 'NO';

  const response = NextResponse.next();

  if (Object.values(availableMarkets).includes(country)) {
    // User is in a country where we have a market
    response.cookies.set(COOKIE_NAMES.HAS_CHOSEN_MARKET, 'true', cookieSettings);
    response.cookies.set(COOKIE_NAMES.REQUEST_COUNTRY, country, cookieSettings);
    response.cookies.set(COOKIE_NAMES.RECCOMMENDED_MARKET, country, cookieSettings);
  } else {
    // User is not in a supported market, recommend EU
    response.cookies.set(COOKIE_NAMES.REQUEST_COUNTRY, country, cookieSettings);
    response.cookies.set(COOKIE_NAMES.RECCOMMENDED_MARKET, 'NO', cookieSettings);
  }

  if (pathname === '/') {
    const marketAndLang = getMarketAndLang(country);

    return NextResponse.redirect(origin + marketAndLang);
  }

  return response;
}
