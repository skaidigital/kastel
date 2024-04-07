import {
  concatenatePageBuilderQueries,
  pageBuilderValidator
} from '@/components/shared/PageBuilder/hooks';
import { MarketValues } from '@/data/constants';
import { groq } from 'next-sanity';
import { z } from 'zod';

export const pageValidator = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  pageBuilder: pageBuilderValidator
});

export type PagePayload = z.infer<typeof pageValidator>;

export function getPageQuery(market: MarketValues) {
  const query = groq`
    *[_type == "page" && slug_${market}.current == $slug][0] {
      "createdAt": _createdAt,
      "updatedAt": _updatedAt,
      pageBuilder[]{
        ${concatenatePageBuilderQueries(market)}
      }
    }
  `;

  return query;
}
