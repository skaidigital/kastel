'use client'

import { VisuallyHidden } from '@/components/VisuallyHidden'
import { SearchBar } from '@/components/global/Navbar/SearchBar'
import { LangValues } from '@/data/constants'
import { useBaseParams } from '@/lib/hooks/useBaseParams'
import { cn } from '@/lib/utils'
import * as Dialog from '@radix-ui/react-dialog'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { AnimatePresence } from 'framer-motion'
import { Suspense, useState } from 'react'

interface Props {
  className?: string
}

export function SearchButton({ className }: Props) {
  const { lang } = useBaseParams()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onClose = () => setIsOpen(false)
  const searchString = getSearchString(lang)

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger
        aria-label="Open search"
        className={cn('flex items-center justify-center !text-sm', className)}
      >
        <span className="hidden lg:block">{searchString}</span>
        <MagnifyingGlassIcon className="size-6 lg:hidden" />
      </Dialog.Trigger>
      <AnimatePresence>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-20 bg-gray-100 bg-opacity-10 backdrop-blur" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2 px-4 lg:px-0">
            <VisuallyHidden>
              <Dialog.Title>{searchString}</Dialog.Title>
              <Dialog.Description>Search for a product</Dialog.Description>
            </VisuallyHidden>
            <div className="border-brand-border mx-auto w-full max-w-md rounded-project border bg-white p-6 lg:p-8">
              <Suspense>
                <SearchBar onClose={onClose} />
              </Suspense>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </AnimatePresence>
    </Dialog.Root>
  )
}

function getSearchString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Search'
    case 'no':
      return 'Søk'
    default:
      return 'Search'
  }
}

export const SearchClose = Dialog.Close
