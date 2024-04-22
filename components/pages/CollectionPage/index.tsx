import { getDictionary } from '@/app/dictionaries';
import { CollectionLayout } from '@/components/pages/CollectionPage/CollectionLayout';
import { Collection } from '@/components/pages/CollectionPage/hooks';
import { LangValues } from '@/data/constants';

export interface PageProps {
  data: Collection;
  currentPage: number;
  searchParams?: {
    [key: string]: string | undefined;
  };
  lang: LangValues;
}

export async function CollectionPage({ data, currentPage, searchParams, lang }: PageProps) {
  const { collection_page } = await getDictionary();
  return (
    <>
      <CollectionLayout
        data={data}
        currentPage={currentPage}
        searchParams={searchParams}
        lang={lang}
        dictionary={collection_page}
      />
    </>
  );
}
