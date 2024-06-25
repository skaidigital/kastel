import { CACHE_TAGS, LangValues, MarketValues } from '@/data/constants'
import { nullToUndefined } from '@/lib/sanity/nullToUndefined'
import { loadQuery } from '@/lib/sanity/store'
import { notFound } from 'next/navigation'
import { ColorSelect } from './ColorSelect'
import { ProductSiblings, getSiblingProductsQuery, productSiblingsValidator } from './hooks'

function loadSiblingProducts({
  typeId,
  market,
  lang
}: {
  typeId: string
  market: MarketValues
  lang: LangValues
}) {
  const query = getSiblingProductsQuery({ market, lang })

  return loadQuery<ProductSiblings | null>(
    query,
    { typeId },
    { next: { tags: [`${CACHE_TAGS.PRODUCT}${typeId}`] } }
  )
}

interface Props {
  typeId: string
  market: MarketValues
  lang: LangValues
  type: 'normal' | 'natureLab'
}

export async function ColorSelector({ typeId, market, lang, type }: Props) {
  const initial = await loadSiblingProducts({ typeId, market, lang })

  if (!initial.data) {
    notFound()
  }

  const productsWithoutNullValues = nullToUndefined(initial.data)

  const validatedProducts = productSiblingsValidator.parse(productsWithoutNullValues)

  return <ColorSelect products={validatedProducts} type={type} />
}
