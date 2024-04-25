import { getDictionary } from '@/app/dictionaries';
import { MarketSuggestionPopupLayout } from '@/components/global/MarketSuggestionPopup/Layout';
import { COOKIE_NAMES } from '@/data/constants';
import { cookies } from 'next/headers';

export async function MarketSuggestionPopup() {
  const { market_suggestion_popup: dictionary } = await getDictionary();

  const requestCountry = cookies().get(COOKIE_NAMES.REQUEST_COUNTRY)?.value as string;
  const reccommendedMarket = cookies().get(COOKIE_NAMES.RECCOMMENDED_MARKET)?.value as string;

  return (
    <MarketSuggestionPopupLayout
      dictionary={dictionary}
      reccommendedMarket={reccommendedMarket}
      requestCountry={requestCountry}
    />
  );
}
