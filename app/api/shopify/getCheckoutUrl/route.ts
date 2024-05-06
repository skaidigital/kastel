import { getCheckoutUrl } from '@/components/shared/Cart/actions';

export async function POST(request: Request) {
  const { isLoggedIn } = await request.json();

  const checkoutUrl = await getCheckoutUrl(isLoggedIn);

  return new Response(JSON.stringify({ checkoutUrl }), {
    status: 200
  });
}
