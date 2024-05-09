import { FilterSheet } from '@/components/FilterSheet';
import { SortSheet } from '@/components/SortSheet';
import { CollectionActionsBarSettings } from '@/components/pages/CollectionPage/ActionsBarMobile/Settings';
import { LangValues, MarketValues } from '@/data/constants';
import { cn } from '@/lib/utils';

interface Props {
  market: MarketValues;
  lang: LangValues;
  className?: string;
  collectionSlug?: string;
  searchGids?: string[];
}

export function CollectionActionsBarMobile({
  market,
  lang,
  className,
  collectionSlug,
  searchGids
}: Props) {
  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 z-30 flex w-full divide-x divide-brand-light-grey border-t border-brand-light-grey',
        className
      )}
    >
      <FilterSheet
        market={market}
        lang={lang}
        collectionSlug={collectionSlug}
        searchGids={searchGids}
      />
      <SortSheet lang={lang} />
      <CollectionActionsBarSettings lang={lang} />
    </div>
  );
}
