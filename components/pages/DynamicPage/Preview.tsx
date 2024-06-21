'use client';

import { DynamicPage } from '@/components/pages/DynamicPage';
import { PagePayload, getPageQuery } from '@/components/pages/DynamicPage/hooks';
import { LangValues, MarketValues } from '@/data/constants';
import { QueryResponseInitial, useQuery } from '@sanity/react-loader';

interface Props {
  initial: QueryResponseInitial<PagePayload | null>;
  market: MarketValues;
  lang: LangValues;
}

export function PagePreview({ initial, market, lang }: Props) {
  const query = getPageQuery({ market, lang });

  const { data } = useQuery<PagePayload | null>(query, {}, { initial });

  if (!data) return null;

  return <DynamicPage data={data} market={market} lang={lang} />;
}
