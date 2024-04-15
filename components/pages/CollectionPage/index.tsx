import { CollectionLayout } from '@/components/pages/CollectionPage/CollectionLayout';
import { Collection } from '@/components/pages/CollectionPage/hooks';

export interface PageProps {
  data: Collection;
  currentPage: number;
}

export function CollectionPage({ data, currentPage }: PageProps) {
  return <CollectionLayout data={data} currentPage={currentPage} />;
}
