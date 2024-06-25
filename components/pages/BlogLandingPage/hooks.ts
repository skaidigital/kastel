import { LangValues } from '@/data/constants'
import { getBlogPostCard } from '@/lib/sanity/fragments'
import { blogPostCardValidator } from '@/lib/sanity/validators'
import { groq } from 'next-sanity'
import { z } from 'zod'

const blogPostLandingPageValidator = z.object({
  title: z.string(),
  description: z.string(),
  posts: z.array(blogPostCardValidator)
})

export type BlogPostLandingPagePayload = z.infer<typeof blogPostLandingPageValidator>

export function getBlogPostLandingPagePayload({ lang }: { lang: LangValues }) {
  const query = groq`
    *[_type == "blogLandingPage"][0]{
      "title": title.${lang},
      "description": description.${lang},
      "posts": *[_type == "blogPost"] | order(_updatedAt desc){
       ${getBlogPostCard(lang)}
      }
    }
  `

  return query
}
