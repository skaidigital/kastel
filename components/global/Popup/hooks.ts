import { MarketValues } from '@/data/constants';
import * as fragments from '@/lib/sanity/fragments';
import { imageValidator, linkValidator, richTextValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

const infoPopupValidator = z.object({
  isShown: z.boolean(),
  type: z.literal('info'),
  badge: z.string().optional(),
  title: z.string(),
  content: richTextValidator,
  image: imageValidator,
  link: linkValidator
});

const newsletterPopupValidator = z.object({
  isShown: z.boolean(),
  type: z.literal('newsletter'),
  badge: z.string().optional(),
  title: z.string(),
  content: richTextValidator,
  image: imageValidator,
  buttonText: z.string()
});

export const popupValidator = z.discriminatedUnion('type', [
  infoPopupValidator,
  newsletterPopupValidator
]);

export type PopupPayload = z.infer<typeof popupValidator>;

export function getPopupQuery(market: MarketValues) {
  const query = groq`
    *[_type == "popup"][0] {
      isShown,
      type,
      type == "info" => {
        "badge": badgeInfo->title.${market},
        "title": titleInfo.${market},
        "content": contentInfo_${market},
        "image": imageInfo{
          ${fragments.getImageBase(market)}
        },
        "link": linkInfo{
          ${fragments.getLink(market)}
        },
      },
      type == "newsletter" => {
        "badge": badgeNewsletter->title.${market},
        "title": titleNewsletter.${market},
        "content": contentNewsletter_${market},
        "image": imageNewsletter{
          ${fragments.getImageBase(market)}
        },
        "buttonText": buttonTextNewsletter.${market},
      },
    }
  `;

  return query;
}
