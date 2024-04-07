import { CollectionLayout } from '@/components/pages/CollectionPage/CollectionLayout';
import { Collection } from '@/components/pages/CollectionPage/hooks';
import { EncodeDataAttributeCallback } from '@sanity/react-loader';

export interface PageProps {
  data: Collection;
  currentPage: number;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}

export function CollectionPage({ data, currentPage, encodeDataAttribute }: PageProps) {
  return (
    <CollectionLayout
      data={data}
      currentPage={currentPage}
      encodedDataAttribute={encodeDataAttribute}
    />
  );
}
