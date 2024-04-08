import { MarketValues } from '@/data/constants';
import * as fragments from '@/lib/sanity/fragments';
import { imageValidator, linkValidator, richTextValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

export const popupValidator = z.object({
  isShown: z.boolean(),
  type: z.union([z.literal('info'), z.literal('newsletter')]),
  badge: z.string().optional(),
  title: z.string(),
  content: richTextValidator,
  image: imageValidator,
  buttonText: z.string(),
  // TODO make conditional based on the type
  link: linkValidator.optional()
});

export type PopupPayload = z.infer<typeof popupValidator>;

export function getPopupQuery(market: MarketValues) {
  const query = groq`
    *[_type == "popup"][0] {
      isShown,
      type,
      "badge": badge->title.${market},
      "title": title.${market},
      "content": content_${market},
      image{
        ${fragments.getImageBase(market)}
      },
      "buttonText": buttonText.${market},
      link{
        ${fragments.getLink(market)}
      },
    }
  `;

  return query;
}
