import { COOKIE_NAMES } from '@/data/constants';
import { env } from '@/env';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // Don't run this middleware on the studio
  const isPathStudio = request.nextUrl.pathname.includes('/studio');
  if (isPathStudio) {
    return NextResponse.next();
  }

  const country = request.geo?.country || 'EU';
  const marketEnvCode = env.NEXT_PUBLIC_MARKET;

  type AvailableMarkets = {
    [key: string]: string;
  };
  const availableMarkets: AvailableMarkets = { no: 'NO', sv: 'SE', eu: 'EU', dk: 'DK' };

  // Convert market environment code to the corresponding country code for comparison
  const market = availableMarkets[marketEnvCode.toLowerCase()];

  const response = NextResponse.next();
  const hasChosenMarketCookie = request.cookies.get(COOKIE_NAMES.HAS_CHOSEN_MARKET)?.value;

  // If they have already chosen a market, do nothing
  if (hasChosenMarketCookie === 'true') {
    const isPathConfigurator = request.nextUrl.pathname.includes('/configurator');
    if (isPathConfigurator) {
      return handleConfiguratorSteps(request);
    }
    return response;
  }

  if (country === market) {
    // User is in the correct market
    response.cookies.set(COOKIE_NAMES.HAS_CHOSEN_MARKET, 'true', { path: '/', sameSite: 'lax' });
  } else if (Object.values(availableMarkets).includes(country)) {
    // User is in a country where we have a market
    response.cookies.set(COOKIE_NAMES.REQUEST_COUNTRY, country, { path: '/', sameSite: 'lax' });
    response.cookies.set(COOKIE_NAMES.RECCOMMENDED_MARKET, country, { path: '/', sameSite: 'lax' });
  } else {
    // User is not in a supported market, recommend EU
    response.cookies.set(COOKIE_NAMES.REQUEST_COUNTRY, country, { path: '/', sameSite: 'lax' });
    response.cookies.set(COOKIE_NAMES.RECCOMMENDED_MARKET, 'EU', { path: '/', sameSite: 'lax' });
  }

  return response;
}

function handleConfiguratorSteps(request: NextRequest) {
  const url = request.nextUrl.clone(); // Clone the request URL to modify
  const step = url.searchParams.get('step');
  const validSteps = ['1', '2', '3', '4'];

  // If the step is not valid, set it to the first step
  if (!step || !validSteps.includes(step)) {
    url.searchParams.set('step', '1');
    return NextResponse.redirect(url);
  }
}

// function handleMarketCookies()
// export const config = {
//   matcher: ['/:path*'] // This matches all paths, adjust if necessary
// };
