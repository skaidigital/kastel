import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useBaseParams } from '@/lib/hooks/useBaseParams'
import { cn, createUrl } from '@/lib/utils'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState, useTransition } from 'react'

interface Props {
  onClose: () => void
  className?: string
}

export function MobileMenuSearch({ onClose, className }: Props) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { market, lang } = useBaseParams()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setSearchValue(searchParams?.get('q') || '')
  }, [searchParams, setSearchValue])

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    startTransition(async () => {
      e.preventDefault()

      const val = e.target as HTMLFormElement
      const search = val.search as HTMLInputElement
      const newParams = new URLSearchParams()

      if (search.value) {
        newParams.set('q', search.value)
      } else {
        newParams.delete('q')
      }

      router.push(createUrl(`/${market}/${lang}/search`, newParams))
      onClose()
    })
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        'flex items-center gap-x-2 rounded-[2px] border border-brand-light-grey bg-brand-sand px-6',
        className
      )}
    >
      {isPending ? <LoadingSpinner /> : <MagnifyingGlassIcon className="size-4" />}
      <input
        ref={inputRef}
        type="text"
        name="search"
        autoComplete="off"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="grow bg-transparent py-4 text-[16px] leading-[16px] text-brand-dark-grey placeholder:text-sm placeholder:leading-[14px] placeholder:text-brand-dark-grey md:text-sm md:leading-[14px]"
        placeholder="Search"
      />
    </form>
  )
}
