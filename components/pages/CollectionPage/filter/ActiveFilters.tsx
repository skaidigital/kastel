'use client';

import { ActiveFilterGroupItem } from '@/components/pages/CollectionPage/filter/ActiveFilterGroupItem';
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

  // Remove not valid keys
  const filteredKeys = keys.filter((key) => includedSearchParamsKeys.includes(key));

  return (
    <div className={cn('flex items-center gap-x-1', className)}>
      {filteredKeys &&
        filteredKeys.map((key) => {
          return <ActiveFilterGroupItem key={key} parentKey={key} />;
        })}
    </div>
  );
}
