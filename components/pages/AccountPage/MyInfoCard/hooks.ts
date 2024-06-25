import { z } from 'zod'

export const myInfoFormValidator = z.object({
  firstName: z.string().min(2, 'You have to enter your first name'),
  lastName: z.string().min(2, 'You have to enter your last name'),
  footLength: z.string().min(2, 'You have to enter your foot length'),
  style: z.string().min(2, 'You have to enter your style'),
  color: z.string().min(2, 'You have to enter your color preference')
})

export type MyInfoFormProps = z.infer<typeof myInfoFormValidator>
