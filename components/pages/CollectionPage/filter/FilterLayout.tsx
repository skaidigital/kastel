'use client';

import { useRouter } from 'next/navigation';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import { useEffect, useMemo, useState } from 'react';

interface FilterLayoutProps {
  filterGroupKeys: string[];
  children: React.ReactNode;
}

export function FilterLayout({ filterGroupKeys, children }: FilterLayoutProps) {
  const router = useRouter();
  const urlStates = useUrlStates(filterGroupKeys);
  const [prevStates, setPrevStates] = useState<any>({});

  const debouncedRefresh = useMemo(
    () =>
      debounce(() => {
        router.refresh();
      }, 1000),
    [router]
  );

  useEffect(() => {
    if (JSON.stringify(urlStates) !== JSON.stringify(prevStates)) {
      debouncedRefresh();
      setPrevStates(urlStates);
    }
  }, [urlStates, debouncedRefresh, prevStates]);

  return <>{children}</>;
}

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T & { cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout>;

  const debouncedFunction: any = (...args: any[]) => {
    const later = () => {
      clearTimeout(timeout); // Cancels the timer identified by timeoutID
      func(...args); // Calls the original function with its arguments
    };
    clearTimeout(timeout); // Clear the previous timeout to set the new one
    timeout = setTimeout(later, wait);
  };

  debouncedFunction.cancel = () => {
    clearTimeout(timeout); // Function to clear the current timeout
  };

  return debouncedFunction as T & { cancel: () => void };
}

function UrlStateHelperFunction(filterKey: string) {
  const [state] = useQueryState(filterKey, parseAsArrayOf(parseAsString));
  return state;
}

function useUrlStates(keys: string[]) {
  const states: any = {};
  keys.forEach((key) => {
    const state = UrlStateHelperFunction(key);
    states[key] = state;
  });
  return states;
}
