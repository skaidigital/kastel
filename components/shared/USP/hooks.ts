import { MarketValues } from '@/data/constants';
import { groq } from 'next-sanity';
import { z } from 'zod';

export const uspValidator = z.object({
  items: z.array(
    z.object({
      title: z.string(),
      subtitle: z.string()
    })
  )
});

export type USPPayload = z.infer<typeof uspValidator>;

export function getUSPQuery(market: MarketValues) {
  const query = groq`
    *[_type == "usps"][0] {
    items[] {
     "title": title.${market},
     "subtitle": subtitle.${market},
        }
    }
  `;

  return query;
}
