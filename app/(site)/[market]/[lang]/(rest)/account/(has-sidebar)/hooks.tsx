import { LangValues, MarketValues } from '@/data/constants';
import { getImageBase } from '@/lib/sanity/fragments';
import { imageValidator, richTextValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

export function getAccountQuery({ lang, market }: { lang: LangValues; market: MarketValues }) {
  const query = groq`
    *[_type == "accountPage"][0] {
        "messageFromTheTeam": messageFromTheTeam_${lang},
        "productDisplay": productDisplay {
        "title": title.${lang},
        "products": products[] {
            "title": title.${lang},
            "description": description.${lang},
            "badgeTitle": badge->title.${lang},
            "product": product->{
              "slug": slug_${market}.current,
              "image": mainImage {
                ${getImageBase(lang)}
              }
            }
          }
        },
        "image": image {
            ${getImageBase(lang)}
        }
    }
  `;

  return query;
}

const productValidator = z.object({
  title: z.string(),
  description: z.string(),
  badgeTitle: z.string().optional(),
  product: z.object({
    slug: z.string(),
    image: imageValidator
  })
});

const productDisplayValidator = z.object({
  title: z.string(),
  products: z.array(productValidator)
});

export const AccountPageValidator = z.object({
  messageFromTheTeam: richTextValidator,
  productDisplay: productDisplayValidator.optional(),
  image: imageValidator
});

export type productAccountSchema = z.infer<typeof productValidator>;
export type AccountPageSchema = z.infer<typeof AccountPageValidator>;
