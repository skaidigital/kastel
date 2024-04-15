import { MarketValues } from '@/data/constants';
import { getLink } from '@/lib/sanity/fragments';
import { headingAndLinksValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

export const footerValidator = z.object({
  description: z.string(),
  items: z.array(headingAndLinksValidator)
});

export const testFooterValidator = z.any();

export type FooterPayload = z.infer<typeof footerValidator>;

export function getFooterQuery(market: MarketValues) {
  const query = groq`
  *[_type == "footer"][0] {
    "description": description.${market},
    "items": items_${market}[]{
      "heading": heading.${market},
      links[]{
        ${getLink(market)}
      },
    },
  }
  `;

  return query;
}
