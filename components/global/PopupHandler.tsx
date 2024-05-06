'use client';

import { LangValues } from '@/data/constants';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

const DynamicMarketSuggestionPopup = dynamic(
  () =>
    import('@/components/global/MarketSuggestionPopup').then((mod) => mod.MarketSuggestionPopup),
  {
    ssr: false
  }
);
const DynamicPopup = dynamic(() => import('@/components/global/Popup').then((mod) => mod.Popup), {
  ssr: false
});

function usePopupCookies() {
  return useQuery({
    queryKey: ['popupCookies'],
    queryFn: async () => {
      const response = await fetch('/api/getPopupCookies', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      return data;
    }
  });
}

interface Props {
  lang: LangValues;
}

export function PopupHandler({ lang }: Props) {
  const isProduction = process.env.NODE_ENV === 'production';

  const { data: cookies, isLoading } = usePopupCookies();

  const hasChosenMarket = cookies?.hasChosenMarket;
  const hasConsent = cookies?.hasConsent;
  const hasSeenPopupInLastDay = cookies?.hasSeenPopupInLastDay;
  const reccommendedMarket = cookies?.reccommendedMarket;
  const requestCountry = cookies?.requestCountry;

  const productionConsent = isProduction && hasConsent;
  const productionConcentOrNotProduction = productionConsent || !isProduction;

  if (isLoading) {
    return null;
  }

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

  if (productionConcentOrNotProduction && !hasSeenPopupInLastDay) {
    return <DynamicPopup lang={lang} />;
  }

  return null;
}
