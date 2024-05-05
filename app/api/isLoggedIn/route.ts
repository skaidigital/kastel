import { COOKIE_NAMES } from '@/data/constants';
import { cookies } from 'next/headers';

export async function GET() {
  const accessToken = cookies().get(COOKIE_NAMES.SHOPIFY.ACCESS_TOKEN)?.value;

  const isLoggedIn = accessToken ? true : false;

  return new Response(JSON.stringify({ isLoggedIn: isLoggedIn }));
}
