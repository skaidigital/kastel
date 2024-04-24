'use client';

import { PageLayout } from '@/components/pages/PageLayout';
import { PagePayload, getPageQuery } from '@/components/pages/PageLayout/hooks';
import { LangValues, MarketValues } from '@/data/constants';
import { QueryResponseInitial, useQuery } from '@sanity/react-loader';

export default function PagePreview({
  initial,
  market,
  lang
}: {
  initial: QueryResponseInitial<PagePayload | null>;
  market: MarketValues;
  lang: LangValues;
}) {
  const query = getPageQuery({ market, lang });

  const { data } = useQuery<PagePayload | null>(query, { slug: 'home' }, { initial });

  if (!data) {
    return <div className="bg-red-100">No posts found</div>;
  }

  return <PageLayout data={data} market={market} lang={lang} />;
}
