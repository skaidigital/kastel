/* eslint-disable no-unused-vars */
import { COOKIE_NAMES } from '@/data/constants';
import { refreshAccessToken } from '@/lib/shopify/customer/actions';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log('refreshToken:', body);

  // const token = cookies().get(COOKIE_NAMES.SHOPIFY.REFRESH_TOKEN);
  console.log(body);

  // const refreshToken = token?.value || '';
  // const cookiesRequest = request.cookies;
  // console.log(cookiesRequest);

  // const refreshToken = cookiesRequest.refreshToken || '';
  // console.log(refreshToken);

  // const refreshToken = cookies().get(COOKIE_NAMES.SHOPIFY.REFRESH_TOKEN)?.value || '';

  // if (!refreshToken) {
  //   console.log('No refresh token');

  //   return new Response('No refresh token', { status: 401 });
  // }

  try {
    const response = await refreshAccessToken(body.refreshToken);

    console.log('Response:', response);

    if (!response.access_token) {
      return new Response('No access token', {
        status: 401,
        statusText: 'No access token'
      });
    }
    const { access_token, expires_in, refresh_token } = response;

    const bufferTime = 300; // 5 minutes

    const expiresAt = new Date(Date.now() + (expires_in - bufferTime) * 1000).toString();

    cookies().set(COOKIE_NAMES.SHOPIFY.ACCESS_TOKEN, access_token);
    cookies().set(COOKIE_NAMES.SHOPIFY.EXPIRES_IN, expiresAt);
    cookies().set(COOKIE_NAMES.SHOPIFY.REFRESH_TOKEN, refresh_token);

    return new Response('Refreshed', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
}
