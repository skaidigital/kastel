'use client';

import { RadioGroup, RadioGroupItem } from '@/components/RadioGroup';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/Sheet';
import { Text } from '@/components/base/Text';
import { SORT_OPTIONS } from '@/data/constants';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { parseAsString, useQueryState } from 'nuqs';

// TODO fix radio button styling
export function Sort() {
  const router = useRouter();
  const [sort, setSort] = useQueryState('sort', parseAsString);

  function handleChange(e: string) {
    setSort(e).then(() => router.refresh());
  }

  const sortValue = sort || SORT_OPTIONS[0]?.value;

  return (
    <Sheet>
      <Text size="sm" asChild className="font-medium">
        <SheetTrigger className="flex flex-1 items-center justify-center bg-white py-4">
          Sort
        </SheetTrigger>
      </Text>
      <SheetContent>
        <SheetHeader title="Order by" />
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
              <div key={option.value} className="flex items-center justify-between gap-x-2">
                <Text size="sm" asChild>
                  <label
                    htmlFor={option.value}
                    className={cn(!isChecked ? 'text-brand-mid-grey' : '')}
                  >
                    {option.label}
                  </label>
                </Text>
                <RadioGroupItem
                  value={option.value}
                  id={option.value}
                  className="text-brand-primary"
                >
                  {option.label}
                </RadioGroupItem>
              </div>
            );
          })}
        </RadioGroup>
      </SheetContent>
    </Sheet>
  );
}
