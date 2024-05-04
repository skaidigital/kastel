'use client';

import { Select, SelectContent, SelectItem, SelectValue } from '@/components/Select';
import { LangValues } from '@/data/constants';
import { getSortOptions } from '@/lib/utils';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { SelectTrigger } from '@radix-ui/react-select';
import { useRouter } from 'next/navigation';
import { parseAsString, useQueryState } from 'nuqs';

interface Props {
  lang: LangValues;
}

export function Sort({ lang }: Props) {
  const router = useRouter();
  const [sort, setSort] = useQueryState('sort', parseAsString);

  function handleChange(e: string) {
    setSort(e).then(() => router.refresh());
  }

  const sortOptions = getSortOptions(lang);

  return (
    <div className="w-40 rounded-[2px] bg-brand-light-grey text-center text-brand-mid-grey">
      <Select
        onValueChange={(e) => {
          handleChange(e);
        }}
        defaultValue={sort || sortOptions[0]?.value}
      >
        <SelectTrigger className="flex w-full items-center justify-between space-x-1 px-4 py-2.5 text-sm">
          <SelectValue placeholder={sort || 'Loading'} />
          <ChevronDownIcon className="size-4" />
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
                {option.title}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
