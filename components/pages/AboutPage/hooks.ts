import {
  concatenatePageBuilderQueries,
  pageBuilderValidator
} from '@/components/shared/PageBuilder/hooks'
import { LangValues, MarketValues } from '@/data/constants'
import { groq } from 'next-sanity'
import { z } from 'zod'

export const aboutPageValidator = z.object({
  id: z.string(),
  type: z.literal('aboutPage'),
  createdAt: z.string(),
  updatedAt: z.string(),
  pageBuilder: pageBuilderValidator
})

export type AboutPagePayload = z.infer<typeof aboutPageValidator>

export function getAboutPageQuery({ market, lang }: { market: MarketValues; lang: LangValues }) {
  const query = groq`
      *[_type == "aboutPage" && slug_${lang}.current == $slug][0] {
        "id": _id,
        "type": _type,
        "createdAt": _createdAt,
        "updatedAt": _updatedAt,
        pageBuilder[]{
          ${concatenatePageBuilderQueries({ market, lang })}
        },
      }
    `

  return query
}
