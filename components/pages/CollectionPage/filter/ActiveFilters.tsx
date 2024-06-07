'use client';

import { ActiveFilterGroupItem } from '@/components/pages/CollectionPage/filter/ActiveFilterGroupItem';
import { URL_STATE_KEYS } from '@/data/constants';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { SearchParamsKeysPayload } from '../hooks';

interface Props {
  className?: string;
  includedSearchParamsKeys: SearchParamsKeysPayload;
}

export function ActiveFilters({ className, includedSearchParamsKeys }: Props) {
  const searchParams = useSearchParams();
  const searchParamsKeys = searchParams.keys();
  const keys: string[] = [];
  for (const key of searchParamsKeys) {
    keys.push(key);
  }

  const urlStateKeys = Object.values(URL_STATE_KEYS);

  // Remove not valid keys
  const includedKeys = keys.filter((key) => includedSearchParamsKeys.includes(key));

  const filteredKeys = [...urlStateKeys, ...includedKeys];

  return (
    <div className={cn('flex items-center gap-x-1', className)}>
      {filteredKeys &&
        filteredKeys.map((key) => {
          return <ActiveFilterGroupItem key={key} parentKey={key} />;
        })}
    </div>
  );
}
