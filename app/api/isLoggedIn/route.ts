import { COOKIE_NAMES } from '@/data/constants';
import { getExpiryTime } from '@/lib/getExpiryTime';
import { handleRefreshToken } from '@/lib/getRefreshToken';
import { cookies } from 'next/headers';

export async function GET() {
  const accessToken = cookies().get(COOKIE_NAMES.SHOPIFY.ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(COOKIE_NAMES.SHOPIFY.REFRESH_TOKEN)?.value;

  const isLoggedIn = accessToken ? true : false;

  if (!isLoggedIn) {
    return new Response(JSON.stringify({ isLoggedIn: false }));
  }

  const hasExpiresInCookie = await getExpiryTime();

  if (hasExpiresInCookie) {
    return new Response(JSON.stringify({ isLoggedIn: true }));
  }

  if (refreshToken) {
    const updatedToken = await handleRefreshToken();
    if (updatedToken) {
      return new Response(JSON.stringify({ isLoggedIn: true }));
    }
  }

  return new Response(JSON.stringify({ isLoggedIn: false }));
}
