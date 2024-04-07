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
      "products": *[_type == "product" && title_${market} match $searchQuery]
      | score(title_${market} match $searchQuery)
      | order(_score desc)
      [${start}...${end}]{
        ${fragments.getProductCard(market)}
      },
      "productCount": count(*[_type == "product" && title_${market} match $searchQuery]),
      "hasNextPage": count(*[_type == "product" && title_${market} match $searchQuery][${start + 1}...${end + 1}]) >= ${COLLECTION_PAGE_SIZE}
      }
    `;

  return query;
}
