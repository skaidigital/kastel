'use server';

import { COOKIE_NAMES } from '@/data/constants';
import { env } from '@/env';
import { cookies } from 'next/headers';

export async function handleRefreshToken() {
  const refreshToken = cookies().get(COOKIE_NAMES.SHOPIFY.REFRESH_TOKEN)?.value;

  if (!refreshToken) {
    console.log('No refresh token');
    return false;
  }

  const response = await fetch(`${env.BASE_URL}/api/shopify/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refreshToken })
  });

  const status = response.status;
  if (status === 200) {
    return true;
  }
  return false;
}
