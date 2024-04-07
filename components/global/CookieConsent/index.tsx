import { getDictionary } from '@/app/dictionaries';
import { CookieConsentLayout } from '@/components/global/CookieConsent/CookieConsentLayout';
import {
  CookieConsentPayload,
  getCookieConsentQuery
} from '@/components/global/CookieConsent/hooks';
import { MarketValues } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { loadQuery } from '@/lib/sanity/store';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';

const CookieConsentPreview = dynamic(() => import('./CookieConsentPreview'));

async function loadCookieConsent(market: MarketValues) {
  const query = getCookieConsentQuery(market);
  return loadQuery<CookieConsentPayload>(query, {}, { next: { tags: ['cookieConsent', 'home'] } });
}

// TODO add zod validator
export async function CookieConsent() {
  const market = (await getMarket()) as MarketValues;
  const initial = await loadCookieConsent(market);
  const dictionary = await getDictionary();

  if (draftMode().isEnabled) {
    return <CookieConsentPreview initial={initial} market={market} dictionary={dictionary} />;
  }

  return <CookieConsentLayout data={initial.data} dictionary={dictionary} />;
}
