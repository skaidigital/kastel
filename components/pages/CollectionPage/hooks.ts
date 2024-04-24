import { pageBuilderValidator } from '@/components/shared/PageBuilder/hooks';
import { COLLECTION_PAGE_SIZE, LangValues, MarketValues } from '@/data/constants';
import * as fragments from '@/lib/sanity/fragments';
import { mediaValidator, productCardValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

const collectionProductValidator = productCardValidator.extend({
  firstImage: z.union([z.literal('product'), z.literal('lifestyle')]),
  _id: z.string()
});

const collectionMoodValidator = mediaValidator;

export const collectionBaseValidator = z.object({
  id: z.string(),
  title: z.string(),
  productIds: z.array(z.string()),
  moods: z.array(collectionMoodValidator).optional(),
  descriptionShort: z.string().optional(),
  descriptionLong: z.string().optional(),
  pageBuilder: pageBuilderValidator.optional()
});

export const collectionProductsValidator = z.object({
  products: z.array(collectionProductValidator),
  hasNextPage: z.boolean()
});

export const collectionValidator = z.object({
  id: z.string(),
  title: z.string(),
  products: z.array(collectionProductValidator),
  descriptionShort: z.string().optional(),
  descriptionLong: z.string().optional(),
  pageBuilder: pageBuilderValidator.optional(),
  productCount: z.number(),
  hasNextPage: z.boolean(),
  moods: z.array(collectionMoodValidator).optional()
});

export type CollectionBasePayload = z.infer<typeof collectionBaseValidator>;
export type CollectionMood = z.infer<typeof collectionMoodValidator>;
export type CollectionProductPayload = z.infer<typeof collectionProductValidator>;
export type CollectionProductsPayload = z.infer<typeof collectionProductsValidator>;
export type Collection = z.infer<typeof collectionValidator>;

export function getCollectionBaseQuery({
  market,
  lang
}: {
  market: MarketValues;
  lang: LangValues;
}) {
  const query = groq`
    *[_type == "collection" && slug_${lang}.current == $slug][0]{
      "id": _id,
      "title": title.${lang},
      "productIds": products[].product._ref,
      "descriptionShort": descriptionShort.${lang},
      "descriptionLong": descriptionLong.${lang},
      moods[]{
        ${fragments.getMedia(lang)}
      },
    }
  `;

  return query;
}

// pageBuilder[]{
//   ${concatenatePageBuilderQueries({ market, lang })}
// }

export function getProductIdsByOrder(market: LangValues, sortKey: string | undefined) {
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

export function getCollectionProductData(market: LangValues, pageIndex: number = 1) {
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

export function getCollectionProductsQuery(lang: LangValues, pageIndex: number = 1) {
  const start = (pageIndex - 1) * COLLECTION_PAGE_SIZE;
  const end = pageIndex * COLLECTION_PAGE_SIZE;

  const query = groq`
    {
    "products": *[_type == "collection" && slug_${lang}.current == $slug][0].products[${start}...${end}]{
      firstImage,
      ...product->{
        defined($tagSlugs) && count((tags[]->slug_no.current)[@ in $tagSlugs]) == count($tagSlugs) => {
          ${fragments.getProductCard(lang)}
        },
        defined($tagSlugs) && !count((tags[]->slug_no.current)[@ in $tagSlugs]) == count($tagSlugs)=> null,
        !defined($tagSlugs) => {
          ${fragments.getProductCard(lang)}
        }
      }
    },
    "hasNextPage": count(*[_type == "collection" && slug_${lang}.current == $slug][0].products[${start + 1}...${end + 1}]) >= ${COLLECTION_PAGE_SIZE}
    }
  `;

  return query;
}

export function mergeCollectionBaseAndProducts(collection: any, products: any): Collection {
  // export function mergeCollectionBaseAndProducts(
  //   collection: CollectionBasePayload,
  //   products: CollectionProductsPayload
  // ): Collection {
  return {
    id: collection.id,
    title: collection.title,
    moods: collection.moods,
    descriptionShort: collection.descriptionShort,
    descriptionLong: collection.descriptionLong,
    pageBuilder: collection.pageBuilder,
    products: products.products,
    productCount: products.products.length || 0,
    hasNextPage: products.hasNextPage
  };
}
