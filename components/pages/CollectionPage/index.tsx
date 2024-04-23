import { getDictionary } from '@/app/dictionaries';
import { CollectionLayout } from '@/components/pages/CollectionPage/CollectionLayout';
import { Collection } from '@/components/pages/CollectionPage/hooks';
import { LangValues, MarketValues } from '@/data/constants';

export interface PageProps {
  data: Collection;
  currentPage: number;
  searchParams?: {
    [key: string]: string | undefined;
  };
  market: MarketValues;
  lang: LangValues;
}

export async function CollectionPage({ data, currentPage, searchParams, market, lang }: PageProps) {
  const { collection_page } = await getDictionary();
  return (
    <>
      <CollectionLayout
        data={data}
        currentPage={currentPage}
        searchParams={searchParams}
        market={market}
        lang={lang}
        dictionary={collection_page}
      />
    </>
  );
}
