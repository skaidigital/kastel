'use client';

import { SearchBar } from '@/components/global/Navbar/SearchBar';
import { cn } from '@/lib/utils';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Props {
  className?: string;
}

export function SearchButton({ className }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClose = () => setIsOpen(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger
        aria-label="Open search"
        className={cn('flex items-center justify-center !text-sm ', className)}
      >
        Search
      </Dialog.Trigger>
      <AnimatePresence>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-20 bg-gray-100 bg-opacity-10 backdrop-blur" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2">
            <div className="border-brand-border mx-auto w-full max-w-md rounded-project border bg-white p-8">
              <SearchBar onClose={onClose} />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </AnimatePresence>
    </Dialog.Root>
  );
}

export const SearchClose = Dialog.Close;
