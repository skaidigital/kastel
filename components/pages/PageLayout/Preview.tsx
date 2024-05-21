'use client';

import { PageLayout } from '@/components/pages/PageLayout';
import { PagePayload, getPageQuery } from '@/components/pages/PageLayout/hooks';
import { LangValues, MarketValues } from '@/data/constants';
import { useLiveQuery } from 'next-sanity/preview';

interface Props {
  page: PagePayload;
  market: MarketValues;
  lang: LangValues;
  slug: string;
}

export function PagePreview({ page, market, lang, slug }: Props) {
  const query = getPageQuery({ lang, market });

  const [data] = useLiveQuery<PagePayload>(page, query, { slug });

  return <PageLayout data={data} market={market} lang={lang} />;
}
