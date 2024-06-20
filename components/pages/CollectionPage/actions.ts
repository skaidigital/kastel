'use server';

import { COLLECTION_PAGE_SIZE, LangValues, MarketValues } from '@/data/constants';
import { loadQuery } from '@/lib/sanity/storeServer';
import { getProductsFromShopifyByGids } from '@/lib/shopify/queries';
import {
  CollectionProductPayload,
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
  onSale: boolean,
  sortKey?: string,
  paramsObject?: {
    [k: string]: string;
  }
) {
  const query = getProductIdsByOrder(lang, onSale, sortKey, paramsObject);

  return loadQuery<SanityQueryProps<CollectionProductsPayload>>(query, { slug });
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
  onSale: boolean;
  paramsObject?: {
    [k: string]: string;
  };
}

export async function loadCollectionProductDataV2({
  lang,
  market,
  slug,
  currentPage,
  sortKey,
  onSale,
  paramsObject
}: CollectionProductDataProps) {
  const initialProducts = await loadCollectionProductsOrder(
    slug,
    lang,
    onSale,
    sortKey,
    paramsObject
  );

  const removeInvalidProducts = initialProducts.data.products.filter((product) => product._id);

  const filteredProducts = await handleFiltration(removeInvalidProducts, paramsObject);

  const currentStart = (currentPage - 1) * COLLECTION_PAGE_SIZE;
  const currentEnd = currentPage * COLLECTION_PAGE_SIZE;
  // const paginatedInitialProducts = removeInvalidProducts.slice(currentStart, currentEnd);

  const paginatedInitialProducts = filteredProducts.slice(currentStart, currentEnd);
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

async function handleFiltration(
  products: CollectionProductPayload[],
  paramValues?: { [k: string]: string }
) {
  if (!paramValues || Object.keys(paramValues).length === 0) {
    return products;
  }

  const gids = products.map((product) => product.gid);
  const productStockData: any = await isProductsInStock(gids);

  // get keys from paramValues
  const keys = Object.keys(paramValues);

  const sizeUrlKey = ['sizes', 'storrelser'];
  // remove out of stock products
  const filteredProducts = products.filter((product) => {
    const foundItems = productStockData.products.nodes.filter((p: any) => p.id === product.gid);

    if (!foundItems || foundItems.length === 0) {
      return false;
    }

    const foundItem = foundItems[0];

    const shouldCheckVariantLevel = keys.some((key) => sizeUrlKey.includes(key));

    if (shouldCheckVariantLevel) {
      let sizeValue: string | undefined;

      // Find the size value from paramValues
      for (const key of keys) {
        if (sizeUrlKey.includes(key)) {
          sizeValue = paramValues[key];
          break;
        }
      }

      if (sizeValue) {
        // Find the correct variant with the specified size
        const variantAvailable = foundItem.variants.nodes.some((variant: any) => {
          return (
            variant.selectedOptions.some(
              (option: any) => option.name === 'Size' && option.value === sizeValue
            ) && variant.availableForSale
          );
        });

        return variantAvailable;
      }
    }

    return foundItem.totalInventory > 0;
  });

  return filteredProducts;
}
