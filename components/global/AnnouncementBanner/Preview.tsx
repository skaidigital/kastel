'use client';

import { AnnouncementBannerLayout } from '@/components/global/AnnouncementBanner/Layout';
import {
  AnnouncementBannerPayload,
  getAnnouncementBannerQuery
} from '@/components/global/AnnouncementBanner/hooks';
import { MarketValues } from '@/data/constants';
import { useQuery, type QueryResponseInitial } from '@sanity/react-loader';

function useAnnouncementBanner(
  initial: QueryResponseInitial<AnnouncementBannerPayload>,
  market: MarketValues
) {
  const query = getAnnouncementBannerQuery(market);

  return useQuery<AnnouncementBannerPayload>(query, {}, { initial });
}

interface Props {
  initial: Parameters<typeof useAnnouncementBanner>[0];
  market: MarketValues;
}

export default function AnnouncementBannerPreview({ initial, market }: Props) {
  const { data } = useAnnouncementBanner(initial, market);

  return <AnnouncementBannerLayout data={data!} />;
}
