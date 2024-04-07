import { MarketValues } from '@/data/constants';
import * as fragments from '@/lib/sanity/fragments';
import { imageValidator, linkValidator, richTextValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

export const popupValidator = z.object({
  title: z.string(),
  image: imageValidator,
  content: richTextValidator,
  link: linkValidator,
  isShown: z.boolean()
});

export type PopupPayload = z.infer<typeof popupValidator>;

export function getPopupQuery(market: MarketValues) {
  const query = groq`
    *[_type == "popup"][0] {
      "title": title.${market},
      image{
        ${fragments.getImageBase(market)}
      },
      "content": content_${market},
      link{
        ${fragments.getLink(market)}
      },
      isShown
    }
  `;

  return query;
}
