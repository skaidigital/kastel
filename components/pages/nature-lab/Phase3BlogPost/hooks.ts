import { LangValues } from '@/data/constants'
import { getImageBase } from '@/lib/sanity/fragments'
import { imageValidator, portableTextValidator } from '@/lib/sanity/validators'
import { groq } from 'next-sanity'
import { z } from 'zod'

const phase3BlogPostValidator = z.object({
  id: z.string(),
  title: z.string(),
  content: portableTextValidator,
  summary: z.object({
    innovationId: z.string(),
    completionDate: z.string()
  }),
  imageMobile: imageValidator,
  imageDesktop: imageValidator
})

export type Phase3BlogPostPayload = z.infer<typeof phase3BlogPostValidator>

export function getPhase3BlogPost({ lang }: { lang: LangValues }) {
  const query = groq`
    *[_type == "phase3BlogPost" && slug.${lang}.current == $slug][0] {
      "id": _id,
      "title": title.${lang},
      "content": content.${lang}[]{
        ...
      },
      "summary": {
        "innovationId": innovationId.${lang},
        completionDate,
      },
      imageMobile{
        ${getImageBase(lang)}
      },
      imageDesktop{
        ${getImageBase(lang)}
      },
    }`

  return query
}
