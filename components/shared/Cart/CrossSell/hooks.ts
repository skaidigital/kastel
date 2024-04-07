import { MarketValues } from '@/data/constants';
import * as fragments from '@/lib/sanity/fragments';
import { imageValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

const crossSellProductValidator = z.object({
  id: z.string(),
  title: z.string(),
  image: imageValidator,
  options: z.array(z.string()).optional(),
  variants: z.array(
    z.object({
      id: z.string(),
      price: z.number(),
      discountedPrice: z.number().optional(),
      selectedOptions: z
        .array(
          z
            .object({
              name: z.string(),
              value: z.string()
            })
            .optional()
        )
        .optional()
    })
  )
});

export type CrossSellProduct = z.infer<typeof crossSellProductValidator>;

export const crossSellValidator = z.object({
  product: crossSellProductValidator
});
export type CrossSellPayload = z.infer<typeof crossSellValidator>;

export function getCrossSellQuery(market: MarketValues) {
  const query = groq`
    *[_type == "merchandising"][0]{
        "product": cartCrossSell->{
        "id": id_${market},
        "title": title_${market},
        "image": gallery[0]{
          ${fragments.getImageBase(market)}
        },
        "options": select(
            type == "VARIABLE" => options[].options[]->.title_eu,
        ),
        "variants": select(
          type == "VARIABLE" => *[_type == "productVariant" && references(^._id) && hideInShop_${market} != true && defined(gid_${market})]{
            "id": gid_${market},
            "price": price_${market},
            "discountedPrice": discountedPrice_${market},
            "selectedOptions": [
            option1->{
                "name": type->title_${market},
                "value": title_${market}
            },
            option2->{
                "name": type->title_${market},
                "value": title_${market}
            },
            option3->{
                "name": type->title_${market},
                "value": title_${market}
            }
          ]},
          type == "SIMPLE" => [{
            "id": gid_${market},    
            "price": price_${market},
            "discountedPrice": compareAtPrice_${market},
          }]
        )
     },
    }
    `;

  return query;
}
