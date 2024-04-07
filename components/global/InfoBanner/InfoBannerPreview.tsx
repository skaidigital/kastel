'use client';

import { InfoBannerLayout } from '@/components/global/InfoBanner/InfoBannerLayout';
import { InfoBannerPayload, getInfoBannerQuery } from '@/components/global/InfoBanner/hooks';
import { MarketValues } from '@/data/constants';
import { useQuery, type QueryResponseInitial } from '@sanity/react-loader';

function useInfoBanner(initial: QueryResponseInitial<InfoBannerPayload>, market: MarketValues) {
  const query = getInfoBannerQuery(market);

  return useQuery<InfoBannerPayload>(query, {}, { initial });
}

interface Props {
  initial: Parameters<typeof useInfoBanner>[0];
  market: MarketValues;
}

export default function InfoBannerPreview({ initial, market }: Props) {
  const { data } = useInfoBanner(initial, market);

  return <InfoBannerLayout data={data!} />;
}
