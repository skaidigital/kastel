import { LangValues } from '@/data/constants'
import { getHelpCenter } from '@/lib/sanity/fragments'
import { faqBlockValidator } from '@/lib/sanity/validators'
import { z } from 'zod'

export const helpCenterPageValidator = z.object({
  title: z.string(),
  description: z.string(),
  faqBlocks: z.array(faqBlockValidator)
})

export type HelpCenterPagePayload = z.infer<typeof helpCenterPageValidator>

export function getHelpCenterPageQuery(lang: LangValues) {
  return getHelpCenter(lang)
}
