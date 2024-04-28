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
          ${fragments.productsInTag}{
            _id,
            _createdAt,
            "minPrice" : minVariantPrice_no.amount,
            "maxPrice": maxVariantPrice_no.amount
          },
          ${fragments.productsNotInTag},
          ${fragments.productsWithoutTags} {
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

export function getCollectionProductData(lang: LangValues, market: MarketValues) {
  const query = groq`
    *[_type == "product" && _id in $ids && defined(slug_${market}.current) && status_${market} == "ACTIVE"][]{
      _id,
    ${fragments.getProductCard(lang, market)}
  }
  `;

  return query;
}

export function getCollectionProductsQuery(
  lang: LangValues,
  market: MarketValues,
  pageIndex: number = 1
) {
  const start = (pageIndex - 1) * COLLECTION_PAGE_SIZE;
  const end = pageIndex * COLLECTION_PAGE_SIZE;

  const query = groq`
    {
    "products": *[_type == "collection" && slug_${lang}.current == $slug][0].products[${start}...${end}]{
      firstImage,
      ...product->{
        ${fragments.productsInTag} => {
          ${fragments.getProductCard(lang, market)}
        },
        ${fragments.productsNotInTag} => null,
        ${fragments.productsWithoutTags} => {
          ${fragments.getProductCard(lang, market)}
        }
      }
    },
    "hasNextPage": count(*[_type == "collection" && slug_${lang}.current == $slug][0].products[${start + 1}...${end + 1}]) >= ${COLLECTION_PAGE_SIZE}
    }
  `;

  return query;
}

export function mergeCollectionBaseAndProducts(
  collection: any,
  products: any,
  productCount: number
): Collection {
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
    productCount: productCount || 0,
    hasNextPage: products.hasNextPage
  };
}
