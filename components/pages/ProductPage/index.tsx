import { Dictionary } from '@/app/dictionaries'
import { ProductPageLayout } from '@/components/pages/ProductPage/ProductPageLayout'
import { Product } from '@/components/pages/ProductPage/hooks'
import { LangValues, MarketValues } from '@/data/constants'

export interface PageProps {
  data: Product
  dictionary: Dictionary['product_page']
  market: MarketValues
  lang: LangValues
}

export function ProductPage({ data, dictionary, market, lang }: PageProps) {
  return <ProductPageLayout data={data} dictionary={dictionary} market={market} lang={lang} />
}
