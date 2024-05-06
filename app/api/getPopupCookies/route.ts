import { COOKIE_NAMES } from '@/data/constants';
import { cookies } from 'next/headers';

export type PopupCookieResponse = {
  hasChosenMarket: string;
  requestCountry: string;
  reccommendedMarket: string;
  hasSeenPopupInLastDay: string;
  hasConsent: string;
};

export async function GET(request: Request) {
  const cookiesStore = cookies();
  const hasChosenMarket = cookiesStore.get(COOKIE_NAMES.HAS_CHOSEN_MARKET)?.value;
  const requestCountry = cookiesStore.get(COOKIE_NAMES.REQUEST_COUNTRY)?.value;
  const reccommendedMarket = cookiesStore.get(COOKIE_NAMES.RECCOMMENDED_MARKET)?.value;
  const hasSeenPopupInLastDay = cookiesStore.get(COOKIE_NAMES.POPUP)?.value;
  const hasConsent = cookiesStore.get(COOKIE_NAMES.COOKIE_CONSENT)?.value;

  return new Response(
    JSON.stringify({
      hasChosenMarket,
      requestCountry,
      reccommendedMarket,
      hasSeenPopupInLastDay,
      hasConsent
    }),
    { status: 200 }
  );
}
