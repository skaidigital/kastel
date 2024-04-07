import { PagePayload } from '@/components/pages/PageLayout/hooks';
import { PageBuilder } from '@/components/shared/PageBuilder';
import { MarketValues } from '@/data/constants';
import { EncodeDataAttributeCallback } from '@sanity/react-loader';

export interface PageProps {
  data: PagePayload;
  encodeDataAttribute?: EncodeDataAttributeCallback;
  market: MarketValues;
}

export function PageLayout({ data, encodeDataAttribute, market }: PageProps) {
  return (
    <>
      {data?.pageBuilder?.map((block, index: number) => (
        <PageBuilder
          key={block.key}
          data={block}
          index={index}
          encodeDataAttribute={encodeDataAttribute}
          market={market}
        />
      ))}
    </>
  );
}
