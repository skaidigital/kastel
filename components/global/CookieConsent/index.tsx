import { getDictionary } from '@/app/dictionaries';
import { CookieConsentLayout } from '@/components/global/CookieConsent/CookieConsentLayout';
import {
  CookieConsentPayload,
  cookieConsentValidator,
  getCookieConsentQuery
} from '@/components/global/CookieConsent/hooks';
import { CACHE_TAGS, LangValues } from '@/data/constants';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';

async function loadCookieConsent(lang: LangValues) {
  const query = getCookieConsentQuery(lang);

  return loadQuery<CookieConsentPayload>(
    query,
    {},
    { next: { tags: [CACHE_TAGS.COOKIE_CONSENT] } }
  );
}

interface Props {
  lang: LangValues;
}

export async function CookieConsent({ lang }: Props) {
  const initial = await loadCookieConsent(lang);
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
