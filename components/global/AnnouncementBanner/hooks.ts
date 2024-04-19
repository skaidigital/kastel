import { LangValues } from '@/data/constants';
import * as fragments from '@/lib/sanity/fragments';
import { linkWithoutTextValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

const hiddenAnnouncementBannerValidator = z.object({
  isShown: z.literal(false)
});

const shownAnnouncementBannerValidator = z.object({
  isShown: z.literal(true),
  content: z.array(z.string()),
  link: linkWithoutTextValidator
});

export const announcementBannerValidator = z.discriminatedUnion('isShown', [
  hiddenAnnouncementBannerValidator,
  shownAnnouncementBannerValidator
]);

export type AnnouncementBannerPayload = z.infer<typeof announcementBannerValidator>;

export function getAnnouncementBannerQuery(lang: LangValues) {
  const query = groq`
    *[_type == "announcementBanner"][0] {
      isShown,
      "content": content[].content.${lang},
      "link": linkWithoutText{
        ${fragments.getLinkWithoutText(lang)}
      },
    }
  `;

  return query;
}
