import { LangValues } from '@/data/constants'
import { getImageBase } from '@/lib/sanity/fragments'
import { imageValidator } from '@/lib/sanity/validators'
import { groq } from 'next-sanity'
import { z } from 'zod'

export const pageNotFoundValidator = z.object({
  title: z.string(),
  content: z.string(),
  image: imageValidator
})

export type PageNotFoundPayload = z.infer<typeof pageNotFoundValidator>

export function getPageNotFoundQuery(lang: LangValues) {
  const query = groq`
        *[_id==$id][0] {
            "title": title.${lang},
            "content": content.${lang},
            "image": image {
                ${getImageBase(lang)}
            }
      }
    `

  return query
}
