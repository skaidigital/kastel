'use client'

import { Text } from '@/components/base/Text'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'

interface Props {
  parentKey: string
}

export function ActiveFilterGroupItem({ parentKey }: Props) {
  const [state, setState] = useQueryState(parentKey, parseAsArrayOf(parseAsString))
  const router = useRouter()

  function handleRemoveFilter(value: string) {
    if (!state) return
    const newFilterState = state.filter((filter) => filter !== value)

    setState(newFilterState.length ? newFilterState : null).then(() => router.refresh())
  }

  return (
    state && (
      <div className="flex gap-x-1">
        {state &&
          state.length > 0 &&
          state.map((value) => {
            const capitalizedFiltername =
              parentKey !== 'on_sale' ? value.charAt(0).toUpperCase() + value.slice(1) : 'Sale'
            const replaceDashWithSpace = capitalizedFiltername.replace(/-/g, ' ')

            return (
              <button key={value} onClick={() => handleRemoveFilter(value)}>
                <Text
                  as={'p'}
                  size={'sm'}
                  className="flex items-center gap-x-1 rounded-[2px] bg-gray-100 px-2 py-1 font-medium text-brand-mid-grey hover:bg-brand-primary hover:text-white focus:bg-brand-primary focus:text-white"
                >
                  {replaceDashWithSpace}
                  <XMarkIcon className="size-4" />
                </Text>
              </button>
            )
          })}
      </div>
    )
  )
}
