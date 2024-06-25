import { CACHE_TAGS, MarketValues } from '@/data/constants'
import { loadQuery } from '@/lib/sanity/store'
import { imageValidator } from '@/lib/sanity/validators'
import { groq } from 'next-sanity'
import { z } from 'zod'

const defaultMetadataValidator = z.object({
  metaTitle: z.string(),
  metaDescription: z.string(),
  ogImage: imageValidator
})

export type DefaultMetadataPayload = z.infer<typeof defaultMetadataValidator>

export function getDefaultMetadataQuery(market: MarketValues) {
  const query = groq`
    *[_type == "settingsSEOAndSocials"][0]{
     "metaTitle": metaTitle.${market},
     "metaDescription": metaDescription.${market},
     ogImage
    }`

  return query
}

export async function loadDefaultMetadata(market: MarketValues) {
  const defaultMetadataQuery = getDefaultMetadataQuery(market)

  const defaultMetadata = await loadQuery<DefaultMetadataPayload | null>(
    defaultMetadataQuery,
    {},
    { next: { tags: [CACHE_TAGS.METADATA] } }
  )

  return defaultMetadata.data
}
