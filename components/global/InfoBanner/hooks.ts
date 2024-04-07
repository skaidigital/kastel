import { MarketValues } from '@/data/constants';
import * as fragments from '@/lib/sanity/fragments';
import { linkWithoutTextValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

const hiddenInfoBannerValidator = z.object({
  isShown: z.literal(false)
});

const shownInfoBannerValidator = z.object({
  isShown: z.literal(true),
  content: z.string(),
  link: linkWithoutTextValidator
});

export const infoBannerValidator = z.discriminatedUnion('isShown', [
  hiddenInfoBannerValidator,
  shownInfoBannerValidator
]);

export type InfoBannerPayload = z.infer<typeof infoBannerValidator>;

export function getInfoBannerQuery(market: MarketValues) {
  const query = groq`
    *[_type == "infoBanner"][0] {
      isShown,
      "content": content.${market},
      "link": linkWithoutText{
        ${fragments.getLinkWithoutText(market)}
      },
    }
  `;

  return query;
}
