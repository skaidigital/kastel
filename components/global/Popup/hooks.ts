import { LangValues } from '@/data/constants';
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

export function getPopupQuery(lang: LangValues) {
  const query = groq`
    *[_type == "popup"][0] {
      isShown,
      type,
      type == "info" => {
        "badge": badgeInfo->title.${lang},
        "title": titleInfo.${lang},
        "content": contentInfo.${lang},
        "image": imageInfo{
          ${fragments.getImageBase(lang)}
        },
        "link": linkInfo{
          ${fragments.getLink(lang)}
        },
      },
      type == "newsletter" => {
        "badge": badgeNewsletter->title.${lang},
        "title": titleNewsletter.${lang},
        "content": contentNewsletter.${lang},
        "image": imageNewsletter{
          ${fragments.getImageBase(lang)}
        },
        "buttonText": buttonTextNewsletter.${lang},
      },
    }
  `;

  return query;
}
