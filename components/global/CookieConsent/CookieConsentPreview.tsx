'use client';

import { Dictionary } from '@/app/dictionaries';
import { CookieConsentLayout } from '@/components/global/CookieConsent/CookieConsentLayout';
import {
  CookieConsentPayload,
  getCookieConsentQuery
} from '@/components/global/CookieConsent/hooks';
import { MarketValues } from '@/data/constants';
import { useQuery } from '@/lib/sanity/loader/useQuery';
import { QueryResponseInitial } from '@sanity/react-loader/rsc';

function useCookieConsent(
  initial: QueryResponseInitial<CookieConsentPayload>,
  market: MarketValues
) {
  const query = getCookieConsentQuery(market);
  return useQuery<CookieConsentPayload>(query, {}, { initial });
}

interface Props {
  initial: Parameters<typeof useCookieConsent>[0];
  market: MarketValues;
  dictionary: Dictionary;
}

export default function CookieConsentPreview({ initial, market, dictionary }: Props) {
  const { data, encodeDataAttribute } = useCookieConsent(initial, market);

  return (
    <CookieConsentLayout
      data={data!}
      dictionary={dictionary}
      encodeDataAttribute={encodeDataAttribute}
    />
  );
}
