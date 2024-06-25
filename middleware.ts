import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAMES } from './data/constants'
import { getMarketAndLang } from './lib/utils'

type AvailableMarkets = {
  [key: string]: string
}
const availableMarkets: AvailableMarkets = { no: 'NO', sv: 'SE' }

const cookieSettings: Partial<ResponseCookie> = {
  path: '/',
  sameSite: 'lax'
}

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl
  if (request.method === 'POST') return NextResponse.next()

  // Check if cookies are present
  const hasChosenMarket = request.cookies.get(COOKIE_NAMES.HAS_CHOSEN_MARKET)
  const requestCountry = request.cookies.get(COOKIE_NAMES.REQUEST_COUNTRY)
  const recommendedMarket = request.cookies.get(COOKIE_NAMES.RECOMMENDED_MARKET)

  // Skip middleware processing if cookies are present and it's not the root path
  if (pathname !== '/' && hasChosenMarket && requestCountry && recommendedMarket) {
    return NextResponse.next()
  }

  const country = request.geo?.country || 'NO'

  const response = NextResponse.next()

  // Set cookies if missing
  if (!hasChosenMarket || !requestCountry || !recommendedMarket) {
    if (Object.values(availableMarkets).includes(country)) {
      response.cookies.set(COOKIE_NAMES.HAS_CHOSEN_MARKET, 'true', cookieSettings)
      response.cookies.set(COOKIE_NAMES.REQUEST_COUNTRY, country, cookieSettings)
      response.cookies.set(COOKIE_NAMES.RECOMMENDED_MARKET, country, cookieSettings)
    } else {
      response.cookies.set(COOKIE_NAMES.REQUEST_COUNTRY, country, cookieSettings)
      response.cookies.set(COOKIE_NAMES.RECOMMENDED_MARKET, 'NO', cookieSettings)
    }
  }

  if (pathname === '/') {
    const marketAndLang = getMarketAndLang(country)

    return NextResponse.redirect(origin + marketAndLang)
  }

  return response
}

// Middleware Configuration
export const config = {
  matcher: [
    '/', // Ensure middleware runs on the home page
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)', // Match all other paths excluding these
      missing: [
        // { type: 'cookie', key: COOKIE_NAMES.HAS_CHOSEN_MARKET }
        { type: 'header', key: 'has_chosen_market' }
      ]
    }
  ]
}
