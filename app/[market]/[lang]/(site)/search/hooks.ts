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

export function getSearchResultQuery(
  market: MarketValues,
  pageIndex: number = 1,
  sortKey?: string
) {
  const start = (pageIndex - 1) * COLLECTION_PAGE_SIZE;
  const end = pageIndex * COLLECTION_PAGE_SIZE;

  const query = groq`
      {
      "products": *[_type == "product" && title.${market} match $searchQuery]
      | score(title.${market} match $searchQuery)
      [${start}...${end}]{
        defined($tagSlugs) && count((tags[]->slug_no.current)[@ in $tagSlugs]) == count($tagSlugs) => {
          ${fragments.getProductCard(market)},
          _createdAt,
          "minPrice" : minVariantPrice_no.amount,
          "maxPrice": maxVariantPrice_no.amount
        },
        defined($tagSlugs) && !count((tags[]->slug_no.current)[@ in $tagSlugs]) == count($tagSlugs)=> null,
        !defined($tagSlugs) => {
          ${fragments.getProductCard(market)},
          _createdAt,
          "minPrice" : minVariantPrice_no.amount,
          "maxPrice": maxVariantPrice_no.amount
        }
      } | order(${getSortQuery(sortKey)}),
      "productCount": count(*[_type == "product" && title.${market} match $searchQuery]),
      "hasNextPage": count(*[_type == "product" && title.${market} match $searchQuery][${start + 1}...${end + 1}]) >= ${COLLECTION_PAGE_SIZE}
      }
    `;

  return query;
}

export function getSortQuery(sortKey: string | undefined) {
  switch (sortKey) {
    case 'price_lowest':
      return 'minPrice asc';
    case 'price_highest':
      return 'maxPrice desc';
    case 'newest':
      return '_createdAt desc';
    default:
      return '_score desc';
  }
}
