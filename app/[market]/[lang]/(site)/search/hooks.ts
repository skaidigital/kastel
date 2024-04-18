import { COLLECTION_PAGE_SIZE, LangValues } from '@/data/constants';
import * as fragments from '@/lib/sanity/fragments';
import { productCardValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

export const searchResultValidator = z.object({
  products: z.array(productCardValidator).optional(),
  productCount: z.number().optional(),
  hasNextPage: z.boolean()
});

export type SearchResult = z.infer<typeof searchResultValidator>;

export function getSearchResultQuery(lang: LangValues, pageIndex: number = 1) {
  const start = (pageIndex - 1) * COLLECTION_PAGE_SIZE;
  const end = pageIndex * COLLECTION_PAGE_SIZE;

  const query = groq`
      {
      "products": *[_type == "product" && title.${lang} match $searchQuery]
      | score(title.${lang} match $searchQuery)
      | order(_score desc)
      [${start}...${end}]{
        defined($tagSlugs) && count((tags[]->slug_no.current)[@ in $tagSlugs]) == count($tagSlugs) => {
          ${fragments.getProductCard(lang)}
        },
        defined($tagSlugs) && !count((tags[]->slug_no.current)[@ in $tagSlugs]) == count($tagSlugs)=> null,
        !defined($tagSlugs) => {
          ${fragments.getProductCard(lang)}
        }
      },
      "productCount": count(*[_type == "product" && title.${lang} match $searchQuery]),
      "hasNextPage": count(*[_type == "product" && title.${lang} match $searchQuery][${start + 1}...${end + 1}]) >= ${COLLECTION_PAGE_SIZE}
      }
    `;

  return query;
}
