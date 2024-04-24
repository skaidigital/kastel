import { COOKIE_NAMES, LangValues } from '@/data/constants';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

const MarketSuggestionPopup = dynamic(
  () =>
    import('@/components/global/MarketSuggestionPopup/index').then(
      (mod) => mod.MarketSuggestionPopup
    ),
  {
    suspense: true
  }
);

const Popup = dynamic(() => import('@/components/global/Popup').then((mod) => mod.Popup), {
  suspense: true
});

interface Props {
  lang: LangValues;
}

export async function PopupHandler({ lang }: Props) {
  const cookiesStore = cookies();
  const hasChosenMarket = cookiesStore.get(COOKIE_NAMES.HAS_CHOSEN_MARKET)?.value;
  const requestCountry = cookiesStore.get(COOKIE_NAMES.REQUEST_COUNTRY)?.value;
  const reccommendedMarket = cookiesStore.get(COOKIE_NAMES.RECCOMMENDED_MARKET)?.value;
  const hasSeenPopupInLastDay = cookiesStore.get(COOKIE_NAMES.POPUP)?.value;

  console.log({ hasChosenMarket });
  console.log({ requestCountry });
  console.log({ reccommendedMarket });

  // if (!hasChosenMarket && reccommendedMarket && requestCountry) {
  if (reccommendedMarket && requestCountry) {
    return (
      <Suspense>
        <MarketSuggestionPopup />
      </Suspense>
    );
  }
  if (!hasSeenPopupInLastDay) {
    return (
      <Suspense>
        <Popup lang={lang} />
      </Suspense>
    );
  }

  return null;
}
