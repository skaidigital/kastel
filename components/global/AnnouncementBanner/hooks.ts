import { MarketValues } from '@/data/constants';
import * as fragments from '@/lib/sanity/fragments';
import { linkWithoutTextValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

const hiddenAnnouncementBannerValidator = z.object({
  isShown: z.literal(false)
});

const shownAnnouncementBannerValidator = z.object({
  isShown: z.literal(true),
  content: z.string(),
  link: linkWithoutTextValidator
});

export const announcementBannerValidator = z.discriminatedUnion('isShown', [
  hiddenAnnouncementBannerValidator,
  shownAnnouncementBannerValidator
]);

export type AnnouncementBannerPayload = z.infer<typeof announcementBannerValidator>;

export function getAnnouncementBannerQuery(market: MarketValues) {
  const query = groq`
    *[_type == "announcementBanner"][0] {
      isShown,
      "content": content.${market},
      "link": linkWithoutText{
        ${fragments.getLinkWithoutText(market)}
      },
    }
  `;

  return query;
}
