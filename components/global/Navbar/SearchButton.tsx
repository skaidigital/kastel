'use client';

import { Backdrop } from '@/components/Backdrop';
import { SearchBar } from '@/components/global/Navbar/SearchBar';
import { fadeAnimation } from '@/lib/animations';
import { cn } from '@/lib/utils';
import * as Dialog from '@radix-ui/react-dialog';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  className?: string;
}

export function SearchButton({ className }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  function handleCloseDialog() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        aria-label="Open search"
        onClick={handleOpenChange}
        className={cn(
          'relative flex h-11 w-11 items-center justify-center rounded-project text-brand-dark-grey transition-colors hover:bg-brand-light-grey',
          className
        )}
      >
        <MagnifyingGlassIcon className={'h-4 transition-all ease-in-out hover:scale-110'} />
      </button>
      <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
        <AnimatePresence>
          {isOpen && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay forceMount>
                <Backdrop type="blur" />
              </Dialog.Overlay>
              <Dialog.Content asChild forceMount>
                <motion.div
                  initial="hide"
                  animate={isOpen ? 'show' : 'hide'}
                  exit="hide"
                  variants={fadeAnimation}
                  className="fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2"
                >
                  <div className="mx-auto w-full max-w-md rounded-project border border-brand-border bg-white p-8">
                    <SearchBar onClose={handleCloseDialog} />
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </>
  );
}

export const SearchClose = Dialog.Close;
