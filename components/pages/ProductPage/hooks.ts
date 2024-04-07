import {
  concatenatePageBuilderQueries,
  pageBuilderValidator
} from '@/components/shared/PageBuilder/hooks';
import { MarketValues } from '@/data/constants';
import * as fragments from '@/lib/sanity/fragments';
import { galleryValidator, richTextValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

const sizeProductOptionValidator = z.object({
  type: z.literal('size'),
  name: z.string(),
  values: z.array(
    z.object({
      title: z.string()
    })
  )
  // featuredValues: z.array(z.string()).optional()
});

const stringProductOptionValidator = z.object({
  type: z.literal('text'),
  name: z.string(),
  values: z.array(
    z.object({
      title: z.string()
    })
  )
});

// const colorProductOptionValidator = z.object({
//   type: z.literal('color'),
//   name: z.string(),
//   values: z.array(
//     z.object({
//       title: z.string(),
//       color: z.string()
//     })
//   )
// });

const productOptionValidator = z.discriminatedUnion('type', [
  sizeProductOptionValidator,
  stringProductOptionValidator
  // colorProductOptionValidator
]);

export type ProductOption = z.infer<typeof productOptionValidator>;

const selectedOptionValidator = z.object({
  name: z.string(),
  value: z.string()
});
export type SelectedOption = z.infer<typeof selectedOptionValidator>;

const priceRangeValidator = z.object({
  minVariantPrice: z.object({
    amount: z.number().transform((val) => String(val)),
    currencyCode: z.string()
  }),
  maxVariantPrice: z.object({
    amount: z.number().transform((val) => String(val)),
    currencyCode: z.string()
  })
});

const productVariantValidator = z.object({
  id: z.string(),
  price: z.number(),
  discountedPrice: z.number().optional(),
  selectedOptions: z.array(selectedOptionValidator),
  sku: z.string()
});
export type ProductVariant = z.infer<typeof productVariantValidator>;

const siblingProductValidator = z.object({
  title: z.string(),
  slug: z.string(),
  isColor: z.boolean(),
  color: z.string().optional()
});
export type SiblingProduct = z.infer<typeof siblingProductValidator>;

const accordionValidator = z.object({
  title: z.string(),
  richText: z.array(richTextValidator)
});

export const productValidator = z.object({
  id: z.string(),
  type: z.union([z.literal('SIMPLE'), z.literal('VARIABLE')]),
  title: z.string(),
  slug: z.string(),
  description: z.array(richTextValidator).optional(),
  featuredOptions: z.array(z.string()).optional(),
  gallery: galleryValidator.optional(),
  pageBuilder: pageBuilderValidator.optional(),
  accordions: z.array(accordionValidator).optional(),
  productType: z
    .object({
      title: z.string(),
      accordions: z
        .array(
          z.object({
            title: z.string(),
            richText: z.array(richTextValidator)
          })
        )
        .optional(),
      gallery: galleryValidator.optional(),
      products: z.array(siblingProductValidator),
      pageBuilder: pageBuilderValidator.optional()
    })
    .optional(),
  usp: z.array(richTextValidator),
  variants: z.array(productVariantValidator),
  options: z.array(productOptionValidator).optional(),
  priceRange: priceRangeValidator
});

export type Product = z.infer<typeof productValidator>;

export function getProductQuery(market: MarketValues) {
  const query = groq`
  *[_type == "product" && slug_${market}.current == $slug && status_${market} == "ACTIVE" && defined(gid_${market})][0]{
    "id": gid_${market},
    "title": title_${market},
    "slug": slug_${market}.current,
    type,
    "description": coalesce(description_${market}, productType->description_${market}),
    sku,
    ${fragments.getGallery(market)},
    "accordions": accordions[]->{
        "title": title_${market},
        "richText": ${fragments.getRichText({ market })},
    },
    productType->{
      "title": title.${market},
      "accordions": accordions[]->{
        "title": title_${market},
        "richText": ${fragments.getRichText({ market })},
      },
      ${fragments.getGallery(market)},
      "products": *[_type == "product" && references(^._id) && status_${market} == "ACTIVE"]{
        "title": title_${market},
        "slug": slug_${market}.current,
        "isColor": isColor,
        "color": color->.color.value,
      },
      pageBuilder[]{
        ${concatenatePageBuilderQueries(market)}
      },
    },
    "price": price_${market},
    "compareAtPrice": compareAtPrice_${market},
    options[]{
      "name": optionType->.title_${market},
      "type": optionType->.type,
      "values": options[]->{
        "title": title_${market},
        // "color": color->.color.value,
      },
      "featuredValues": featuredOptions[]->.title_${market},
    },
    "featuredOptions": featuredOptions_${market}[]->.title_${market},
    "priceRange": {
      "minVariantPrice": {
        "amount": coalesce(minPrice_${market}.amount, 0),
        "currencyCode": coalesce(minPrice_${market}.currencyCode, "") 
      },
      "maxVariantPrice": {
        "amount": coalesce(maxPrice_${market}.amount, 0),
        "currencyCode": coalesce(maxPrice_${market}.currencyCode, "") 
      }
    },
    "variants": select(
      type == "VARIABLE" => *[_type == "productVariant" && references(^._id) && hideInShop_${market} != true && defined(gid_${market})]{
        "id": gid_${market},
        "price": price_${market},
        "discountedPrice": discountedPrice_${market},
        sku,
        "selectedOptions": [
        option1->{
            "name": type->title_${market},
            "value": title_${market},
            // "hex": option1->color->.color.value,
        },
        option2->{
            "name": type->title_${market},
            "value": title_${market},
            // "hex": option2->color->.color.value,
        },
        option3->{
            "name": type->title_${market},
            "value": title_${market},
            // "hex": option3->color->.color.value,
        }
      ]},
      type == "SIMPLE" => [{
        "id": variantGid_${market},    
        "price": price_${market},
        "discountedPrice": compareAtPrice_${market},
        sku, 
        "selectedOptions": [
          "name": "Default",
          "value": "Default",
        ],
      }]
    ),
    pageBuilder[]{
      ${concatenatePageBuilderQueries(market)}
    },
    "usp": *[_type == "usps"][0].${fragments.getRichText({ market, fieldName: 'productForm' })}
  }
  `;

  return query;
}
