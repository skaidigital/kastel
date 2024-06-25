import { LangValues } from '@/data/constants'
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

export function getMetadataQuery(lang: LangValues) {
  const query = groq`
    *[_type == $schemaType && slug_${lang}.current == $slug][0].metadata{
      "metaTitle": metaTitle.${lang},
      "metaDescription": metaDescription.${lang},
      noFollow,
      noIndex,
      ogImage
    }`

  return query
}

export async function loadMetadata({
  lang,
  slug,
  schemaType
}: {
  lang: LangValues
  slug: string
  schemaType: string
}) {
  const metadataQuery = getMetadataQuery(lang)

  const metadata = await loadQuery<MetadataPayload | null>(
    metadataQuery,
    { slug, schemaType },
    { next: { tags: [`${schemaType}:${slug}`] } }
  )

  return metadata.data
}
