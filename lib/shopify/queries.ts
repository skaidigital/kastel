import { serilizeProductByShopifyIdInput } from '../api/serializers';
import { ProductExsistInShopifyValidator } from '../api/types';
import { shopifyAdminQuery } from './admin';
import { removeProductGid } from './helpers';
import {
  getProductByShopifyId,
  getProductsByShopifyId,
  getStockForProductVariant
} from './queries/product';

const getProductFromShopifyBySanityId = async (gid: string) => {
  const serializedInput = serilizeProductByShopifyIdInput(gid);

  const response = await shopifyAdminQuery(getProductByShopifyId, serializedInput).catch(
    (error) => {
      console.error('Shopifylib - admin ', error);
    }
  );

  if (!response) {
    return { success: false, error: 'No response from Shopify' };
  }

  const validatedResponse = ProductExsistInShopifyValidator.safeParse(response.data);

  if (!validatedResponse.success) {
    return { success: false, error: validatedResponse.error };
  }

  return { success: true, product: validatedResponse.data.product };
};

export const getProductsFromShopifyByGids = async (gids: string[]) => {
  const strippedGids = gids.map((gid) => removeProductGid(gid));
  const serializedInput = { ids: strippedGids.join(' OR ') };

  const response = await shopifyAdminQuery(getProductsByShopifyId, serializedInput).catch(
    (error) => {
      console.error('Shopifylib - admin ', error);
    }
  );

  if (!response) {
    return { success: false, error: 'No response from Shopify' };
  }

  return response.data;
  // const validatedResponse = ProductExsistInShopifyValidator.safeParse(response.data);

  // if (!validatedResponse.success) {
  //   return { success: false, error: validatedResponse.error };
  // }

  // return { success: true, product: validatedResponse.data.product };
};

export async function isCreatedInShopify(_id: string, gid: string | undefined | null) {
  if (!gid) {
    return false;
  }
  const productQueryResponse = await getProductFromShopifyBySanityId(gid);

  if (!productQueryResponse.success) {
    return false;
  }

  const sanityId = productQueryResponse.product?.metafield.value;

  if (!sanityId || sanityId !== _id) {
    return false;
  }
  return true;
}

export async function isProductVariantInStock(variantId: string) {
  const response = await shopifyAdminQuery(
    getStockForProductVariant,
    { id: variantId },
    'no-store'
  ).catch((error) => {
    console.error('Shopifylib - admin ', error);
  });

  if (!response) {
    return {
      inStock: false,
      quantity: 0
    };
  }
  if (!response.data.productVariant) {
    return {
      inStock: false,
      quantity: 0
    };
  }

  return {
    inStock: response.data.productVariant.inventoryQuantity > 0,
    quantity: response.data.productVariant.inventoryQuantity
  };
}
