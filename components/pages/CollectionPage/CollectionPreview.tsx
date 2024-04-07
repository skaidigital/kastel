'use client';

import { CollectionPage } from '@/components/pages/CollectionPage';
import {
  CollectionBasePayload,
  CollectionProductsPayload,
  getCollectionProductsQuery,
  mergeCollectionBaseAndProducts
} from '@/components/pages/CollectionPage/hooks';
import { MarketValues } from '@/data/constants';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { useQuery, type QueryResponseInitial } from '@sanity/react-loader';

interface Props {
  params: { slug: string };
  initialBase: QueryResponseInitial<CollectionBasePayload | null>;
  intialProducts: QueryResponseInitial<CollectionProductsPayload | null>;
  market: MarketValues;
  currentPage: number;
}

export default function CollectionPreview({
  params,
  initialBase,
  intialProducts,
  market,
  currentPage
}: Props) {
  const baseQuery = getCollectionProductsQuery(market, currentPage);
  const productsQuery = getCollectionProductsQuery(market, currentPage);

  const { data: baseData } = useQuery<CollectionBasePayload | null>(baseQuery, params, {
    initial: initialBase
  });
  const { data: productData, encodeDataAttribute } = useQuery<CollectionProductsPayload | null>(
    productsQuery,
    params,
    {
      initial: intialProducts
    }
  );

  const collectionBaseWithoutNullValues = nullToUndefined(baseData);
  const collectionProductsWithoutNullValues = nullToUndefined(productData);

  if (!baseData || !productData) return null;

  const mergedData = mergeCollectionBaseAndProducts(
    collectionBaseWithoutNullValues,
    collectionProductsWithoutNullValues
  );

  return (
    <CollectionPage
      data={mergedData}
      currentPage={currentPage}
      encodeDataAttribute={encodeDataAttribute}
    />
  );
}
