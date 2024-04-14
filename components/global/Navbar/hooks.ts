import { MarketValues } from '@/data/constants';
import * as fragments from '@/lib/sanity/fragments';
import { headingAndLinksValidator, imageValidator, linkValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

export const featuredNavItemValidator = z.object({
  title: z.string(),
  image: imageValidator,
  link: linkValidator
});

export const meganavValidator = z.object({
  type: z.literal('meganav'),
  title: z.string(),
  links: z.array(headingAndLinksValidator),
  featuredProducts: z.array(featuredNavItemValidator).optional()
});

// TODO fix. It should be discriminated union but then it is not a zod object and it fails
export const navbarValidator = z.object({
  items: z.array(z.union([linkValidator, meganavValidator]))
});

export type MeganavPayload = z.infer<typeof meganavValidator>;
export type NavbarPayload = z.infer<typeof navbarValidator>;

export function getNavbarQuery(market: MarketValues) {
  const query = groq`
  *[_type == "navbar"][0] {
    "items": items_${market}[]{
      _type == "meganav" => {
        "type": _type,
        "title": title.${market},
        links[]{
          "heading": heading.${market},
          links[]{
            ${fragments.getLink(market)}
          },
        },
        featuredProducts[]{
          "title": title.${market},
          image{
            ${fragments.getImageBase(market)}
          },
          "type": _type,
          "link": link{
            ${fragments.getLink(market)}
          }
        },
      },
      _type == "link" => {
        ${fragments.getLink(market)}
      },
    }
  } 
  `;

  return query;
}
