import { z } from 'zod'

export const emailCaptureFormValidator = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  consented: z.literal(true, { message: 'You must consent to continue' })
})

export type EmailCaptureForm = z.infer<typeof emailCaptureFormValidator>
