'use client';
import { Text } from '@/components/base/Text';
import { cn } from '@/lib/utils';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import { FilterItemSchema } from './hooks';

interface SizeFilterProps {
  filter: FilterItemSchema;
  parentKey: string;
}

export function SizeFilter({ filter, parentKey }: SizeFilterProps) {
  const [state, setState] = useQueryState(parentKey, parseAsArrayOf(parseAsString));

  function handleOnClick() {
    const newState: string[] = [];
    if (!state) {
      setState([filter.slug!]);
      return;
    }
    if (state.includes(filter.slug!)) {
      const filteredState = state.filter((slug) => slug !== filter.slug);
      newState.push(...filteredState);
    } else {
      newState.push(...state, filter.slug!);
    }

    if (newState.length === 0) {
      setState(null);
      return;
    }
    setState(newState);
  }

  return (
    <>
      <Text
        size="sm"
        className={cn(
          'rounded-[2px] border py-3 lg:py-4',
          state?.includes(filter.slug!)
            ? 'bg-brand-primary text-white'
            : 'border-brand-light-grey bg-brand-sand'
        )}
        asChild
      >
        <button className="w-full text-center" onClick={() => handleOnClick()}>
          {filter.title}
        </button>
      </Text>
    </>
  );
}
