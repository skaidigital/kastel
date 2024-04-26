import { LangValues } from '@/data/constants';
import * as fragments from '@/lib/sanity/fragments';
import { linkWithoutTextValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

const hiddenAnnouncementBannerValidator = z.object({
  isShown: z.literal(false)
});

const showAnnouncementBannerWithLinkValidator = z.object({
  isShown: z.literal(true),
  content: z.array(z.string()),
  hasLink: z.literal(true),
  link: linkWithoutTextValidator
});

const showAnnouncementBannerWithoutLinkValidator = z.object({
  isShown: z.literal(true),
  content: z.array(z.string()),
  hasLink: z.literal(false)
});

// Discrimination on `hasLink`
const showAnnouncementBannerValidator = z.discriminatedUnion('hasLink', [
  showAnnouncementBannerWithLinkValidator,
  showAnnouncementBannerWithoutLinkValidator
]);

export const announcementBannerValidator = z.union([
  hiddenAnnouncementBannerValidator,
  showAnnouncementBannerValidator
]);

export type AnnouncementBannerPayload = z.infer<typeof announcementBannerValidator>;

export function getAnnouncementBannerQuery(lang: LangValues) {
  const query = groq`
    *[_type == "announcementBanner"][0] {
      isShown,
      "content": content[].content.${lang},
      hasLink,
      link{
        ${fragments.getLinkWithoutText(lang)}
      },
    }
  `;

  return query;
}
