'use server';

import { COOKIE_NAMES } from '@/data/constants';
import { env } from '@/env';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const clientId = env.SHOPIFY_CUSTOMER_CLIENT_ID;
const clientSecret = env.SHOPIFY_CUSTOMER_CLIENT_SECRET;
const shopId = env.SHOPIFY_CUSTOMER_SHOP_ID;
const callbackURIRoot = env.BASE_URL;

const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
}

export async function logIn() {
  const authorizationRequestUrl = new URL(`https://shopify.com/${shopId}/auth/oauth/authorize`);
  authorizationRequestUrl.searchParams.append(
    'scope',
    'openid email https://api.customers.com/auth/customer.graphql'
  );
  authorizationRequestUrl.searchParams.append('client_id', clientId);
  authorizationRequestUrl.searchParams.append('response_type', 'code');
  authorizationRequestUrl.searchParams.append(
    'redirect_uri',
    `${callbackURIRoot}/api/shopify/auth`
  );
  authorizationRequestUrl.searchParams.append('state', await generateState());
  authorizationRequestUrl.searchParams.append('nonce', await generateNonce(10));

  redirect(authorizationRequestUrl.toString());
}

export async function getAccessToken(code: string, state: string) {
  const body = new URLSearchParams();

  body.append('grant_type', 'authorization_code');
  body.append('client_id', clientId);
  body.append('redirect_uri', `${callbackURIRoot}/api/shopify/auth`);
  body.append('code', code);
  body.append('state', state);

  // append option for nonce

  const response = await fetch(`https://shopify.com/${shopId}/auth/oauth/token`, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${credentials}`
    },
    body
  });

  const data = await response.json();

  const error = data.error;

  if (error) {
    console.error('error', error);
    return { success: false, error };
  }

  return { success: true, data };
}

export async function getExchangedAccessToken(accessToken: string) {
  const body = new URLSearchParams();

  body.append('grant_type', 'urn:ietf:params:oauth:grant-type:token-exchange');
  body.append('client_id', clientId);
  body.append('audience', '30243aa5-17c1-465a-8493-944bcc4e88aa');
  body.append('subject_token', accessToken);
  body.append('subject_token_type', 'urn:ietf:params:oauth:token-type:access_token');
  body.append('scopes', 'https://api.customers.com/auth/customer.graphql');

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${credentials}`
  };

  const response = await fetch(`https://shopify.com/${shopId}/auth/oauth/token`, {
    method: 'POST',
    headers: headers,
    body
  });

  interface AccessTokenResponse {
    access_token: string;
    expires_in: number;
  }

  const { access_token, expires_in } = (await response.json()) as AccessTokenResponse;

  return { access_token, expires_in };
}

export async function refreshAccessToken(refreshToken: string): Promise<AccessTokenResponse> {
  const body = new URLSearchParams();

  console.log(refreshToken);

  body.append('grant_type', 'refresh_token');
  body.append('client_id', clientId);
  body.append('refresh_token', refreshToken);

  const response = await fetch(`https://shopify.com/${shopId}/auth/oauth/token`, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${credentials}`
    },
    body
  });

  const jsonResponse = await response.json();

  console.log(jsonResponse);

  // const { access_token, expires_in, refresh_token } = jsonResponse;

  // // cookies().set(COOKIE_NAMES.SHOPIFY.ID_TOKEN, id_token);
  // cookies().set(COOKIE_NAMES.SHOPIFY.ACCESS_TOKEN, access_token);
  // cookies().set(COOKIE_NAMES.SHOPIFY.EXPIRES_IN, expires_in);
  // cookies().set(COOKIE_NAMES.SHOPIFY.REFRESH_TOKEN, refresh_token);
  // cookies().set('test', 'test1');

  return jsonResponse;
}

export async function logOut() {
  const idToken = cookies().get(COOKIE_NAMES.SHOPIFY.ID_TOKEN)?.value || '';

  const logoutUrl = new URL(`https://shopify.com/${shopId}/auth/logout`);

  logoutUrl.searchParams.append('id_token_hint', `${idToken}`);
  logoutUrl.searchParams.append('post_logout_redirect_uri', `${callbackURIRoot}/`);

  cookies().delete(COOKIE_NAMES.SHOPIFY.ACCESS_TOKEN);
  cookies().delete(COOKIE_NAMES.SHOPIFY.REFRESH_TOKEN);
  cookies().delete(COOKIE_NAMES.SHOPIFY.EXPIRES_IN);
  cookies().delete(COOKIE_NAMES.SHOPIFY.ID_TOKEN);

  redirect(logoutUrl.toString());
}

// Helper functions
export async function generateState(): Promise<string> {
  const timestamp = Date.now().toString();
  const randomString = Math.random().toString(36).substring(2);
  return timestamp + randomString;
}

export async function generateNonce(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let nonce = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    nonce += characters.charAt(randomIndex);
  }

  return nonce;
}

export async function getNonce(token: string) {
  // return await decodeJwt(token).payload.nonce;
  const { payload } = await decodeJwt(token);
  if (!payload.nonce) throw new Error('Invalid JWT');

  return payload.nonce;
}

export async function decodeJwt(token: string) {
  const [header, payload, signature] = token.split('.');

  if (!header || !payload || !signature) throw new Error('Invalid JWT');

  const decodedHeader = JSON.parse(atob(header));
  const decodedPayload = JSON.parse(atob(payload));

  return {
    header: decodedHeader,
    payload: decodedPayload,
    signature
  };
}

// https://shopify.com/<shop_id>/account/customer/api/unstable/graphql
// export async function getOrders() {

// }
