'use client'

import { LangValues, MarketValues } from '@/data/constants'
import { useParams } from 'next/navigation'

export function useBaseParams() {
  const params = useParams<{ market: MarketValues; lang: LangValues }>()

  const market = params.market
  const lang = params.lang

  return { market, lang }
}
