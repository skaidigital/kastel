import { LangValues } from '@/data/constants'
import { getHelpCenter } from '@/lib/sanity/fragments'
import { faqBlockValidator } from '@/lib/sanity/validators'
import { z } from 'zod'

export const customerServicePageValidator = z.object({
  title: z.string(),
  description: z.string(),
  faqBlocks: z.array(faqBlockValidator)
})

export type CustomerServicePagePayload = z.infer<typeof customerServicePageValidator>

export function getCustomerServicePageQuery(lang: LangValues) {
  return getHelpCenter(lang)
}
