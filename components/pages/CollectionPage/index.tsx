'use client';

import { Dictionary } from '@/app/dictionaries';
import { useCollectionContext } from '@/components/pages/CollectionPage/Context';
import { CollectionProductsLoadingState } from '@/components/pages/CollectionPage/LoadingState';
import {
  CollectionBasePayload,
  CollectionProductsPayload,
  collectionProductsValidator
} from '@/components/pages/CollectionPage/hooks';
import { LangValues, MarketValues, URL_STATE_KEYS } from '@/data/constants';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { useQuery } from '@tanstack/react-query';
import { notFound, useSearchParams } from 'next/navigation';
import { CollectionLayout } from './CollectionLayout';
import { loadCollectionProductDataV2 } from './actions';

export interface PageProps {
  moods: CollectionBasePayload['moods'];
  slug: string;
  market: MarketValues;
  lang: LangValues;
  dictionary: Dictionary['collection_page'];
  pageCount: number;
}

export function CollectionPage({ slug, market, lang, dictionary, moods, pageCount }: PageProps) {
  const searchParams = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());

  const paramValues = formatSearchParamsValues(paramsObject);
  const { setNumberOfProducts } = useCollectionContext();

  const sortKey = paramsObject?.sort;
  const saleKey = paramsObject?.on_sale;

  const prioritizedSortkey = saleKey ? 'on_sale' : sortKey;
  const currentPage = Number(searchParams.get('page')) || 1;

  const collectionFechData = {
    lang,
    market,
    slug,
    currentPage,
    sortKey: prioritizedSortkey,
    paramValues
  };

  const { data, error, isLoading } = useQuery({
    queryKey: [
      'collectionProducts',
      slug,
      lang,
      market,
      currentPage,
      prioritizedSortkey,
      paramValues
    ],
    queryFn: () => loadCollectionProductDataV2(collectionFechData),
    placeholderData: (prev) => prev
  });

  if (error) {
    console.error(error);
    return null;
  }

  if (isLoading) return <CollectionProductsLoadingState />;

  if (data) {
    const removeInvalidProducts = data?.products.filter((product) => product._id);
    const productCount = removeInvalidProducts?.length || 0;
    setNumberOfProducts(productCount);

    const validatedProducts = collectionProductsValidator.safeParse(data);

    if (!validatedProducts.success) {
      console.error(validatedProducts.error);
      notFound();
    }

    return (
      <>
        <CollectionLayout
          data={validatedProducts.data}
          productCount={productCount}
          moods={moods}
          currentPage={currentPage}
          dictionary={dictionary}
          pageCount={pageCount}
        />
      </>
    );
  }
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
