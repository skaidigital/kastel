'use client';

import { RadioGroup, RadioGroupItem } from '@/components/RadioGroup';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/Sheet';
import { Text } from '@/components/base/Text';
import { LangValues, SORT_OPTIONS } from '@/data/constants';
import { cn } from '@/lib/utils';
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

  const sortValue = sort || SORT_OPTIONS[0]?.value;
  const sortString = getSortString(lang);

  return (
    <Sheet>
      <Text size="sm" asChild className="font-medium">
        <SheetTrigger className="flex flex-1 items-center justify-center bg-white py-4">
          {sortString}
        </SheetTrigger>
      </Text>
      <SheetContent>
        <SheetHeader title={sortString} />
        <RadioGroup
          onValueChange={(e) => {
            handleChange(e);
          }}
          defaultValue={sort || SORT_OPTIONS[0]?.value}
          className="gap-y-4"
        >
          {SORT_OPTIONS.map((option) => {
            const isChecked = option.value === sortValue;
            return (
              <Text
                key={option.value}
                size="sm"
                asChild
                className="flex items-center justify-between gap-x-2"
              >
                <label
                  htmlFor={option.value}
                  className={cn(!isChecked ? 'text-brand-mid-grey' : '')}
                >
                  {option.label}
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="text-brand-primary"
                  >
                    {option.label}
                  </RadioGroupItem>
                </label>
              </Text>
            );
          })}
        </RadioGroup>
      </SheetContent>
    </Sheet>
  );
}

function getSortString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Sort';
    case 'no':
      return 'Sorter';
    default:
      return 'Sort';
  }
}
