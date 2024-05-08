import { getCustomerId } from '@/components/smile/hooks';
import { COOKIE_NAMES } from '@/data/constants';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const accessToken = cookies().get(COOKIE_NAMES.SHOPIFY.ACCESS_TOKEN)?.value;

  if (!accessToken) {
    return new Response(JSON.stringify({ customerId: null }), {
      status: 200
    });
  }

  const customerId = await getCustomerId();

  return new Response(JSON.stringify({ customerId }), {
    status: 200
  });
}
