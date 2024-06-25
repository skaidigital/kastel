import { LangValues, MarketValues } from '@/data/constants'
import * as fragments from '@/lib/sanity/fragments'
import { productCardValidator } from '@/lib/sanity/validators'
import { groq } from 'next-sanity'
import { z } from 'zod'

export const reccommmendedProductsValidator = z.array(productCardValidator)

export type ReccommendedProductPayload = z.infer<typeof reccommmendedProductsValidator>

export function getReccommendedProductsQuery(lang: LangValues, market: MarketValues) {
  return groq`
  *[_type == "merchandising" && _id == "merchandising"][0].reccommendedProducts[]->{
    ${fragments.getProductCard(lang, market)}
  }`
}
