import { getDictionary } from '@/app/dictionaries';
import { CookieConsentLayout } from '@/components/global/CookieConsent/CookieConsentLayout';
import {
  CookieConsentPayload,
  getCookieConsentQuery
} from '@/components/global/CookieConsent/hooks';
import { MarketValues } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { loadQuery } from '@/lib/sanity/store';

async function loadCookieConsent(market: MarketValues) {
  const query = getCookieConsentQuery(market);
  return loadQuery<CookieConsentPayload>(query, {}, { next: { tags: ['cookieConsent', 'home'] } });
}

// TODO add zod validator
export async function CookieConsent() {
  const market = (await getMarket()) as MarketValues;
  const initial = await loadCookieConsent(market);
  const dictionary = await getDictionary();

  return <CookieConsentLayout data={initial.data} dictionary={dictionary} />;
}
