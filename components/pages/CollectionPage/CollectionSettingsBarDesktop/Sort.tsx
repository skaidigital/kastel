'use client';

import { Select, SelectContent, SelectItem, SelectValue } from '@/components/form/RadixSelect';
import { SORT_OPTIONS } from '@/data/constants';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { SelectTrigger } from '@radix-ui/react-select';
import { useRouter } from 'next/navigation';
import { parseAsString, useQueryState } from 'nuqs';

export function Sort() {
  const router = useRouter();
  const [sort, setSort] = useQueryState('sort', parseAsString);

  function handleChange(e: string) {
    setSort(e).then(() => router.refresh());
  }

  return (
    <div className="w-40 rounded-[2px] bg-brand-light-grey text-center text-brand-mid-grey">
      <Select
        onValueChange={(e) => {
          handleChange(e);
        }}
        defaultValue={sort || SORT_OPTIONS[0]?.value}
      >
        <SelectTrigger className="flex w-full items-center justify-between space-x-1 px-4 py-2.5 text-sm">
          <SelectValue placeholder={SORT_OPTIONS[0]?.label || 'Loading'} />
          <ChevronDownIcon className="size-4" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS &&
            SORT_OPTIONS.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                defaultChecked={option.value === sort}
                className="w-full"
              >
                {option.label}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
