import { LangValues } from '@/data/constants';
import { getImageBase } from '@/lib/sanity/fragments';
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

export const crossSellProductsValidator = z.array(crossSellProductValidator).optional();

export type CrossSellProduct = z.infer<typeof crossSellProductValidator>;
export type CrossSellProducts = z.infer<typeof crossSellProductsValidator>;

export function getCrossSellQuery({ market, lang }: { market: string; lang: LangValues }) {
  const query = groq`
  *[_type=="product" && gid_${market}==$gid][0] {
      "crossSellProducts": coalesce(
        cartCrossSellProducts[]->{
        ${crossSellProductQuery({ market, lang })}
      },
        productType->.cartCrossSellProducts[]->{
        ${crossSellProductQuery({ market, lang })}
      },
        *[_type == "merchandising"][0].cartCrossSellProducts[][]->{
        ${crossSellProductQuery({ market, lang })}
      }  
    )
  }.crossSellProducts
    `;

  return query;
}

function crossSellProductQuery({ market, lang }: { market: string; lang: LangValues }) {
  const query = groq`
    "id": gid_${market},
    "title": title.${lang},
    "image": mainImage{
      ${getImageBase(lang)}
    },
    "options": select(
        type == "VARIABLE" => options[].options[]->.title_${lang},
    ),
    "variants": select(
      type == "VARIABLE" => *[_type == "productVariant" && references(^._id) && hideInShop_${market} != true && defined(gid_${market})]{
        "id": gid_${market},
        "price": price_${market},
        "discountedPrice": discountedPrice_${market},
        "selectedOptions": [
        option1->{
            "name": type->title.${lang},
            "value": title.${lang}
        },
        option2->{
            "name": type->title.${lang},
            "value": title.${lang}
        },
        option3->{
            "name": type->title.${lang},
            "value": title.${lang}
        }
      ]},
      type == "SIMPLE" => [{
        "id": variantGid_${market},    
        "price": price_${market},
        "discountedPrice": compareAtPrice_${market},
      }]
    )
    `;

  return query;
}

// const query = groq`
// *[_type == "merchandising"][0].cartCrossSellProducts[]->{
// "id": gid_${market},
// "title": title.${lang},
// "image": mainImage{
//   ${getImageBase(lang)}
// },
// "options": select(
//     type == "VARIABLE" => options[].options[]->.title_${lang},
// ),
// "variants": select(
//   type == "VARIABLE" => *[_type == "productVariant" && references(^._id) && hideInShop_${market} != true && defined(gid_${market})]{
//     "id": gid_${market},
//     "price": price_${market},
//     "discountedPrice": discountedPrice_${market},
//     "selectedOptions": [
//     option1->{
//         "name": type->title.${lang},
//         "value": title.${lang}
//     },
//     option2->{
//         "name": type->title.${lang},
//         "value": title.${lang}
//     },
//     option3->{
//         "name": type->title.${lang},
//         "value": title.${lang}
//     }
//   ]},
//   type == "SIMPLE" => [{
//     "id": gid_${market},
//     "price": price_${market},
//     "discountedPrice": compareAtPrice_${market},
//   }]
// )
// }
// `;
