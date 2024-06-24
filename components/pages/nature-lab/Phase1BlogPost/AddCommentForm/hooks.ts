import { z } from 'zod';

export const addCommentValidator = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  text: z.string().min(1)
});

export type AddCommentProps = z.infer<typeof addCommentValidator>;
