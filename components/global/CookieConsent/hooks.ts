import { MarketValues } from '@/data/constants';
import * as fragments from '@/lib/sanity/fragments';
import { portableTextValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

export const cookieConsentValidator = z.object({
  content: portableTextValidator
});

export type CookieConsentPayload = z.infer<typeof cookieConsentValidator>;

export function getCookieConsentQuery(market: MarketValues) {
  const query = groq`
    *[_type == "cookieConsent"][0] {
      "content": ${fragments.getRichText({ market, fieldName: 'content' })},
    }
  `;

  return query;
}
