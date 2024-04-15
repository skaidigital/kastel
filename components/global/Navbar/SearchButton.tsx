'use client';

import { SearchBar } from '@/components/global/Navbar/SearchBar';
import { cn } from '@/lib/utils';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence } from 'framer-motion';

interface Props {
  className?: string;
}

export function SearchButton({ className }: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        aria-label="Open search"
        className={cn(
          '!text-text-sm flex items-center justify-center text-brand-dark-grey',
          className
        )}
      >
        Search
      </Dialog.Trigger>
      <AnimatePresence>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-20 bg-gray-100 bg-opacity-10 backdrop-blur" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2">
            <div className="border-brand-border mx-auto w-full max-w-md rounded-project border bg-white p-8">
              <SearchBar />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </AnimatePresence>
    </Dialog.Root>
  );
}

export const SearchClose = Dialog.Close;
