'use client'

import { LangValues, MARKETS, MarketValues } from '@/data/constants'
import { useBaseParams } from '@/lib/hooks/useBaseParams'
import { cn } from '@/lib/utils'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { parseAsBoolean, useQueryState } from 'nuqs'

interface Props {
  market: MarketValues
  title?: string
  className?: string
}

export function NavbarMarketSelector({ market, title, className }: Props) {
  const { lang } = useBaseParams()
  const marketValues = MARKETS.find((m) => m.id === market)
  const [_, setMarketPopupIsOpen] = useQueryState('market_popup', parseAsBoolean)
  const openMarketPopup = () => setMarketPopupIsOpen(true)

  const chooseYourLanguageString = getChooseYourLanguageString(lang)

  return (
    <button
      onClick={openMarketPopup}
      className={cn('flex items-center gap-x-2', className)}
      aria-label={chooseYourLanguageString}
    >
      {title && title}
      <span>{marketValues?.flag}</span>
      {title && <ChevronUpDownIcon className="size-4" />}
    </button>
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
