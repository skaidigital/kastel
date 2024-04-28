/* eslint-disable no-unused-vars */
import { COOKIE_NAMES } from '@/data/constants';
import { getAccessToken, getExchangedAccessToken } from '@/lib/shopify/customer/actions';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get('code');
  const state = searchParams.get('state');
  if (!code || !state) {
    return new Response('No code', { status: 401 });
  }

  const response = await getAccessToken(code, state);

  if (!response.success) {
    return new Response('No access token', {
      status: 401,
      statusText: response.error
    });
  }

  const data = response.data;
  const accessToken = data.access_token;
  const refresh_token = data.refresh_token;
  const idToken = data.id_token;

  const { access_token: exchangedToken, expires_in } = await getExchangedAccessToken(accessToken);

  if (!exchangedToken) {
    return new Response('No exchanged access token', {
      status: 401,
      statusText: 'No exchanged access token'
    });
  }

  const bufferTime = 300; // 5 minutes

  const expiresAt = new Date(Date.now() + (expires_in - bufferTime) * 1000).toString();
  cookies().set(COOKIE_NAMES.SHOPIFY.ID_TOKEN, idToken);
  cookies().set(COOKIE_NAMES.SHOPIFY.ACCESS_TOKEN, exchangedToken);
  cookies().set(COOKIE_NAMES.SHOPIFY.EXPIRES_IN, expiresAt);
  cookies().set(COOKIE_NAMES.SHOPIFY.REFRESH_TOKEN, refresh_token);

  // TODO set email upon login

  // TODO localize this
  redirect('/no/no/account');
}
