import { MarketValues, SANITY_SINGLETON_DOCUMENT_IDS } from '@/data/constants';
import { getLink } from '@/lib/sanity/fragments';
import { headingAndLinksValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

export const footerValidator = z.object({
  description: z.string(),
  items: z.array(headingAndLinksValidator),
  klaviyoId: z.string()
});

export const testFooterValidator = z.any();

export type FooterPayload = z.infer<typeof footerValidator>;

export function getFooterQuery(market: MarketValues) {
  const query = groq`
  *[_type == "footer"][0] {
    "klaviyoId": *[_id == "${SANITY_SINGLETON_DOCUMENT_IDS.GENERAL_SETTINGS}"][0].klayvioId,
    "description": description.${market},
    items[]{
      "heading": heading.${market},
      links[]{
        ${getLink(market)}
      },
    },
  }
  `;

  return query;
}
