import { MarketValues } from '@/data/constants';
import { groq } from 'next-sanity';
import { z } from 'zod';
import { imageValidator } from './validators';

const optionGroupValidator = z.object({
  optionType: z.any(),
  options: z.array(
    z.object({
      title: z.string(),
      image: imageValidator
    })
  )
});

const variableProductDataValidator = z.object({
  options: z.array(optionGroupValidator)
});

export type VariableProductDataPayload = z.infer<typeof variableProductDataValidator>;

export function getVariableProductOptionsDataQuery(markets: string[]) {
  const query = groq`
  *[_id == $id][0] {
    options[]{
      ${markets.map((market) => `"title_${market}":optionType->title_${market}`)}
    }
  }
  
  `;
  return query;
}

export function getVariableProductVariantsDataQuery(markets: string[]) {
  const query = groq`
  *[_type=="productVariant" && references($id)] {
    _id,
    hideInShop,
    option1-> {
      ${markets.map((market) => `"title_${market}":title_${market}`)}
    },
    option2->{
      ${markets.map((market) => `"title_${market}":title_${market}`)}
    },
    option3->{
      ${markets.map((market) => `"title_${market}":title_${market}`)}
    },
  }
  `;
  return query;
}

export function getProductFromSanityQuery(market: MarketValues) {
  const query = groq`
  *[_type == "product" && _id == $id][0] {
    _id,
    _type,
    "image": mainImage.asset->{
      "originalSource": url,
      "altText": altText,
      "mediaContentType": mimeType
    },
    "title": title.${market},
    "slug": slug_${market}.current,
    "status": status_${market},
    trackStock,
    "gid": gid_${market},
    type,
    allowBackorders,
    "options": options[] {
      "title": optionType->title.${market},
      "variants": options[]->title.${market}
    },
    "variants": select(type == "VARIABLE" => ${variableProductVariants(market)}, type == 'SIMPLE' => ${simpleProductVariants(market)})
  }
  `;
  return query;
}

//todo move to a global place if used sevaral places
export function variableProductVariants(market: MarketValues) {
  const query = groq`
  *[_type == "productVariant" && parentProduct._ref == ^._id] {
    _id,
    sku,
    barcode,
    "option1": option1->.title.${market},
    "option2": option2->.title.${market},
    "option3": option3->.title.${market},
    "price": price_${market},
    "discountedPrice": discountedPrice_${market},
    "gid": gid_${market}
  }
  `;
  return query;
}

//todo move to a global place if used sevaral places
export function simpleProductVariants(market: MarketValues) {
  const query = groq`[{
  _id,
  "sku": sku,
  "barcode": barcode,
  "option1": "",
  "option2": "",
  "option3": "",
  "price": price_${market},
  "discountedPrice": discountedPrice_${market},
}]`;
  return query;
}
