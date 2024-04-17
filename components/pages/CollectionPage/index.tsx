import { CollectionLayout } from '@/components/pages/CollectionPage/CollectionLayout';
import { Collection } from '@/components/pages/CollectionPage/hooks';
import { Filter } from './filter';

export interface PageProps {
  data: Collection;
  currentPage: number;
}

export function CollectionPage({ data, currentPage }: PageProps) {
  return (
    <>
      <Filter />
      <CollectionLayout data={data} currentPage={currentPage} />
    </>
  );
}
