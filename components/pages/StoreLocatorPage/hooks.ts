import { MarketValues } from '@/data/constants';
import { groq } from 'next-sanity';
import { z } from 'zod';

export const storeLocatorValidator = z.object({
  title: z.string()
});

export type StoreLocatorPayload = z.infer<typeof storeLocatorValidator>;

export function getStoreLocatorQuery(market: MarketValues) {
  const query = groq`
    *[_type == "storeLocator" && _id == "storeLocator"][0] {
        "title": title.${market}
    }
  `;

  return query;
}
