import { LangValues } from '@/data/constants';
import { groq } from 'next-sanity';
import { z } from 'zod';

const uspCarouselValidator = z.array(z.string());

export type USPCarouselPayload = z.infer<typeof uspCarouselValidator>;

export function getUSPCarouselQuery(lang: LangValues) {
  const query = groq`
    *[_type == "productSettings"][0].productUsps[].usp.${lang}
  `;

  return query;
}
