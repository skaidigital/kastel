'use client';

import { Dictionary } from '@/app/dictionaries';
import { FooterLayout } from '@/components/global/Footer/FooterLayout';
import { FooterPayload, getFooterQuery } from '@/components/global/Footer/hooks';
import { MarketValues } from '@/data/constants';
import { useQuery, type QueryResponseInitial } from '@sanity/react-loader';

function useFooter(initial: QueryResponseInitial<FooterPayload>, market: MarketValues) {
  const query = getFooterQuery(market);

  return useQuery<FooterPayload>(query, {}, { initial });
}

interface Props {
  initial: Parameters<typeof useFooter>[0];
  market: MarketValues;
  dictionary: Dictionary['footer'];
}

export default function FooterPreview({ initial, market, dictionary }: Props) {
  const { data } = useFooter(initial, market);

  return <FooterLayout data={data!} dictionary={dictionary} market={market} />;
}
