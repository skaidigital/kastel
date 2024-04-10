import { getDictionary } from '@/app/dictionaries';
import { MarketLayout } from '@/components/global/MarketPopup/Layout';
import { COOKIE_NAMES } from '@/data/constants';
import { cookies } from 'next/headers';

export async function MarketPopup() {
  const { market_selector: dictionary } = await getDictionary();

  const requestCountry = cookies().get(COOKIE_NAMES.REQUEST_COUNTRY)?.value as string;
  const reccommendedMarket = cookies().get(COOKIE_NAMES.RECCOMMENDED_MARKET)?.value as string;

  return (
    <MarketLayout
      dictionary={dictionary}
      country={requestCountry}
      reccommendedMarket={reccommendedMarket}
      requestCountry={requestCountry}
    />
  );
}
