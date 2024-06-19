'use server';

import { COLLECTION_PAGE_SIZE, LangValues, MarketValues } from '@/data/constants';
import { loadQuery } from '@/lib/sanity/storeServer';
import { getProductsFromShopifyByGids } from '@/lib/shopify/queries';
import {
  CollectionProductsPayload,
  cleanData,
  getCollectionProductData,
  getProductIdsByOrder
} from './hooks';

interface SanityQueryProps<T> {
  data: T;
}

export async function loadCollectionProductsOrder(
  slug: string,
  lang: LangValues,
  tagSlugs: string[] | null,
  onSale: boolean,
  sortKey?: string
) {
  const query = getProductIdsByOrder(lang, onSale, sortKey);

  return loadQuery<SanityQueryProps<CollectionProductsPayload>>(query, { slug, tagSlugs });
}

export async function loadCollectionProductData(
  lang: LangValues,
  market: MarketValues,
  productIds: string[],
  pageIndex: number,
  slug: string,
  sortKey?: string
) {
  const query = getCollectionProductData(lang, market);

  return loadQuery<SanityQueryProps<CollectionProductsPayload>>(
    query,
    { ids: productIds },
    { next: { tags: [`collection:${slug}`, `pageIndex:${pageIndex}`, `${sortKey}`] } }
  );
}

async function isProductsInStock(productIds: string[]) {
  const data = await getProductsFromShopifyByGids(productIds);
  return data;
}

interface CollectionProductDataProps {
  lang: LangValues;
  market: MarketValues;
  slug: string;
  currentPage: number;
  sortKey?: string;
  paramValues: string[] | null;
  onSale: boolean;
}

export async function loadCollectionProductDataV2({
  lang,
  market,
  slug,
  currentPage,
  sortKey,
  paramValues,
  onSale
}: CollectionProductDataProps) {
  console.log(paramValues);

  const initialProducts = await loadCollectionProductsOrder(
    slug,
    lang,
    paramValues,
    onSale,
    sortKey
  );

  console.log(initialProducts);

  const removeInvalidProducts = initialProducts.data.products.filter((product) => product._id);
  const gids = removeInvalidProducts.map((product) => product.gid);
  console.log(gids);

  const productStockData = await isProductsInStock(gids);

  // Filter out products that are not in stock
  console.log(productStockData);

  //

  const currentStart = (currentPage - 1) * COLLECTION_PAGE_SIZE;
  const currentEnd = currentPage * COLLECTION_PAGE_SIZE;
  const paginatedInitialProducts = removeInvalidProducts.slice(currentStart, currentEnd);
  const paginatedProductIds = paginatedInitialProducts.map((product) => product._id);
  const hasNextPage = removeInvalidProducts.length > currentEnd;

  const inititalProductsData = await loadCollectionProductData(
    lang,
    market,
    paginatedProductIds,
    currentPage,
    slug,
    sortKey
  );

  const cleanedProductData = cleanData(paginatedInitialProducts, inititalProductsData, hasNextPage);

  return cleanedProductData;
}
