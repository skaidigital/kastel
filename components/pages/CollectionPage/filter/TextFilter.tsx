'use client'
import { cn } from '@/lib/utils'
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'
import { FilterTextSchema } from './hooks'

interface TextFilterProps {
  filter: FilterTextSchema
  parentKey: string
}

export function TextFilter({ filter, parentKey }: TextFilterProps) {
  const [state, setState] = useQueryState(parentKey, parseAsArrayOf(parseAsString))

  function handleOnClick() {
    const newState: string[] = []
    if (!state) {
      setState([filter.slug!])
      return
    }
    if (state.includes(filter.slug!)) {
      const filteredState = state.filter((slug) => slug !== filter.slug)
      newState.push(...filteredState)
    } else {
      newState.push(...state, filter.slug!)
    }

    if (newState.length === 0) {
      setState(null)
      return
    }
    setState(newState)
  }

  const isActive = state?.includes(filter.slug!)

  return (
    <button
      className={cn(
        'flex items-center justify-center rounded-[2px] border px-3 py-2 text-xs font-medium lg:text-sm',
        isActive
          ? 'border-brand-primary bg-brand-primary text-white'
          : 'border-brand-light-grey bg-brand-sand text-brand-mid-grey'
      )}
      onClick={() => handleOnClick()}
    >
      {filter.title}
    </button>
  )
}
