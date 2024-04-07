'use client';

import { PageLayout } from '@/components/pages/PageLayout';
import { PagePayload, getPageQuery } from '@/components/pages/PageLayout/hooks';
import { MarketValues } from '@/data/constants';
import { useQuery, type QueryResponseInitial } from '@sanity/react-loader';
import { QueryParams } from 'next-sanity';

interface Props {
  market: MarketValues;
  initial: QueryResponseInitial<PagePayload | null>;
  params: QueryParams;
}

export default function PagePreview({ market, initial, params }: Props) {
  const query = getPageQuery(market);

  const { data, encodeDataAttribute } = useQuery<PagePayload | null>(query, params, { initial });

  if (!data) return <div>no data</div>;

  return <PageLayout data={data} encodeDataAttribute={encodeDataAttribute} market={market} />;
}
