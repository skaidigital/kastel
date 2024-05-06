import { getCart } from '@/lib/shopify';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return new Response(JSON.stringify({ cart: null }), {
      status: 200
    });
  }

  const cart = await getCart(cartId);

  return new Response(JSON.stringify({ cart }), {
    status: 200
  });
}
