import { COOKIE_NAMES, MarketValues } from '@/data/constants';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

const MarketPopup = dynamic(
  () => import('@/components/global/MarketPopup/index').then((mod) => mod.MarketPopup),
  {
    suspense: true
  }
);
const CookieConsent = dynamic(
  () => import('@/components/global/CookieConsent').then((mod) => mod.CookieConsent),
  {
    suspense: true
  }
);

const Popup = dynamic(() => import('@/components/global/Popup').then((mod) => mod.Popup), {
  suspense: true
});

interface Props {
  market: MarketValues;
}

export async function PopupHandler({ market }: Props) {
  const cookiesStore = cookies();
  const hasChosenMarket = cookiesStore.get(COOKIE_NAMES.HAS_CHOSEN_MARKET)?.value;
  const hasAccepted = cookiesStore.get(COOKIE_NAMES.COOKIE_CONSENT);
  const requestCountry = cookiesStore.get(COOKIE_NAMES.REQUEST_COUNTRY)?.value;
  const reccommendedMarket = cookiesStore.get(COOKIE_NAMES.RECCOMMENDED_MARKET)?.value;
  const hasSeenCookieConsent = cookiesStore.get(COOKIE_NAMES.COOKIE_CONSENT);
  const hasSeenPopupInLastDay = cookiesStore.get(COOKIE_NAMES.POPUP);

  if (!hasChosenMarket && reccommendedMarket && requestCountry) {
    return (
      <Suspense>
        <MarketPopup />
      </Suspense>
    );
  }

  if (!hasAccepted) {
    return (
      <Suspense>
        <CookieConsent market={market} />
      </Suspense>
    );
  }

  if (!hasSeenCookieConsent || !hasSeenPopupInLastDay) {
    return (
      <Suspense>
        <Popup market={market} />
      </Suspense>
    );
  }

  return null;
}
