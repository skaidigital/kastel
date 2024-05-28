import { METAFIELDS } from '@/data/constants';
import { ProductInputCreate, ProductInputUpdate, PublicationInput } from '../shopify/types';
import { ProductSyncSchema, VariantSyncValidator } from './types';

export function serilizeProductByShopifyIdInput(gid: string) {
  const serializedProduct = {
    id: gid,
    namespace: METAFIELDS.product.sanityId.namespace,
    key: METAFIELDS.product.sanityId.key
  };

  return serializedProduct;
}

export function serializeShopifyProductInputCreate(product: ProductSyncSchema): ProductInputCreate {
  const newMeta = {
    namespace: METAFIELDS.product.sanityId.namespace,
    key: METAFIELDS.product.sanityId.key,
    type: 'single_line_text_field',
    value: product._id
  };
  const serializedProduct: ProductInputCreate = {
    input: {
      title: product.title,
      status: product.status,
      handle: product.slug,
      options: product?.options && product?.options.map((option) => option.title),
      metafields: [newMeta],
      variants: product.variants.map((variant) =>
        serializeShopifyVariantInput(variant, product.trackStock)
      )
    },
    media: [
      {
        originalSource: product.image.originalSource,
        // altText: product.image.altText || '',
        mediaContentType: 'IMAGE'
      }
    ]
  };

  return serializedProduct;
}

export function serializeShopifyProductInputUpdate(product: ProductSyncSchema): ProductInputUpdate {
  const serializedProduct: ProductInputUpdate = {
    input: {
      id: product.gid!,
      title: product.title,
      handle: product.slug,
      status: product.status,
      options: product?.options && product.options.map((option) => option.title),
      variants: product.variants.map((variant) =>
        serializeShopifyVariantInput(variant, product.trackStock)
      )
    }
  };

  return serializedProduct;
}
function serializeShopifyVariantInput(variant: VariantSyncValidator, trackStock: boolean) {
  const { discountedPrice, price } = variant;

  let options: string[] = [variant.option1, variant.option2, variant.option3].filter(
    (option): option is string => option !== null && option !== undefined
  );

  if (options[0] === '') {
    options = ['Default Title'];
  }

  const serializedVariant = {
    sku: variant.sku,
    price: String(discountedPrice || price),
    compareAtPrice: discountedPrice ? String(price) : undefined,
    barcode: variant.barcode,
    options,
    inventoryItem: {
      tracked: trackStock
    }
  };

  return serializedVariant;
}

export function serializePublicationInput(id: string, publicationId: string): PublicationInput {
  const serializedPublication = {
    id,
    input: [
      {
        publicationId
      }
    ]
  };

  return serializedPublication;
}
