'use server';

import { ActiveVariants } from '@/components/pages/BundlePage/BundleButtons';
// import { ActiveVariants } from '@/components/pages/ProductPage/AddBundleToCartButton';
import { CACHE_TAGS } from '@/data/constants';
import {
  addToCart,
  applyDiscountToCart,
  createCart,
  getCart,
  getCartAttributes,
  removeFromCart,
  updateCart,
  updateCartAttributes
} from '@/lib/shopify';
import { Cart } from '@/lib/shopify/types';
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

export const getBundleConfig = async () => {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Error getting cart';
  }

  const cart = await getCartAttributes(cartId);

  const bundleConfig = cart?.attributes.find((attr) => attr.key === 'bundleContent')?.value;

  if (!bundleConfig) {
    return;
  }

  return JSON.parse(bundleConfig);
};

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

export const addItems = async (
  variants: ActiveVariants[] | undefined,
  bundleId?: string,
  discount?: string,
  quantity: number = 1
): Promise<string | undefined> => {
  let cartId = cookies().get('cartId')?.value;

  let cart: Cart | undefined;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart();

    cartId = cart.id;
    cookies().set('cartId', cartId);
  }

  if (!variants) {
    return 'Missing bundle variant IDs';
  }

  const attributes = [
    { key: 'bundleId', value: bundleId },
    { key: 'discount', value: discount }
  ];

  try {
    const cartItems = variants.map((variant) => {
      if (bundleId) {
        return {
          merchandiseId: variant.gid,
          quantity: variant.numberOfItems * quantity,
          attributes
        };
      }
      return { merchandiseId: variant.gid, quantity: variant.numberOfItems * quantity };
    });

    const response = await addToCart(cartId, cartItems);

    if (cart !== undefined) {
      const newItemAdded = response.lines.filter(
        (line) => !cart?.lines.find((cartLine) => cartLine.id === line.id)
      );

      // Update attributes
      if (bundleId && newItemAdded.length > 0) {
        const bundleConfig = {
          lineId: newItemAdded[0]?.id,
          bundleId: bundleId,
          variants: variants,
          discount: discount,
          quantity: quantity
        };
        const bundleConfigAttribute = [
          { key: 'bundleContent', value: JSON.stringify(bundleConfig) }
        ];
        await updateCartAttribute({ attributes: bundleConfigAttribute });
      }
    }
  } catch (e) {
    console.error(e);

    return 'Error adding bundle to cart';
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

export const updateBundleItemQuantity = async ({
  lineId,
  variantId,
  quantity
}: {
  lineId: string;
  variantId: string;
  quantity: number;
}): Promise<string | undefined> => {
  const cartId = cookies().get('cartId')?.value;
  const bundleConfig = await getBundleConfig();

  if (!cartId || !bundleConfig) {
    return 'Missing cart ID';
  }

  try {
    await removeItem(lineId);
    await addItems(bundleConfig.variants, bundleConfig.bundleId, bundleConfig.discount, quantity);
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
