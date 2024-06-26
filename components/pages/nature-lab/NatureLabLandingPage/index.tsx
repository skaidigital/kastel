import { NatureLabLandingPagePayload } from '@/components/pages/nature-lab/NatureLabLandingPage/hooks'
import { LangValues, MarketValues } from '@/data/constants'

interface Props {
  data: NatureLabLandingPagePayload
  lang: LangValues
  market: MarketValues
  className?: string
}

export function NatureLabLandingPage({ lang, market, className }: Props) {
  return (
    <div className={className}>
      <h1>
        Nature Lab {lang} {market}
      </h1>
    </div>
  )
}
