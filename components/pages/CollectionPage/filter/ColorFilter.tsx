'use client';
import { Text } from '@/components/base/Text';
import { cn } from '@/lib/utils';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import { FilterItemSchema } from './hooks';

interface ColorFilterProps {
  filter: FilterItemSchema;
  parentKey: string;
}

export function ColorFilter({ filter, parentKey }: ColorFilterProps) {
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

  const isActive = state?.includes(filter.slug!);

  return (
    <button
      onClick={() => handleOnClick()}
      className="flex flex-col items-center gap-y-1 rounded-[2px] "
    >
      <div
        className={cn('h-10 w-full border', isActive ? 'border-black' : 'border-brand-light-grey')}
        style={{ backgroundColor: filter.color || 'black' }}
      />
      <Text size="xs">{filter.title}</Text>
    </button>
  );
}
