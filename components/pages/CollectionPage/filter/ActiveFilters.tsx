'use client';

import { ActiveFilterGroupItem } from '@/components/pages/CollectionPage/filter/ActiveFilterGroupItem';
import { URL_STATE_KEYS } from '@/data/constants';
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

  // remove keys that are not filters
  const filteredKeys = keys.filter((key) => !Object.values(URL_STATE_KEYS).includes(key));
  filteredKeys.push(URL_STATE_KEYS.onSale);

  return (
    <div className={cn('flex items-center gap-x-1', className)}>
      {filteredKeys &&
        filteredKeys.map((key) => {
          return <ActiveFilterGroupItem key={key} parentKey={key} />;
        })}
    </div>
  );
}
