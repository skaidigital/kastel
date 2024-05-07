'use client';

import { Dictionary } from '@/app/dictionaries';
import {
  CollectionBasePayload,
  CollectionProductsPayload,
  collectionProductsValidator,
  mergeCollectionBaseAndProducts
} from '@/components/pages/CollectionPage/hooks';
import { LangValues, MarketValues, URL_STATE_KEYS } from '@/data/constants';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { CollectionLayout } from './CollectionLayout';
import { loadCollectionProductDataV2 } from './actions';

// validatedBase={validatedBase}
// slug={slug}
// market={market}
// lang={lang}

export interface PageProps {
  validatedBase: CollectionBasePayload;
  slug: string;
  market: MarketValues;
  lang: LangValues;
  dictionary: Dictionary['collection_page'];
}

export async function CollectionPage({ validatedBase, slug, market, lang, dictionary }: PageProps) {
  const paramValues = null;
  const sortKey = undefined;
  const currentPage = 1;
  const searchParams = undefined;
  const { data, error, isFetched } = useQuery({
    queryKey: ['collectionProducts', slug, lang],
    queryFn: () =>
      loadCollectionProductDataV2({ lang, market, slug, currentPage, sortKey, paramValues })
  });

  if (error) {
    console.error(error);
    return <h2>{error.message}</h2>;
  }

  console.log('data', data);

  if (!data) {
    return <h2>No products found</h2>;
  }

  const removeInvalidProducts = data.products.filter((product) => product._id);
  const productCount = removeInvalidProducts.length;

  const validatedProducts = collectionProductsValidator.safeParse(data);

  if (!validatedProducts.success) {
    console.error(validatedProducts.error);
    notFound();
  }

  // if (!isDraftMode) {
  //   validatedProducts = collectionProductsValidator.safeParse({
  //     products: cleanedProductData,
  //     hasNextPage: hasNextPage
  //   });

  //   if (!validatedProducts.success) {
  //     console.error(validatedProducts.error);
  //     notFound();
  //   }
  // }

  const mergedData = mergeCollectionBaseAndProducts(
    validatedBase,
    validatedProducts?.data,
    productCount
  );
  return (
    <>
      <CollectionLayout
        data={mergedData}
        currentPage={currentPage}
        searchParams={searchParams}
        market={market}
        lang={lang}
        dictionary={dictionary}
      />
    </>
  );
}

interface FormatParamsValuesProps {
  [key: string]: string | undefined;
}

function formatSearchParamsValues(search: FormatParamsValuesProps) {
  const exludeKeys = Object.values(URL_STATE_KEYS);
  const paramValues = search
    ? Object.entries(search)
        .filter(([key]) => !exludeKeys.includes(key))
        .flatMap(([_, value]) => value?.split(',') ?? [])
        .filter((value) => value !== undefined)
    : null;

  if (!paramValues || paramValues?.length === 0 || paramValues[0] === '') {
    return null;
  }
  return paramValues;
}

function cleanData(
  initialProducts: any,
  inititalProductsData: any,
  hasNextPage: boolean
): CollectionProductsPayload {
  const mergedTestData = initialProducts.map((product: any) => {
    const productData = inititalProductsData.data.find(
      (productData: any) => productData._id === product._id
    );

    return {
      ...product,
      ...productData,
      hasNextPage: hasNextPage
    };
  });

  const collectionProductsWithoutNullValues = nullToUndefined(mergedTestData);

  // const filteredCollectionProducts = collectionProductsWithoutNullValues.products.filter(
  //   (product: any) => Object.keys(product).length > 1
  // );

  return collectionProductsWithoutNullValues;
}
