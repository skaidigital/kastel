import { MarketValues } from '@/data/constants';
import { getImageBase } from '@/lib/sanity/fragments';
import { simpleProductVariants, variableProductVariants } from '@/lib/sanity/getProductData';
import { groq } from 'next-sanity';
import { z } from 'zod';

export function getBundleSelectionsQuery(market: MarketValues) {
  const query = groq`
    *[_type == "bundle" && slug_${market}.current == $slug && status_${market} == "ACTIVE"][0]{
      "items": bundleItems[]{
        internalTitle,
        "title": title.${market},
        numberOfItems,
        "product": bundleItems[]->{
          "id":  gid_${market},
          "slug": slug_${market}.current,
          "title": title_${market},
          "image": gallery[0]{
            ${getImageBase(market)}
          },
          "variants": select(type == "VARIABLE" => ${variableProductVariants(market)}, type == 'SIMPLE' => ${simpleProductVariants(market)})
        },
      },
    }
    `;

  return query;
}

//! tags to find this again: delete update remove refactor

const ImageValidator = z.object({
  asset: z.object({
    _ref: z.string(),
    metadata: z.object({
      lqip: z.string()
    })
  }),
  altText: z.string().optional(),
  crop: z
    .object({
      top: z.number(),
      bottom: z.number(),
      left: z.number(),
      right: z.number()
    })
    .optional(),
  hotspot: z
    .object({
      height: z.number(),
      width: z.number(),
      x: z.number(),
      y: z.number()
    })
    .optional()
});

const BundleProductValitator = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  image: ImageValidator,
  variants: z.array(
    z.object({
      _id: z.string(),
      id: z.string(),
      gid: z.string(),
      sku: z.string(),
      option1: z.string(),
      option2: z.string().optional().nullable(),
      option3: z.string().optional().nullable(),
      price: z.number()
    })
  )
});

export const BundleItemValidator = z.object({
  title: z.string(),
  numberOfItems: z.number(),
  product: z.array(BundleProductValitator)
});

export const BundleItemsValidator = z.object({
  items: z.array(BundleItemValidator)
});

export const BundleSelectValidator = z.object({
  data: BundleItemsValidator
});

export type BundleSelectSchema = z.infer<typeof BundleSelectValidator>;
export type BundleItemSchema = z.infer<typeof BundleItemValidator>;

interface ActiveBundle {
  gid: string;
  numberOfItems: number;
  title: string;
  sku: string;
  price: number;
}

export function createActiveBundle(data: any[], bundleVariants: string[] | null) {
  if (!bundleVariants) return [];

  const activeBundleSet: Set<string> = new Set();
  const activeBundle: ActiveBundle[] = [];

  data.forEach((item) => {
    item.product.forEach((product: any) => {
      product.variants.forEach((variant: any) => {
        if (bundleVariants.includes(variant.sku)) {
          // Create a unique identifier for each variant.
          const uniqueId = `${variant.gid}-${item.numberOfItems}-${product.title}-${variant.option1}`;

          if (!activeBundleSet.has(uniqueId)) {
            activeBundleSet.add(uniqueId); // Add the unique identifier to the Set.

            activeBundle.push({
              gid: variant.gid,
              numberOfItems: item.numberOfItems,
              title: `${product.title} - ${variant.option1}`,
              sku: variant.sku,
              price: variant.price
            });
          }
        }
      });
    });
  });

  return activeBundle;
}
