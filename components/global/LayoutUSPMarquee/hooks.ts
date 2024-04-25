import { LangValues } from '@/data/constants';
import { groq } from 'next-sanity';
import { z } from 'zod';

export const layoutUSPMarqueeValidator = z.object({
  items: z.array(z.string())
});

export type LayoutUSPMarqueePayload = z.infer<typeof layoutUSPMarqueeValidator>;

export function getLayoutUSPMarqueeQuery(lang: LangValues) {
  const query = groq`
  *[_type == "layoutUSPMarquee"][0] {
    "items": items[].item.${lang}
  }
  `;

  return query;
}
