import {
  concatenatePageBuilderQueries,
  pageBuilderValidator
} from '@/components/shared/PageBuilder/hooks';
import { LangValues, MarketValues } from '@/data/constants';
import { groq } from 'next-sanity';
import { z } from 'zod';

export const pageValidator = z.object({
  id: z.string(),
  type: z.literal('page'),
  createdAt: z.string(),
  updatedAt: z.string(),
  pageBuilder: pageBuilderValidator
});

export type PagePayload = z.infer<typeof pageValidator>;

export function getPageQuery({ market, lang }: { market: MarketValues; lang: LangValues }) {
  const query = groq`
    *[_type == "page" && slug_${lang}.current == $slug][0] {
      "id": _id,
      "type": _type,
      "createdAt": _createdAt,
      "updatedAt": _updatedAt,
      pageBuilder[]{
        ${concatenatePageBuilderQueries({ market, lang })}
      }
    }
  `;

  return query;
}

export function removeEmptyPageBuilderObjects(page: PagePayload) {
  return {
    ...page,
    pageBuilder: page?.pageBuilder?.filter((section) => Object.keys(section).length > 0)
  };
}
