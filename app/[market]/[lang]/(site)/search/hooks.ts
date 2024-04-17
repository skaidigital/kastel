import { COLLECTION_PAGE_SIZE, MarketValues } from '@/data/constants';
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

export function getSearchResultQuery(market: MarketValues, pageIndex: number = 1) {
  const start = (pageIndex - 1) * COLLECTION_PAGE_SIZE;
  const end = pageIndex * COLLECTION_PAGE_SIZE;

  const query = groq`
      {
      "products": *[_type == "product" && title.${market} match $searchQuery]
      | score(title.${market} match $searchQuery)
      | order(_score desc)
      [${start}...${end}]{
        defined($tagSlugs) && count((tags[]->slug_no.current)[@ in $tagSlugs]) == count($tagSlugs) => {
          ${fragments.getProductCard(market)}
        },
        defined($tagSlugs) && !count((tags[]->slug_no.current)[@ in $tagSlugs]) == count($tagSlugs)=> null,
        !defined($tagSlugs) => {
          ${fragments.getProductCard(market)}
        }
      },
      "productCount": count(*[_type == "product" && title.${market} match $searchQuery]),
      "hasNextPage": count(*[_type == "product" && title.${market} match $searchQuery][${start + 1}...${end + 1}]) >= ${COLLECTION_PAGE_SIZE}
      }
    `;

  return query;
}
