'use client';

import { LangValues } from '@/data/constants';
import { usePopupCookies } from '@/lib/usePopupCookies';
import dynamic from 'next/dynamic';

const DynamicMarketSuggestionPopup = dynamic(() =>
  import('@/components/global/MarketSuggestionPopup').then((mod) => mod.MarketSuggestionPopup)
);
// const DynamicPopup = dynamic(() => import('@/components/global/Popup').then((mod) => mod.Popup));

interface Props {
  lang: LangValues;
}

// TODO use dynamic import
export function PopupHandler({ lang }: Props) {
  const isProduction = process.env.NODE_ENV === 'production';

  const { cookies } = usePopupCookies();
  const hasChosenMarket = cookies?.hasChosenMarket;
  const requestCountry = cookies?.requestCountry as string;
  const reccommendedMarket = cookies?.reccommendedMarket as string;
  const hasSeenPopupInLastDay = cookies?.hasSeenPopupInLastDay;
  const hasConsent = cookies?.hasConsent;

  const productionConsent = isProduction && hasConsent;
  const productionConcentOrNotProduction = productionConsent || !isProduction;

  if (
    productionConcentOrNotProduction &&
    !hasChosenMarket &&
    requestCountry &&
    reccommendedMarket
  ) {
    return (
      <DynamicMarketSuggestionPopup
        lang={lang}
        requestCountry={requestCountry}
        reccommendedMarket={reccommendedMarket}
      />
    );
  }

  // if (productionConcentOrNotProduction && !hasSeenPopupInLastDay) {
  //   return <DynamicPopup lang={lang} />;
  // }

  return null;
}
