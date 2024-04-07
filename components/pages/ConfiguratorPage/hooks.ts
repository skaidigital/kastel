import {
  concatenatePageBuilderQueries,
  pageBuilderValidator
} from '@/components/shared/PageBuilder/hooks';
import { MarketValues } from '@/data/constants';
import * as fragments from '@/lib/sanity/fragments';
import { getImageBase } from '@/lib/sanity/fragments';
import { simpleProductVariants, variableProductVariants } from '@/lib/sanity/getProductData';
import { imageValidator, richTextValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

const sizeProductOptionValidator = z.object({
  type: z.literal('size'),
  name: z.string(),
  values: z.array(
    z.object({
      title: z.string()
    })
  ),
  featuredValues: z.array(z.string())
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

const colorProductOptionValidator = z.object({
  type: z.literal('color'),
  name: z.string(),
  values: z.array(
    z.object({
      title: z.string(),
      color: z.string()
    })
  )
});

const productOptionValidator = z.discriminatedUnion('type', [
  sizeProductOptionValidator,
  stringProductOptionValidator,
  colorProductOptionValidator
]);

export type ProductOption = z.infer<typeof productOptionValidator>;

const selectedOptionValidator = z.object({
  name: z.string(),
  value: z.string(),
  hex: z.string().optional()
});
export type SelectedOption = z.infer<typeof selectedOptionValidator>;

const productVariantValidator = z.object({
  id: z.string(),
  price: z.number(),
  compareAtPrice: z.number().optional(),
  selectedOptions: z.array(selectedOptionValidator)
});
export type ProductVariant = z.infer<typeof productVariantValidator>;

const siblingProductValidator = z.object({
  title: z.string(),
  slug: z.string(),
  isColor: z.boolean(),
  color: z.string().optional()
});
export type SiblingProduct = z.infer<typeof siblingProductValidator>;

const baseProductValidator = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.array(richTextValidator).optional(),
  gallery: z.array(imageValidator).optional(),
  pageBuilder: pageBuilderValidator.optional(),
  productType: z
    .object({
      title: z.string(),
      accordions: z.array(
        z.object({
          title: z.string(),
          richText: z.array(richTextValidator)
        })
      ),
      gallery: z.array(imageValidator).optional(),
      products: z.array(siblingProductValidator),
      pageBuilder: pageBuilderValidator.optional()
    })
    .optional()
});

const simpleProductValidator = z.object({
  type: z.literal('SIMPLE'),
  price: z.number(),
  compareAtPrice: z.number().optional(),
  id: z.string()
});

const variableProductValidator = z.object({
  type: z.literal('VARIABLE'),
  options: z.array(productOptionValidator).optional(),
  variants: z.array(productVariantValidator).optional()
});

export const productValidator = z.discriminatedUnion('type', [
  baseProductValidator.merge(simpleProductValidator),
  baseProductValidator.merge(variableProductValidator)
]);
export type Product = z.infer<typeof productValidator>;

export function getProductQuery(market: MarketValues) {
  const query = groq`
  *[_type == "product" && slug_${market}.current == $slug && status_${market} == "ACTIVE"][0]{
    "title": title_${market},
    "slug": slug_${market}.current,
    type,
    "description": description_${market},
    ${fragments.getGallery(market)},
    productType->{
      "title": title.${market},
      "accordions": accordions[]{
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
    "id": gid_${market},
    "price": price_${market},
    "compareAtPrice": compareAtPrice_${market},
    options[]{
      "name": optionType->.title_${market},
      "type": optionType->.type,
      "values": options[]->{
        "title": title_${market},
        "color": color->.color.value,
      },
      "featuredValues": featuredOptions[]->.title_${market},
    },
    "variants": *[_type == "productVariant" && references(^._id) && hideInShop != true]{
      "id": gid_${market},
      "price": price_${market},
      "compareAtPrice": compareAtPrice_${market},
      "selectedOptions": [
        { 
          "name": option1->type->.title_${market},
          "value": option1->title_${market},
          "hex": option1->color->.color.value,
        },
        { 
          "name": option2->type->.title_${market},
          "value": option2->title_${market},
          "hex": option2->color->.color.value,
        },
        { 
          "name": option3->title_${market},
          "value": option3->title_${market},
          "hex": option3->color->.color.value,
        },
      ],    
    },
    pageBuilder[]{
      ${concatenatePageBuilderQueries(market)}
    },
  }
  `;

  return query;
}

export function getBundleQuery(market: MarketValues) {
  const query = groq`
  *[_type == "bundle" && slug_${market}.current == $slug && status_${market} == "ACTIVE"][0]{
    "title": title_${market},
    "slug": slug_${market}.current,
    "description": description_${market},
    "items": bundleItems[]{
      numberOfItems,
      "product": bundleItem->{
        "slug": slug_${market}.current,
        "title": title_${market},
        type,
        "options": options[]{
          "title": optionType->.title_${market},
          "slug": optionType->.slug_${market}.current,
          "options": options[]->.title_${market},
        },
        "variants": select(type == "VARIABLE" => ${variableProductVariants(market)}, type == 'SIMPLE' => ${simpleProductVariants(market)})
      },
    },
    ${fragments.getGallery(market)},
    "id": gid_${market},
    pageBuilder[]{
      ${concatenatePageBuilderQueries(market)}
    },
  }
  `;

  return query;
}

export function getConfiguratorQuery(market: MarketValues) {
  const query = groq`
  *[_type == "configurator" && _id == "configurator"][0]{
    ...,
      configurationSteps[]{
        "title": title.${market},
      }
    }
  `;

  return query;
}

export function getConfiguratorStepQuery(step: string, market: MarketValues) {
  const query = groq`
  *[_type == "configurator" && _id == "configurator"][0]{
    ...,
      configurationSteps[${step}]{
        "title": title.${market},
        "stepSlug": slug_${market}.current,
        productArray[]->{
          "title": title_${market},
          "slug": slug_${market}.current,
          "status": status_${market},
          gallery,
          "color": color->.color.value,
        }
      }
    }
  `;

  return query;
}

export function getConfiguratorStepsQuery(market: MarketValues) {
  const query = groq`
  *[_type == "configurator" && _id == "configurator"][0]{
      "configurationSteps": configurationSteps[]{
        "title": title.${market},
        "stepSlug": slug_${market}.current,
      }
    }
  `;

  return query;
}

export function getConfiguratorLastStepQuery(step: string, market: MarketValues) {
  const query = groq`
  *[_type == "configurator" && _id == "configurator"][0]{
    ...,
      configurationSteps[${step}]{
        "title": title.${market},
        "stepSlug": slug_${market}.current,
        productArray[]->{
          _id,
          "title": title_${market},
          "slug": slug_${market}.current,
          "status": status_${market},
          type,
          gallery,
          "color": color->.color.value,
        "variants": select(type == "VARIABLE" => ${variableProductVariants(market)}, type == 'SIMPLE' => ${simpleProductVariants(market)})
        }
      }
    }
  `;

  return query;
}

export function getConfiguratorSuccessStepQuery(market: MarketValues) {
  const query = groq`
  *[_type == "configurator" && _id == "configurator"][0]{
      "content": content_${market}
    }
  `;

  return query;
}

export function getConfiguratorImagesQuery(step: string, market: MarketValues) {
  const numberStep = Number(step);
  const validatedMarket = 'no';
  const query = groq`
  *[_type == "configurator" && _id == "configurator"][0] {
    "images": configurationStepsImages[${numberStep - 1}].productArray[] {
      ${getImageBase(validatedMarket)}
    }
  }
  `;

  return query;
}

export function getConfiguratorImagesQueryV2(step: string, market: MarketValues) {
  const numberStep = Number(step);
  const validatedMarket = 'no';
  const query = groq`
  *[_type == "configurator" && _id == "configurator"][0] {
    "step": configurationSteps[${numberStep - 1}]{
      "slug": slug_${market}.current,
      "products": productArray[]->{
        "slug": slug_${market}.current,
        "images": gallery[0]{
          ${getImageBase(validatedMarket)}
        }
      }
    }
  }
  `;

  return query;
}

export function getConfiguratorProductImagesQuery(market: MarketValues) {
  const query = groq`
  *[_type == "product" && slug_${market}.current in $slugs]{
    "slug": slug_${market}.current,
    "gallery": gallery[0]{
      ${getImageBase(market)}
    }
  }
  `;

  return query;
}

export function getConfiguratorPricesQuery(market: MarketValues) {
  const validatedMarket = 'no';
  const query = groq`
  *[_type == "productVariant" && id_${validatedMarket} in $ids && !(_id in path("drafts.**"))]{
    "id": id_${validatedMarket},
    "price": price_${validatedMarket},
    "discountedPrice": discountedPrice_${validatedMarket},
    "currency": parentProduct->maxPrice_${validatedMarket}.currencyCode  
  }
  `;

  return query;
}

export function cleanedProductData(product: Product): Product {
  if (product.type === 'SIMPLE') {
    return product;
  }

  const { variants, ...rest } = product;

  return {
    ...rest,
    variants: variants?.map((variant: ProductVariant) => ({
      ...variant,
      selectedOptions: variant.selectedOptions.filter(
        (option: SelectedOption) => option.name !== undefined && option.value !== undefined
      )
    }))
  };
}
