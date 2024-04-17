import { cardValidator } from '@/components/shared/PageBuilder/hooks';
import { COLLECTION_PAGE_SIZE, MarketValues } from '@/data/constants';
import * as fragments from '@/lib/sanity/fragments';
import { productCardValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

const collectionProductValidator = productCardValidator.extend({
  firstImage: z.union([z.literal('product'), z.literal('lifestyle')])
});

const collectionMoodValidator = z.object({
  card: cardValidator,
  size: z.union([z.literal('small'), z.literal('large')])
});

export const collectionBaseValidator = z.object({
  title: z.string(),
  productIds: z.array(z.string()),
  moods: z.array(collectionMoodValidator).optional()
});

export const collectionProductsValidator = z.object({
  products: z.array(collectionProductValidator),
  hasNextPage: z.boolean()
});

export const collectionValidator = z.object({
  title: z.string(),
  products: z.array(collectionProductValidator),
  productCount: z.number(),
  hasNextPage: z.boolean(),
  moods: z.array(collectionMoodValidator).optional()
});

export type CollectionBasePayload = z.infer<typeof collectionBaseValidator>;
export type CollectionMood = z.infer<typeof collectionMoodValidator>;
export type CollectionProductPayload = z.infer<typeof collectionProductValidator>;
export type CollectionProductsPayload = z.infer<typeof collectionProductsValidator>;
export type Collection = z.infer<typeof collectionValidator>;

export function getCollectionBaseQuery(market: MarketValues) {
  const query = groq`
    *[_type == "collection" && slug_${market}.current == $slug][0]{
      "title": title.${market},
      "productIds": products[].product._ref,
      moods[]{
        card->{
          ${fragments.getCard(market)}
        },
        size,
      },
    }
  `;

  return query;
}

export function getCollectionProductsQuery(market: MarketValues, pageIndex: number = 1) {
  const start = (pageIndex - 1) * COLLECTION_PAGE_SIZE;
  const end = pageIndex * COLLECTION_PAGE_SIZE;

  const query = groq`
    {
    "products": *[_type == "collection" && slug_${market}.current == $slug][0].products[${start}...${end}]{
      firstImage,
      ...product->{
        defined($tagSlugs) && count((tags[]->slug_no.current)[@ in $tagSlugs]) == count($tagSlugs) => {
          ${fragments.getProductCard(market)}
        },
        defined($tagSlugs) && !count((tags[]->slug_no.current)[@ in $tagSlugs]) == count($tagSlugs)=> null,
        !defined($tagSlugs) => {
          ${fragments.getProductCard(market)}
        }
      }
    },
    "hasNextPage": count(*[_type == "collection" && slug_${market}.current == $slug][0].products[${start + 1}...${end + 1}]) >= ${COLLECTION_PAGE_SIZE}
    }
  `;

  return query;
}

export function mergeCollectionBaseAndProducts(
  collection: CollectionBasePayload,
  products: CollectionProductsPayload
): Collection {
  return {
    title: collection.title,
    moods: collection.moods,
    products: products.products,
    productCount: products.products.length || 0,
    hasNextPage: products.hasNextPage
  };
}
