import { CACHE_TAGS, MarketValues } from '@/data/constants';
import { loadQuery } from '@/lib/sanity/store';
import { groq } from 'next-sanity';
import { z } from 'zod';

export const freeShippingAmountValidator = z.number().optional();

export type FreeShippingAmountPayload = z.infer<typeof freeShippingAmountValidator>;

export function getFreeShippingAmountQuery(market: MarketValues) {
  console.log({ market });

  const query = groq`
  *[_type == "merchandising"][0].freeShippingAmount.${market}
  `;

  return query;
}

export async function loadFreeShippingAmount(market: MarketValues) {
  const query = getFreeShippingAmountQuery(market);

  return loadQuery<FreeShippingAmountPayload>(
    query,
    {},
    { next: { tags: [CACHE_TAGS.MERCHANDISING] } }
  );
}
