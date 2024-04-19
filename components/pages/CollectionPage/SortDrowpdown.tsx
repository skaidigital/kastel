'use client';

import { Select, SelectContent, SelectItem, SelectValue } from '@/components/form/RadixSelect';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { SelectTrigger } from '@radix-ui/react-select';
import { useRouter } from 'next/navigation';
import { parseAsString, useQueryState } from 'nuqs';

const sortOptions = [
  {
    label: 'Recommended',
    value: 'recommended'
  },
  {
    label: 'Price (Low)',
    value: 'price_lowest'
  },
  {
    label: 'Price (High)',
    value: 'price_highest'
  },
  {
    label: 'Newest',
    value: 'newest'
  }
];

export function SortDropdown() {
  const router = useRouter();
  const [sort, setSort] = useQueryState('sort', parseAsString);

  function handleChange(e: string) {
    setSort(e).then(() => router.refresh());
  }

  return (
    <div className="w-40 rounded-sm border-2 bg-brand-light-grey text-center text-brand-mid-grey">
      <Select
        onValueChange={(e) => {
          handleChange(e);
        }}
        defaultValue={sort || undefined}
      >
        <SelectTrigger className="flex w-full items-center justify-between space-x-1 px-4 py-2.5">
          <SelectValue placeholder={sortOptions[0]?.label} className="w-full" />
          <ChevronDownIcon className="h-4 w-4" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions &&
            sortOptions.map((option) => (
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
