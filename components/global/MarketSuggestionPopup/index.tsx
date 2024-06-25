import { getDictionary } from '@/app/dictionaries'
import { MarketSuggestionPopupLayout } from '@/components/global/MarketSuggestionPopup/Layout'
import { LangValues } from '@/data/constants'

interface Props {
  lang: LangValues
  requestCountry: string
  reccommendedMarket: string
}

export async function MarketSuggestionPopup({ lang, requestCountry, reccommendedMarket }: Props) {
  const { market_suggestion_popup: dictionary } = await getDictionary({ lang })

  return (
    <MarketSuggestionPopupLayout
      dictionary={dictionary}
      reccommendedMarket={reccommendedMarket}
      requestCountry={requestCountry}
    />
  )
}
