import { getDictionary } from '@/app/dictionaries'
import { MarketLayout } from '@/components/global/MarketPopup/Layout'
import { LangValues } from '@/data/constants'

interface Props {
  lang: LangValues
}

export async function MarketPopup({ lang }: Props) {
  const { market_selector: dictionary } = await getDictionary({ lang })

  return <MarketLayout dictionary={dictionary} />
}
