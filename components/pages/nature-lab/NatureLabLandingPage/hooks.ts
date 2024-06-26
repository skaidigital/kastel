import { groq } from 'next-sanity'
import { z } from 'zod'

const natureLabLandingPageValidator = z.object({
  id: z.string()
})

export type NatureLabLandingPagePayload = z.infer<typeof natureLabLandingPageValidator>

export function getNatureLabLandingPageQuery() {
  const query = groq`
    *[_type == "natureLabLandingPage" && _id == "natureLabLandingPage"][0] {
        ...
    }`

  return query
}
