import { getDictionary } from '@/app/dictionaries';
import { CookieConsentLayout } from '@/components/global/CookieConsent/CookieConsentLayout';
import {
  CookieConsentPayload,
  cookieConsentValidator,
  getCookieConsentQuery
} from '@/components/global/CookieConsent/hooks';
import { CACHE_TAGS, MarketValues } from '@/data/constants';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';

async function loadCookieConsent(market: MarketValues) {
  const query = getCookieConsentQuery(market);

  return loadQuery<CookieConsentPayload>(
    query,
    {},
    { next: { tags: [CACHE_TAGS.COOKIE_CONSENT] } }
  );
}

interface Props {
  market: MarketValues;
}

export async function CookieConsent({ market }: Props) {
  const initial = await loadCookieConsent(market);
  const dictionary = await getDictionary();

  if (!initial.data?.content) {
    return null;
  }

  const withoutNullValues = nullToUndefined(initial.data);
  const validatedData = cookieConsentValidator.safeParse(withoutNullValues);

  if (!validatedData.success) {
    console.error(validatedData.error.errors);
    return null;
  }

  return <CookieConsentLayout data={validatedData.data} dictionary={dictionary} />;
}
