'use client';

import { LoadingSpinner } from '@/components/LoadingSpinner';
import { SearchClose } from '@/components/global/Navbar/SearchButton';
import { useBaseParams } from '@/lib/hooks/useBaseParams';
import { createUrl } from '@/lib/utils';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';

interface Props {
  onClose: () => void;
}

export const SearchBar = ({ onClose }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { market, lang } = useBaseParams();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchValue(searchParams?.get('q') || '');
  }, [searchParams, setSearchValue]);

  // Focus input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    startTransition(async () => {
      e.preventDefault();

      const val = e.target as HTMLFormElement;
      const search = val.search as HTMLInputElement;
      const newParams = new URLSearchParams();

      if (search.value) {
        newParams.set('q', search.value);
      } else {
        newParams.delete('q');
      }

      router.push(createUrl(`/${market}/${lang}/search`, newParams));
      onClose();
    });
  }

  return (
    <div className="flex items-center justify-between">
      <form onSubmit={onSubmit} className="flex grow items-center space-x-5">
        <button type="submit" className="group">
          {isPending ? (
            <span className="w-[20px]">
              <LoadingSpinner />
            </span>
          ) : (
            <MagnifyingGlassIcon className="h-5 w-5 text-brand-mid-grey group-hover:text-brand-dark-grey" />
          )}
        </button>
        <input
          ref={inputRef}
          type="text"
          name="search"
          autoComplete="off"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Søk..."
          className="focus:ring-none text-paragraph-lg grow bg-transparent font-serif focus:outline-none"
        />
        <SearchClose>
          <XMarkIcon className="h-5 w-5 text-brand-mid-grey" />
        </SearchClose>
      </form>
    </div>
  );
};
