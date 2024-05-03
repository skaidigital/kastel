'use server';

import { applyDiscountToCart } from '@/lib/shopify';
import { cookies } from 'next/headers';

export const addDiscount = async (discountCode: string) => {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return {
      success: false,
      userErrors: [{ field: 'cart', message: 'Cart not found' }]
    };
  }
  try {
    await applyDiscountToCart(cartId, [discountCode]);

    return {
      success: true
    };
  } catch (e) {
    console.error('error applying discount', e);

    return {
      success: false,
      userErrors: [{ field: 'discountCode', message: e }]
    };
  }
};
