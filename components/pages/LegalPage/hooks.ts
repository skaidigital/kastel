import { LangValues } from '@/data/constants'
import { getLinkWithoutText } from '@/lib/sanity/fragments'
import { portableTextValidator } from '@/lib/sanity/validators'
import { groq } from 'next-sanity'
import { z } from 'zod'

export const legalPageValidator = z.object({
  id: z.string(),
  type: z.literal('legalPage'),
  updatedAt: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  content: portableTextValidator
})

export type LegalPagePayload = z.infer<typeof legalPageValidator>

export function getLegalPageQuery({ lang }: { lang: LangValues }) {
  const query = groq`
      *[_type == "legalPage" && slug_${lang}.current == $slug][0] {
        "id": _id,
        "title": title.${lang},
        "subtitle": subtitle.${lang},
        "type": _type,
        "updatedAt": _updatedAt,
        "content": content_${lang}[]{
          ...,
          markDefs[]{
            ...,
            _type == "inlineLink" => {
              link{
                ${getLinkWithoutText(lang)}
              }
            },
          }
        }
      }
    `

  return query
}
