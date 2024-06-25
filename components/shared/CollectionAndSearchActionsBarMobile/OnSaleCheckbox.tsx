'use client'

import { Text } from '@/components/base/Text'
import { LangValues } from '@/data/constants'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { parseAsBoolean, useQueryState } from 'nuqs'

interface Props {
  lang: LangValues
  className?: string
}

export function OnSaleCheckbox({ lang, className }: Props) {
  const [isOnSale, setIsOnSale] = useQueryState('on_sale', parseAsBoolean)
  const router = useRouter()

  function handleClick(shouldBeOnSale: boolean) {
    setIsOnSale(shouldBeOnSale === true ? true : null).then(() => router.refresh())
  }

  const onSaleValue = isOnSale || false
  const onSaleString = getOnSaleString(lang)

  return (
    <Text
      size="sm"
      className={cn('flex items-center justify-between text-brand-mid-grey', className)}
      asChild
    >
      <label htmlFor="onSale">
        {onSaleString}
        <input
          name="onSale"
          id="onSale"
          type="checkbox"
          defaultChecked={onSaleValue}
          className={cn('size-4 accent-brand-primary')}
          onClick={() => handleClick((isOnSale || false) === false)}
        />
      </label>
    </Text>
  )
}

function getOnSaleString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'On sale'
    case 'no':
      return 'På salg'
    default:
      return 'On sale'
  }
}
