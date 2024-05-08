import { COOKIE_NAMES } from '@/data/constants';
import { env } from '@/env';
import { getExpiryTime } from '@/lib/getExpiryTime';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  console.log('request');

  const cookieExpirationTime = await getExpiryTime();
  console.log('cookieExpirationTime', cookieExpirationTime);

  if (cookieExpirationTime) {
    console.log('cookieExpirationTime is null');
    const baseUrl = env.BASE_URL;
    const response = await fetch(baseUrl + '/api/shopify/refresh');
    console.log('response from refresh', response);
    const status = response.status;
    if (status !== 200) {
      throw new Error('Not a valid access token');
    }

    // const newToken = await getRefreshToken();
    // console.log('newToken', newToken);

    // if (!newToken) {
    // throw new Error('Not a valid access token');
    // }
  }

  const accessToken = cookies().get(COOKIE_NAMES.SHOPIFY.ACCESS_TOKEN)?.value;
  console.log('accessToken', accessToken);

  if (!accessToken) {
    throw new Error('No access token was found');
  }

  return new Response(JSON.stringify(accessToken), {
    status: 200,
    headers: { 'content-type': 'application/json' }
  });
}