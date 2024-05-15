'use client';

import { ActiveFilterGroupItem } from '@/components/pages/CollectionPage/filter/ActiveFilterGroupItem';
import { EXCLUDED_COLLECTION_SEARCH_PARAMS, URL_STATE_KEYS } from '@/data/constants';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

interface Props {
  className?: string;
}

export function ActiveFilters({ className }: Props) {
  const searchParams = useSearchParams();
  const searchParamsKeys = searchParams.keys();
  const keys: string[] = [];
  for (const key of searchParamsKeys) {
    keys.push(key);
  }

  const urlStateKeys = Object.values(URL_STATE_KEYS);
  const excludedCollectionSearchParams = EXCLUDED_COLLECTION_SEARCH_PARAMS;
  const excludedKeys = [...urlStateKeys, ...excludedCollectionSearchParams];

  // remove keys that are not filters
  // const filteredKeys = keys.filter((key) => !Object.values(URL_STATE_KEYS).includes(key));
  const filteredKeys = keys.filter((key) => !excludedKeys.includes(key));

  // filteredKeys.push(URL_STATE_KEYS.onSale);

  return (
    <div className={cn('flex items-center gap-x-1', className)}>
      {filteredKeys &&
        filteredKeys.map((key) => {
          return <ActiveFilterGroupItem key={key} parentKey={key} />;
        })}
    </div>
  );
}
