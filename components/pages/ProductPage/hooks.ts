import {
  concatenatePageBuilderQueries,
  pageBuilderValidator
} from '@/components/shared/PageBuilder/hooks';
import { LangValues, MarketValues } from '@/data/constants';
import * as fragments from '@/lib/sanity/fragments';
import {
  // galleryValidator,
  hotspotImageValidator,
  imageValidator,
  optionalImageValidator,
  portableTextValidator,
  richTextValidator
} from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

const sizeProductOptionValidator = z.object({
  type: z.literal('size'),
  name: z.string(),
  slug: z.string(),
  values: z.array(
    z.object({
      title: z.string()
    })
  )
});

const stringProductOptionValidator = z.object({
  type: z.literal('text'),
  name: z.string(),
  slug: z.string(),
  values: z.array(
    z.object({
      title: z.string()
    })
  )
});

const productOptionValidator = z.discriminatedUnion('type', [
  sizeProductOptionValidator,
  stringProductOptionValidator
]);

export type ProductOption = z.infer<typeof productOptionValidator>;

const selectedOptionValidator = z
  .object({
    name: z.string(),
    slug: z.string(),
    value: z.string()
  })
  .optional()
  .nullable();
export type SelectedOption = z.infer<typeof selectedOptionValidator>;

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

const PriceValidator = z.object({
  amount: z.number().transform((val) => String(val)),
  currencyCode: z.string()
});

const imageInGalleryValidator = imageValidator.extend({
  type: z.literal('figure')
});
const videoInGalleryValidator = z.object({
  type: z.literal('mux.video'),
  videoUrl: z.string()
});

export const productGalleryValidator = z.array(
  z.discriminatedUnion('type', [imageInGalleryValidator, videoInGalleryValidator])
);

// TODO make it non-optional after Luisa has fixed them all
export const sizeGuideValidator = z.object({
  description: portableTextValidator.optional(),
  chart: z.object({
    rows: z.array(
      z.object({
        cells: z.array(z.string())
      })
    )
  })
});

export const productValidator = z.object({
  id: z.string(),
  type: z.union([z.literal('SIMPLE'), z.literal('VARIABLE')]),
  title: z.string(),
  subtitle: z.string().optional(),
  slug: z.string(),
  sku: z.string(),
  descriptionShort: z.string(),
  descriptionLongTitle: z.string(),
  descriptionLongDetails: z.string(),
  badges: z.array(z.string()).optional(),
  galleryMale: productGalleryValidator.optional(),
  galleryFemale: productGalleryValidator.optional(),
  gallery: productGalleryValidator.optional(),
  options: z.array(productOptionValidator).optional(),
  faqs: z
    .array(
      z.object({
        question: z.string(),
        answer: z.array(richTextValidator)
      })
    )
    .optional(),
  typeId: z.string().optional(),
  largestDiscount: z.string().optional(),
  minVariantPrice: PriceValidator.optional(),
  maxVariantPrice: PriceValidator.optional(),
  mainImage: imageValidator,
  mainCategory: z
    .object({
      title: z.string(),
      slug: z.string()
    })
    .optional(),
  lifestyleImage: optionalImageValidator.optional(),
  hotspotImage: hotspotImageValidator.optional(),
  variants: z.array(productVariantValidator),
  usps: z
    .array(
      z.object({
        title: z.string(),
        icon: imageValidator
      })
    )
    .optional(),
  sizeGuide: sizeGuideValidator.optional(),
  pageBuilder: pageBuilderValidator.optional()
});

export type Product = z.infer<typeof productValidator>;

export function getProductQuery({
  market,
  lang,
  gender
}: {
  market: MarketValues;
  lang: LangValues;
  gender: 'male' | 'female';
}) {
  const query = groq`
  *[_type == "product" && slug_${lang}.current == $slug && status_${market} == "ACTIVE"][0]{
    "id": gid_${market},
    "title": title.${lang},
    "subtitle": subtitle.${lang},
    "slug": slug_${lang}.current,
    type,
    "sku": select(
      type == "SIMPLE" => sku,
      type == "VARIABLE" => *[_type=="productVariant" && references(^._id) && defined(sku)][0].sku
      ), 
    options[]{
      "name": optionType->.title.${lang},
      "type": optionType->.type,
      "slug": optionType->slug_${lang}.current,
      "values": options[]->{
        "title": title.${lang},
        "slug": slug_${lang}.current
      }
    },
    "largestDiscount": largestDiscount_${market},
    "minVariantPrice": minVariantPrice_${market}{
      "amount": coalesce(amount, 0),
      "currencyCode": currencyCode
    },
    "maxVariantPrice": maxVariantPrice_${market} {
      "amount": coalesce(amount, 0),
      "currencyCode": currencyCode
    },
    mainImage{
      ${fragments.getImageBase(lang)}
    },
    "mainCategory": coalesce(
      mainCategory->{
        "title": title.${lang},
        "slug": slug_${lang}.current
      },
      productType->mainCategory->{
        "title": title.${lang},
        "slug": slug_${lang}.current
      },
    ),
    lifestyleImage{
      ${fragments.getImageBase(lang)}
    },
    ...select(
      detailImage.asset._ref != null && hotspots != null => {
        "hotspotImage": {
        "type": "hotspotImage",
        "image": detailImage {
          ${fragments.getImageBase(lang)}
        },
        hotspots[]{
          ...select(
            type == "text" => {
              type,
              "description": description_${lang},
            },
            type == "productCard" => {
              "type": "product",
              ...product->{
                ${fragments.getProductCard(lang, market)}
              },
            },
          ),
          x,
          y,
        }
      },
      },
    ),
    "variants": select(
      type == "VARIABLE" => *[_type == "productVariant" && references(^._id) && hideInShop_${market} != true && defined(gid_${market})]{
        "id": gid_${market},
        "price": price_${market},
        "discountedPrice": discountedPrice_${market},
        sku,
        "selectedOptions": [
        option1->{
            "name": type->title.${lang},
            "slug": type->slug_${lang}.current,
            "value": title.${lang},
        },
        option2->{
            "name": type->title.${lang},
            "slug": type->slug_${lang}.current,
            "value": title.${lang},
        },
        option3->{
            "name": type->title.${lang},
            "slug": type->slug_${lang}.current,
            "value": title.${lang},
        }
      ]},
      type == "SIMPLE" => [{
        "id": variantGid_${market},
        "price": price_${market},
        "discountedPrice": compareAtPrice_${market},
        sku,
        "selectedOptions": [
          {
            "name": "default",
            "value": "default",
            "slug": "default"
          }
        ],
      }]
    ),
    "galleryMale": ${fragments.getGalleryMale(market)},
    "galleryFemale": ${fragments.getGalleryFemale(market)},
    ${getGallerByGender({ market, gender })},
    "descriptionShort": coalesce(descriptionShort.${lang}, productType->descriptionShort.${lang}),
    "descriptionLongTitle": coalesce(descriptionLongTitle.${lang}, productType->descriptionLongTitle.${lang}),
    "descriptionLongDetails": coalesce(descriptionLongDetails.${lang}, productType->descriptionLongDetails.${lang}),
    "badges": [...badges[]->.title.${lang}, ...productType->badges[]->title.${lang}],
    "faqs": coalesce(
    (
      // Combining FAQs from the main document, productType, and productSettings
      ((faqs[]->{
        "question": question.${lang},
        "answer": answer_${lang}
      }) + (productType->faqs[]->{
        "question": question.${lang},
        "answer": answer_${lang}
      }) + (*[_type == "productSettings"][0].faqs[]->{
        "question": question.${lang},
        "answer": answer_${lang}
      }))
    ),
    // Defaulting to main document FAQs if the above is not available
    faqs[]->{
      "question": question.${lang},
      "answer": answer_${lang}
    },
    // Defaulting to productType FAQs if the main document FAQs are not available
    productType->faqs[]->{
      "question": question.${lang},
      "answer": answer_${lang}
    },
    // Defaulting to productSettings FAQs if none of the above are available
    (*[_type == "productSettings"].faqs[]->{
      "question": question.${lang},
      "answer": answer_${lang}
    })
    ),
    "usps": coalesce(
      ((usps[]->{
        "title": title.${lang},
        "icon": icon{
          ${fragments.getImageBase(lang)}
        }
      }) + (productType->usps[]->{
        "title": title.${lang},
        "icon": icon{
          ${fragments.getImageBase(lang)}
        }
      })),
      usps[]->{
        "title": title.${lang},
        "icon": icon{
          ${fragments.getImageBase(lang)}
        }
      },
      productType->usps[]->{
        "title": title.${lang},
        "icon": icon{
          ${fragments.getImageBase(lang)}
        }
      }
    ),
    "typeId": productType->_id,
    "sizeGuide": coalesce(
      sizeGuide->{
        ${fragments.getSizeGuide(lang)}
      },
      productType->sizeGuide->{
        ${fragments.getSizeGuide(lang)}
      },
      null
    ),
    "pageBuilder": coalesce(
      (
        (pageBuilder[]{
          ${concatenatePageBuilderQueries({ market, lang })}
        }) +
        (productType->pageBuilder[]{
          ${concatenatePageBuilderQueries({ market, lang })}
        })
      ),
      pageBuilder[]{
        ${concatenatePageBuilderQueries({ market, lang })}
      },
      productType->pageBuilder[]{
        ${concatenatePageBuilderQueries({ market, lang })}
      }
    ),
  }
  `;

  return query;
}

const productSiblingValidator = z.object({
  title: z.string(),
  mainImage: imageValidator,
  slug: z.string()
});

export const productSiblingsValidator = z.array(productSiblingValidator);

export type ProductSiblings = z.infer<typeof productSiblingsValidator>;

export function getSiblingProductsQuery({
  market,
  lang
}: {
  market: MarketValues;
  lang: LangValues;
}) {
  const query = groq`
  *[_type == "product" && references($typeId) && status_${market} == "ACTIVE" && defined(gid_${market}) && defined(color)]{
    "title": color->title.${lang},
    "mainImage": mainImage {
      ${fragments.getImageBase(lang)}
    },
    "slug": slug_${lang}.current,
     }
  `;

  return query;
}

function getGallerByGender({
  market,
  gender
}: {
  market: MarketValues;
  gender: 'male' | 'female';
}) {
  if (gender === 'male') {
    return fragments.getGalleryMale(market);
  }

  return fragments.getGalleryFemale(market);
}
