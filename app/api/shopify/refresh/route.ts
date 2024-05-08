/* eslint-disable no-unused-vars */
import { COOKIE_NAMES } from '@/data/constants';
import { refreshAccessToken } from '@/lib/shopify/customer/actions';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  console.log('in refresh');

  const refreshToken = cookies().get(COOKIE_NAMES.SHOPIFY.REFRESH_TOKEN)?.value;
  console.log('refreshToken', refreshToken);

  if (!refreshToken) {
    console.log('refreshToken is null');

    return new Response('No refresh token', { status: 401 });
  }

  const response = await refreshAccessToken(refreshToken);

  if (!response.access_token) {
    return new Response('No access token', {
      status: 401,
      statusText: 'No access token'
    });
  }
  const { access_token, expires_in, refresh_token, id_token } = response;

  const bufferTime = 300; // 5 minutes

  const expiresAt = new Date(Date.now() + (expires_in - bufferTime) * 1000).toString();

  cookies().set(COOKIE_NAMES.SHOPIFY.ID_TOKEN, id_token);
  cookies().set(COOKIE_NAMES.SHOPIFY.ACCESS_TOKEN, access_token);
  cookies().set(COOKIE_NAMES.SHOPIFY.EXPIRES_IN, expiresAt);
  cookies().set(COOKIE_NAMES.SHOPIFY.REFRESH_TOKEN, refresh_token);

  return new Response('Refreshed', { status: 200 });
}
