/* eslint-disable no-unused-vars */
import { COOKIE_NAMES } from '@/data/constants';
import { getAccessToken, getExchangedAccessToken } from '@/lib/shopify/customer/actions';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // const log = new Logger().with({
  //   type: 'routeHandler',
  //   action: 'shopify/auth',
  // });

  const code = searchParams.get('code');
  const state = searchParams.get('state');
  if (!code || !state) {
    // log.warn('Required params not found', { code, state });
    // await log.flush();
    return new Response('No code', { status: 401 });
  }

  const response = await getAccessToken(code, state);

  if (!response.success) {
    // log.warn('No access token', { response });
    // await log.flush();
    return new Response('No access token', {
      status: 401,
      statusText: response.error
    });
  }

  const data = response.data;
  const accessToken = data.access_token;

  const { access_token: exchangedToken, expires_in } = await getExchangedAccessToken(accessToken);

  if (!exchangedToken) {
    return new Response('No exchanged access token', {
      status: 401,
      statusText: 'No exchanged access token'
    });
  }

  const bufferTime = 300; // 5 minutes

  const expiresAt = new Date(Date.now() + (expires_in - bufferTime) * 1000).toString();
  cookies().set(COOKIE_NAMES.SHOPIFY.ACCESS_TOKEN, exchangedToken);
  cookies().set(COOKIE_NAMES.SHOPIFY.EXPIRES_IN, expiresAt);

  // TODO localize this
  redirect('/no/no/account');
}
