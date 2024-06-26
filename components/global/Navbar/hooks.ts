import { LangValues, MarketValues } from '@/data/constants';
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
  items: z.array(z.union([linkValidator, meganavValidator])),
  hasAnnouncementBanner: z.boolean()
});

export type MeganavPayload = z.infer<typeof meganavValidator>;
export type NavbarPayload = z.infer<typeof navbarValidator>;

export function getNavbarQuery({ market, lang }: { market: MarketValues; lang: LangValues }) {
  const query = groq`
  *[_type == "navbar"][0] {
    "hasAnnouncementBanner": count(*[_type == "announcementBanner"]) > 0,
    "items": items_${market}[]{
      _type == "meganav" => {
        "type": _type,
        "title": title.${lang},
        links[]{
          "heading": heading.${lang},
          links[]{
            link{
              ${fragments.getLink(lang)}
            },
            "badge": badge->title.${lang}
          },
        },
        featuredProducts[]{
          "title": title.${lang},
          image{
            ${fragments.getImageBase(lang)}
          },
          "type": _type,
          "link": link{
            ${fragments.getLink(lang)}
          }
        },
      },
      _type == "link" => {
        ${fragments.getLink(lang)}
      },
    }
  } 
  `;

  return query;
}
