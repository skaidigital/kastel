import { LangValues } from '@/data/constants'
import { getAuthor, getImageBase } from '@/lib/sanity/fragments'
import { authorValidator, imageValidator, portableTextValidator } from '@/lib/sanity/validators'
import { groq } from 'next-sanity'
import { z } from 'zod'

const commentValidator = z.object({
  id: z.string(),
  name: z.string().min(1),
  text: z.string().min(1),
  createdAt: z.string()
})

const updateValidator = z.object({
  title: z.string(),
  author: authorValidator,
  date: z.date(),
  content: portableTextValidator
})

const phase1BlogPostValidator = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.object({
    experimentId: z.string(),
    startDate: z.date(),
    status: z.enum(['open', 'closed'])
  }),
  callout: portableTextValidator.optional(),
  imageMobile: imageValidator,
  imageDesktop: imageValidator,
  updates: z.array(updateValidator).optional(),
  allowComments: z.boolean(),
  commentsDescription: portableTextValidator.optional(),
  comments: z.array(commentValidator).optional()
})

export type CommentProps = z.infer<typeof commentValidator>
export type UpdateProps = z.infer<typeof updateValidator>
export type Phase1BlogPostPayload = z.infer<typeof phase1BlogPostValidator>

export function getPhase1BlogPost({ lang }: { lang: LangValues }) {
  const query = groq`
    *[_type == "phase1BlogPost" && slug.${lang}.current == $slug][0] {
      "id": _id,
      "title": title.${lang},
      "summary": {
        experimentId,
        startDate,
        status,
      },
      "callout": callout.${lang}[]{
        ...
      },
      imageMobile{
        ${getImageBase(lang)}
      },
      imageDesktop{
        ${getImageBase(lang)}
      },
      updates[]{
        "title": title.${lang},
        "author": author->{
          ${getAuthor(lang)}
        },
        date,
        "content": content.${lang}[]{
          ...
        }
      },
      allowComments,
      "commentsDescription": commentsDescription.${lang}[]{
        ...
      },
      comments[]{
        "id": _key,
        name,
        text,
        createdAt
      }
    }`

  return query
}
