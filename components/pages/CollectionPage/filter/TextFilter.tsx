'use client';
import { cn } from '@/lib/utils';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import { FilterTextSchema } from './hooks';

interface TextFilterProps {
  filter: FilterTextSchema;
  parentKey: string;
}

export function TextFilter({ filter, parentKey }: TextFilterProps) {
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
        className={cn(
          'border-[2px] bg-gray-100 p-1 text-brand-mid-grey',
          state?.includes(filter.slug!) && 'bg-brand-primary text-white'
        )}
      >
        <button className="w-full text-center" onClick={() => handleOnClick()}>
          {filter.title}
        </button>
      </div>
    </>
  );
}
