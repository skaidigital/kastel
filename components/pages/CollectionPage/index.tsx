'use client';

import { Dictionary } from '@/app/dictionaries';
import { useCollectionContext } from '@/components/pages/CollectionPage/Context';
import { CollectionProductsLoadingState } from '@/components/pages/CollectionPage/LoadingState';
import {
  CollectionBasePayload,
  SearchParamsKeysPayload,
  collectionProductsValidator
} from '@/components/pages/CollectionPage/hooks';
import { LangValues, MarketValues, URL_STATE_KEYS } from '@/data/constants';
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
  includedSearchParamsKeys: SearchParamsKeysPayload;
}

export function CollectionPage({
  slug,
  market,
  lang,
  dictionary,
  moods,
  pageCount,
  includedSearchParamsKeys
}: PageProps) {
  const searchParams = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());

  const paramValues = formatSearchParamsValues(paramsObject, includedSearchParamsKeys);
  const { setNumberOfProducts } = useCollectionContext();

  const sortKey = paramsObject?.sort;
  const onSale = paramsObject?.on_sale ? true : false;

  const prioritizedSortkey = onSale ? 'on_sale' : sortKey;
  const currentPage = Number(searchParams.get('page')) || 1;

  const collectionFechData = {
    lang,
    market,
    slug,
    currentPage,
    sortKey,
    onSale,
    paramsObject
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['collectionProducts', slug, lang, market, currentPage, sortKey, paramValues, onSale],
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

function formatSearchParamsValues(
  search: FormatParamsValuesProps,
  includedSearchParamsKeys: SearchParamsKeysPayload
) {
  const excludeParams = Object.values(URL_STATE_KEYS);

  const paramValues = search
    ? Object.entries(search)
        .filter(([key]) => includedSearchParamsKeys.includes(key))
        .filter(([key]) => !excludeParams.includes(key))
        .flatMap(([_, value]) => value?.split(',') ?? [])
        .filter((value) => value !== undefined)
    : null;

  if (!paramValues || paramValues?.length === 0 || paramValues[0] === '') {
    return null;
  }
  return paramValues;
}
