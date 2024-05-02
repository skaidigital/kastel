import { LangValues } from '@/data/constants';
import { getLink } from '@/lib/sanity/fragments';
import { headingAndLinksValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

export const footerValidator = z.object({
  description: z.string(),
  items: z.array(headingAndLinksValidator),
  newsletterLabel: z.string(),
  newsletterDescription: z.string()
});

export const testFooterValidator = z.any();

export type FooterPayload = z.infer<typeof footerValidator>;

export function getFooterQuery(lang: LangValues) {
  const query = groq`
  *[_type == "footer"][0] {
    "description": description.${lang},
    "newsletterLabel": newsletterLabel.${lang},
    "newsletterDescription": newsletterDescription.${lang},
    "items": items_${lang}[]{
      "heading": heading.${lang},
        links[]{
          link{
            ${getLink(lang)}
          },
          "badge": badge->title.${lang}
        },
    },
  }
  `;

  return query;
}
