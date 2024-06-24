import { LangValues } from '@/data/constants';
import { groq } from 'next-sanity';
import { z } from 'zod';

const commentValidator = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  text: z.string().min(1)
});

const phase1BlogPostValidator = z.object({
  id: z.string(),
  comments: z.array(commentValidator).optional()
});

export type Phase1BlogPostPayload = z.infer<typeof phase1BlogPostValidator>;

export function getPhase1BlogPost({ lang }: { lang: LangValues }) {
  const query = groq`
    *[_type == "phase1BlogPost" && slug.${lang}.current == $slug][0] {
        ...,
        "id": _id,
        comments[]{
            "id": _key,
            name,
            email,
            text
        }
    }`;

  return query;
}
