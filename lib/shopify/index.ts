import { isShopifyError } from '@/app/[market]/[lang]/(site)/shopify/utils';
import { METAFIELDS } from '@/data/constants';
import { env } from '@/env';
import { ensureStartsWith } from '@/lib/utils';
import { cookies } from 'next/headers';
import {
  addToCartMutation,
  applyDiscountToCartMutation,
  cartAttributesUpdateMutation,
  createCartMutation,
  customerAccessTokenCreateMutation,
  editCartItemsMutation,
  removeFromCartMutation
} from './mutations/cart';
import { getCartAttributesQuery, getCartQuery } from './queries/cart';
import {
  Cart,
  Connection,
  CustomerAccessToken,
  CustomerWishlist,
  MetafieldDelete,
  ShopifyAddDiscountCodeOperation,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartAttributesOperation,
  ShopifyCartOperation,
  ShopifyCreateCartOperation,
  ShopifyCustomerAccessTokenOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartAttributesOperation,
  ShopifyUpdateCartOperation
} from './types';
import { deleteWishlistQuery, getWishlistQuery } from './wishlist/query';

const domain = env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(env.SHOPIFY_STORE_DOMAIN, 'https://')
  : '';
const endpoint = `${domain}${env.SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

export async function shopifyFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  console.log(endpoint);

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    console.error('Shopify fetch error:');
    console.error(JSON.stringify(e, null, 2));

    if (isShopifyError(e)) {
      throw {
        cause: e.cause?.toString() || 'unknown',
        status: e.status || 500,
        message: e.message,
        query
      };
    }

    throw {
      error: JSON.stringify(e),
      query
    };
  }
}

const removeEdgesAndNodes = (array: Connection<any>) => {
  return array.edges.map((edge) => edge?.node);
};

const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: '0.0',
      currencyCode: 'USD'
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines)
  };
};

// TODO fix types
export async function createCustomerAccessToken(
  email: string,
  password: string
): Promise<CustomerAccessToken> {
  const res = await shopifyFetch<ShopifyCustomerAccessTokenOperation>({
    query: customerAccessTokenCreateMutation,
    cache: 'no-store',
    variables: {
      email,
      password
    }
  });

  return res.body.data.customerAccessTokenCreate.customerAccessToken;
}

export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  // Required to be able to track in Shopify analytics
  const shopifyY = cookies()?.get('_shopify_y')?.value;
  const shopifyS = cookies()?.get('_shopify_s')?.value;

  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines
    },
    headers: {
      ...(shopifyY && shopifyS && { cookie: `_shopify_y=${shopifyY}; _shopify_s=${shopifyS};` })
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function updateCartAttributes(
  cartId: string,
  attributes: { key: string; value: string }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyUpdateCartAttributesOperation>({
    query: cartAttributesUpdateMutation,
    variables: {
      cartId,
      attributes
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartAttributesUpdate.cart);
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
  const res = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId },
    cache: 'no-store'
  });

  // Old carts becomes `null` when you checkout.
  if (!res.body.data.cart) {
    return undefined;
  }

  return reshapeCart(res.body.data.cart);
}

export async function getCartAttributes(cartId: string) {
  const res = await shopifyFetch<ShopifyCartAttributesOperation>({
    query: getCartAttributesQuery,
    variables: { cartId },
    cache: 'no-store'
  });

  // Old carts becomes `null` when you checkout.
  if (!res.body.data.cart) {
    return undefined;
  }

  return res.body.data.cart;
}

export async function applyDiscountToCart(cartId: string, discountCodes: string[]): Promise<Cart> {
  // eslint-disable-next-line no-undef
  const res = await shopifyFetch<ShopifyAddDiscountCodeOperation>({
    query: applyDiscountToCartMutation,
    variables: {
      cartId,
      discountCodes
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cart);
}

export async function getWishlistForUser() {
  const accessToken = cookies().get('accessToken')?.value;

  if (!accessToken) {
    throw new Error('No access token');
  }

  const wishlistResponse = await shopifyFetch<CustomerWishlist>({
    query: getWishlistQuery,
    variables: {
      token: accessToken,
      key: METAFIELDS.customer.wishlist.key,
      namespace: METAFIELDS.customer.wishlist.namespace
    },
    cache: 'no-store'
  });

  return wishlistResponse.body.data?.customer?.metafield;
}

export async function deleteWishlistForUser({ gid }: { gid: string }) {
  const deleteWishlistResponse = await shopifyFetch<MetafieldDelete>({
    query: deleteWishlistQuery,
    variables: { id: gid },
    cache: 'no-store'
  });

  return deleteWishlistResponse;
}
