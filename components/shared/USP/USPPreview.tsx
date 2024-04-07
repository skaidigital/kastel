'use client';

import { USPLayout } from '@/components/shared/USP/USPLayout';
import { USPPayload, getUSPQuery } from '@/components/shared/USP/hooks';
import { MarketValues } from '@/data/constants';
import { useQuery, type QueryResponseInitial } from '@sanity/react-loader';

function useUSP(initial: QueryResponseInitial<USPPayload>, market: MarketValues) {
  const query = getUSPQuery(market);

  return useQuery<USPPayload>(query, {}, { initial });
}

interface Props {
  initial: Parameters<typeof useUSP>[0];
  market: MarketValues;
}

export default function USPPreview({ initial, market }: Props) {
  const { data, encodeDataAttribute } = useUSP(initial, market);

  return <USPLayout data={data!} encodeDataAttribute={encodeDataAttribute} />;
}
