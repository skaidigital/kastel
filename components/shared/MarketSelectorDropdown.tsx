'use client'

import { Text } from '@/components/base/Text'
import { LangValues, MARKETS, MarketValues } from '@/data/constants'
import { useBaseParams } from '@/lib/hooks/useBaseParams'
import { cn } from '@/lib/utils'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { parseAsBoolean, useQueryState } from 'nuqs'

interface Props {
  market: MarketValues
  className?: string
}

export function MarketSelectorDropdown({ market, className }: Props) {
  const { lang } = useBaseParams()
  const marketValues = MARKETS.find((m) => m.id === market)
  const [_, setMarketPopupIsOpen] = useQueryState('market_popup', parseAsBoolean)
  const openMarketPopup = () => setMarketPopupIsOpen(true)

  const chooseYourLanguageString = getChooseYourLanguageString(lang)

  return (
    <div className="flex flex-col gap-y-3">
      <Text size="sm" className="text-white">
        {chooseYourLanguageString}
      </Text>
      <button
        onClick={openMarketPopup}
        className={cn(
          'lg:max-w-auto flex max-w-60 items-center justify-between rounded-[4px] border border-brand-primary bg-brand-primary-light px-5 py-4 text-sm font-medium text-brand-dark-grey hover:border-white hover:bg-brand-primary hover:text-white focus:border-white focus:bg-brand-primary focus:text-white',
          className
        )}
      >
        <span>{marketValues?.name}</span>
        <CaretSortIcon className="size-5" />
      </button>
    </div>
  )
}

function getChooseYourLanguageString(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Velg språk'
    case 'en':
      return 'Choose your language'
    default:
      return 'Velg språk'
  }
}
