'use server';

import { CACHE_TAGS } from '@/data/constants';
import {
  addToCart,
  applyDiscountToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
  updateCartAttributes
} from '@/lib/shopify';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function getCheckoutUrl(isLoggedIn: boolean) {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Error getting cart';
  }

  const cart = await getCart(cartId);

  if (!cart) {
    return 'Error getting cart';
  }

  const checkoutUrl = new URL(cart.checkoutUrl);

  if (isLoggedIn) {
    checkoutUrl.searchParams.append('logged_in', 'true');
  }

  return checkoutUrl.toString();
}

export async function setCartId(cartId: string) {
  cookies().set('cartId', cartId);
}

type AddItemResponse = {
  cartId?: string;
  success: boolean;
  message?: string;
};

export const addItem = async (variantId: string | undefined): Promise<AddItemResponse> => {
  let cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart();
    cartId = cart.id;
    await setCartId(cartId);
  }

  if (!variantId) {
    return { success: false, message: 'Missing product variant ID' };
  }

  try {
    await addToCart(cartId, [{ merchandiseId: variantId, quantity: 1 }]);

    revalidateTag(CACHE_TAGS.CART);

    return { success: true, cartId };
  } catch (e) {
    console.error(e);

    return { success: false, message: 'Error adding item to cart' };
  }
};

export const updateCartAttribute = async ({
  attributes
}: {
  attributes: { key: string; value: string }[];
}): Promise<string | undefined> => {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }
  try {
    await updateCartAttributes(cartId, attributes);
  } catch (e) {
    return 'Error updating item quantity';
  }
};

export const updateItemQuantity = async ({
  lineId,
  variantId,
  quantity
}: {
  lineId: string;
  variantId: string;
  quantity: number;
}): Promise<string | undefined> => {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }
  try {
    await updateCart(cartId, [
      {
        id: lineId,
        merchandiseId: variantId,
        quantity
      }
    ]);
  } catch (e) {
    return 'Error updating item quantity';
  }
};

export const removeItem = async (lineId: string): Promise<string | undefined> => {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }
  try {
    await removeFromCart(cartId, [lineId]);
  } catch (e) {
    return 'Error removing item from cart';
  }
};

export const addDiscount = async (discountCode: string): Promise<string | undefined> => {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }
  try {
    const addDiscountResponse = await applyDiscountToCart(cartId, [discountCode]);
  } catch (e) {
    return 'Error adding discount';
  }
};
