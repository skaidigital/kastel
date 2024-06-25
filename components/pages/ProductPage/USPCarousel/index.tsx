import { USPCarouselLayout } from '@/components/pages/ProductPage/USPCarousel/Layout'
import {
  USPCarouselPayload,
  getUSPCarouselQuery
} from '@/components/pages/ProductPage/USPCarousel/hooks'
import { Product, ProductVariant } from '@/components/pages/ProductPage/hooks'
import { CACHE_TAGS, LangValues } from '@/data/constants'
import { loadQuery } from '@/lib/sanity/store'

interface Props {
  productType: Product['type']
  variants: ProductVariant[]
  type: 'normal' | 'natureLab'
  lang: LangValues
}

export function loadUSPCarousel(lang: LangValues) {
  const query = getUSPCarouselQuery(lang)

  return loadQuery<USPCarouselPayload>(query, {}, { next: { tags: [CACHE_TAGS.PRODUCT_SETTINGS] } })
}

export async function USPCarousel({ productType, variants, lang, type }: Props) {
  const initial = await loadUSPCarousel(lang)

  if (!initial.data) return null

  return (
    <USPCarouselLayout
      productType={productType}
      variants={variants}
      type={type}
      items={initial.data}
    />
  )
}
