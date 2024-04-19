import { PagePayload } from '@/components/pages/PageLayout/hooks';
import { PageBuilder } from '@/components/shared/PageBuilder';
import { LangValues, MarketValues } from '@/data/constants';

export interface PageProps {
  data: PagePayload;
  market: MarketValues;
  lang: LangValues;
}

export function PageLayout({ data, market, lang }: PageProps) {
  return (
    <>
      {data?.pageBuilder?.map((block, index: number) => (
        <PageBuilder
          key={block.key}
          data={block}
          index={index}
          market={market}
          lang={lang}
          pageId={data.id}
          pageType={data.type}
        />
      ))}
    </>
  );
}
