import { CACHE_TAGS, LangValues, MarketValues } from '@/data/constants'
import { loadQuery } from '@/lib/sanity/store'
import { imageValidator } from '@/lib/sanity/validators'
import { groq } from 'next-sanity'
import { z } from 'zod'

const metadataValidator = z.object({
  metaTitle: z.string(),
  metaDescription: z.string(),
  noFollow: z.boolean(),
  noIndex: z.boolean(),
  ogImage: imageValidator.optional()
})

export type MetadataPayload = z.infer<typeof metadataValidator>

export function getMetadataQuery({ market, lang }: { market: MarketValues; lang: LangValues }) {
  const query = groq`
    *[_type == "product" && slug_${market}.current == $slug][0] {
      "metaTitle": coalesce(metadata.metaTitle.${lang}, title.${lang}),
      "metaDescription": metadata.metaDescription.${lang},
      "noFollow": metadata.noFollow,
      "noIndex": metadata.noIndex,
      "ogImage": coalesce(metadata.ogImage, mainImage)
    }`

  return query
}

export async function loadProductMetadata({
  market,
  lang,
  slug
}: {
  market: MarketValues
  lang: LangValues
  slug: string
}) {
  const metadataQuery = getMetadataQuery({ market, lang })

  const metadata = await loadQuery<MetadataPayload | null>(
    metadataQuery,
    { slug },
    { next: { tags: [`${CACHE_TAGS.PRODUCT}${slug}`] } }
  )

  return metadata.data
}
