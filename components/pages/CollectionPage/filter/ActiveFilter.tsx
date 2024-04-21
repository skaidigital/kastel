'use client';

import { Text } from '@/components/base/Text';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';

interface Props {
  parentKey: string;
}

export function ActiveFilter({ parentKey }: Props) {
  const [state, setState] = useQueryState(parentKey, parseAsArrayOf(parseAsString));

  function handleRemoveFilter(value: string) {
    if (!state) return;
    const newFilterState = state.filter((filter) => filter !== value);

    setState(newFilterState.length ? newFilterState : null);
  }

  return (
    state && (
      <div className="flex gap-x-1 ">
        {state.map((value) => {
          const capitalizedFiltername = value.charAt(0).toUpperCase() + value.slice(1);

          return (
            <button key={value} onClick={() => handleRemoveFilter(value)}>
              <Text
                as={'p'}
                size={'sm'}
                className="rounded-sm bg-gray-100 px-2 py-1 text-brand-mid-grey"
              >
                {capitalizedFiltername} x
              </Text>
            </button>
          );
        })}
      </div>
    )
  );
}
