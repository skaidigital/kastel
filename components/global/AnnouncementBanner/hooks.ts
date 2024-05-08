import { LangValues } from '@/data/constants';
import * as fragments from '@/lib/sanity/fragments';
import { linkWithoutTextValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

const hiddenAnnouncementBannerValidator = z.object({
  isShown: z.literal(false)
});

const announncementBannerItemWithLinkValidator = z.object({
  content: z.string(),
  hasLink: z.literal(true),
  link: linkWithoutTextValidator
});

const announncementBannerItemWithoutLinkValidator = z.object({
  content: z.string(),
  hasLink: z.literal(false)
});

const shownAnnouncementBannerValidator = z.object({
  isShown: z.literal(true),
  items: z.array(
    z.union([announncementBannerItemWithLinkValidator, announncementBannerItemWithoutLinkValidator])
  )
});

export const announcementBannerValidator = z.union([
  hiddenAnnouncementBannerValidator,
  shownAnnouncementBannerValidator
]);

export type AnnouncementBannerPayload = z.infer<typeof announcementBannerValidator>;

export function getAnnouncementBannerQuery(lang: LangValues) {
  const query = groq`
    *[_type == "announcementBanner"][0] {
      isShown,
      "items": content[]{
        "content": content.${lang},
        "hasLink": hasLink,
        "link": link{
          ${fragments.getLinkWithoutText(lang)}
        }
      }
    }
  `;

  return query;
}
