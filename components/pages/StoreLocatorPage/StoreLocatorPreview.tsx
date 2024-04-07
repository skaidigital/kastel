'use client';

import { StoreLocatorLayout } from '@/components/pages/StoreLocatorPage/StoreLocatorLayout';
import {
  StoreLocatorPayload,
  getStoreLocatorQuery
} from '@/components/pages/StoreLocatorPage/hooks';
import { MarketValues } from '@/data/constants';
import { useQuery } from '@/lib/sanity/loader/useQuery';
import { QueryResponseInitial } from '@sanity/react-loader/rsc';

function useStoreLocator(initial: QueryResponseInitial<StoreLocatorPayload>, market: MarketValues) {
  const query = getStoreLocatorQuery(market);
  return useQuery<StoreLocatorPayload>(query, {}, { initial });
}

interface Props {
  initial: Parameters<typeof useStoreLocator>[0];
  market: MarketValues;
}

export default function StoreLocatorPreview({ initial, market }: Props) {
  const { data, encodeDataAttribute } = useStoreLocator(initial, market);

  return <StoreLocatorLayout data={data!} encodeDataAttribute={encodeDataAttribute} />;
}
