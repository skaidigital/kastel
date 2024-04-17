'use client';
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

  return (
    <>
      <div
        className={cn('border-[2px] p-1', state?.includes(filter.slug!) && 'border-brand-primary')}
        style={{ backgroundColor: filter.color || 'black' }}
      >
        <button className="w-full text-left" onClick={() => handleOnClick()}>
          {filter.title}
        </button>
      </div>
      {filter.title}
    </>
  );
}
