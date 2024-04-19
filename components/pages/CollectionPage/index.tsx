import { getDictionary } from '@/app/dictionaries';
import { CollectionLayout } from '@/components/pages/CollectionPage/CollectionLayout';
import { Collection } from '@/components/pages/CollectionPage/hooks';
import { Filter } from './filter';

export interface PageProps {
  data: Collection;
  currentPage: number;
  searchParams?: {
    [key: string]: string | undefined;
  };
}

export async function CollectionPage({ data, currentPage, searchParams }: PageProps) {
  const { collection_page } = await getDictionary();
  return (
    <>
      <Filter />
      <CollectionLayout
        data={data}
        currentPage={currentPage}
        searchParams={searchParams}
        dictionary={collection_page}
      />
    </>
  );
}
