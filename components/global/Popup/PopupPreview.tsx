'use client';

import { PopupLayout } from '@/components/global/Popup/PopupLayout';
import { PopupPayload, getPopupQuery } from '@/components/global/Popup/hooks';
import { MarketValues } from '@/data/constants';
import { useQuery } from '@/lib/sanity/loader/useQuery';
import { QueryResponseInitial } from '@sanity/react-loader/rsc';

function usePopup(initial: QueryResponseInitial<PopupPayload>, market: MarketValues) {
  const query = getPopupQuery(market);

  return useQuery<PopupPayload>(query, {}, { initial });
}

interface Props {
  initial: Parameters<typeof usePopup>[0];
  market: MarketValues;
}

export default function PopupPreview({ initial, market }: Props) {
  const { data, encodeDataAttribute } = usePopup(initial, market);

  return <PopupLayout data={data!} encodeDataAttribute={encodeDataAttribute} />;
}
