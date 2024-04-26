import { LangValues } from '@/data/constants';
import { getFAQBlock } from '@/lib/sanity/fragments';
import { faqBlockValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

export const customerServicePageValidator = z.object({
  title: z.string(),
  description: z.string(),
  faqBlocks: z.array(faqBlockValidator)
});

export type CustomerServicePagePayload = z.infer<typeof customerServicePageValidator>;

export function getCustomerServicePageQuery(lang: LangValues) {
  const query = groq`
    *[_type == "helpCenter"][0] {
      "title": title.${lang},
      "description": description.${lang},
      faqBlocks[]{
        ...@->{
          ${getFAQBlock(lang)}
        }
      }
    } 
    `;

  return query;
}
