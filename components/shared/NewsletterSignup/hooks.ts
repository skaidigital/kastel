import { z } from 'zod'

export const newsletterFormSchema = z.object({
  email: z.string().email()
})

export type NewsletterFormSchema = z.infer<typeof newsletterFormSchema>
