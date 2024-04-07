'use client';

import { Dictionary } from '@/app/dictionaries';
import { ReccommendedProductsLayout } from '@/components/shared/ReccommendedProducts/ReccommendedProductsLayout';
import {
  ReccommendedProductPayload,
  getReccommendedProductsQuery
} from '@/components/shared/ReccommendedProducts/hooks';
import { MarketValues } from '@/data/constants';
import { useQuery } from '@/lib/sanity/loader/useQuery';
import { QueryResponseInitial } from '@sanity/react-loader/rsc';

function useReccommendedProducts(
  initial: QueryResponseInitial<ReccommendedProductPayload>,
  market: MarketValues
) {
  const query = getReccommendedProductsQuery(market);

  return useQuery<ReccommendedProductPayload>(query, {}, { initial });
}

interface Props {
  initial: Parameters<typeof useReccommendedProducts>[0];
  dictionary: Dictionary['reccommended_products'];
  market: MarketValues;
}

export default function ReccommendedProductsPreview({ initial, dictionary, market }: Props) {
  const { data } = useReccommendedProducts(initial, market);

  return <ReccommendedProductsLayout data={data!} dictionary={dictionary} />;
}
