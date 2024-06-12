'use server';

import { COLLECTION_PAGE_SIZE, LangValues, MarketValues } from '@/data/constants';
import { loadQuery } from '@/lib/sanity/storeServer';
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
  const initialProducts = await loadCollectionProductsOrder(
    slug,
    lang,
    paramValues,
    onSale,
    sortKey
  );

  const removeInvalidProducts = initialProducts.data.products.filter((product) => product._id);
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
