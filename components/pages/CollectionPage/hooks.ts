import { cardValidator } from '@/components/shared/PageBuilder/hooks';
import { COLLECTION_PAGE_SIZE, MarketValues } from '@/data/constants';
import * as fragments from '@/lib/sanity/fragments';
import { productCardValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

const collectionProductValidator = productCardValidator.extend({
  firstImage: z.union([z.literal('product'), z.literal('lifestyle')]),
  _id: z.string()
});

const collectionMoodValidator = z.object({
  card: cardValidator,
  size: z.union([z.literal('small'), z.literal('large')])
});

export const collectionBaseValidator = z.object({
  title: z.string(),
  productIds: z.array(z.string()),
  moods: z.array(collectionMoodValidator).optional(),
  descriptionShort: z.string().optional(),
  descriptionLong: z.string().optional()
});

export const collectionProductsValidator = z.object({
  products: z.array(collectionProductValidator),
  hasNextPage: z.boolean()
});

export const collectionValidator = z.object({
  title: z.string(),
  products: z.array(collectionProductValidator),
  descriptionShort: z.string().optional(),
  descriptionLong: z.string().optional(),
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
      "descriptionShort": descriptionShort.${market},
      "descriptionLong": descriptionLong.${market},
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

export function getProductIdsByOrder(market: MarketValues, sortKey: string | undefined) {
  const query = groq`
    {
      "products": *[_type == "collection" && slug_${market}.current == $slug][0].products[] {
        firstImage,
        ...product->{
          defined($tagSlugs) && count((tags[]->slug_no.current)[@ in $tagSlugs]) == count($tagSlugs) => {
            _id,
            _createdAt,
            "minPrice" : minVariantPrice_no.amount,
            "maxPrice": maxVariantPrice_no.amount
          },
          defined($tagSlugs) && !count((tags[]->slug_no.current)[@ in $tagSlugs]) == count($tagSlugs)=> null,
          !defined($tagSlugs) => {
            _id,
            _createdAt,
            "minPrice" : minVariantPrice_no.amount,
            "maxPrice": maxVariantPrice_no.amount
          }
        }
      } | order(${getSortQuery(sortKey)})
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
      return null;
  }
}

export function getCollectionProductData(market: MarketValues, pageIndex: number = 1) {
  const start = (pageIndex - 1) * COLLECTION_PAGE_SIZE;
  const end = pageIndex * COLLECTION_PAGE_SIZE;

  const query = groq`
    *[_type == "product" && _id in $ids][${start}...${end}]{
      _id,
    ${fragments.getProductCard(market)}
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
    descriptionShort: collection.descriptionShort,
    descriptionLong: collection.descriptionLong,
    products: products.products,
    productCount: products.products.length || 0,
    hasNextPage: products.hasNextPage
  };
}
