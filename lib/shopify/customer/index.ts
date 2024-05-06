'use server';

import { ExtractVariables } from '@/app/api/shopify/types';
import { isShopifyError } from '@/app/api/shopify/utils';
import { COOKIE_NAMES } from '@/data/constants';
import { env } from '@/env';
import { cookies } from 'next/headers';
import { logIn } from './actions';

const shopId = env.SHOPIFY_CUSTOMER_SHOP_ID;
const endpoint = `https://shopify.com/${shopId}/account/customer/api/2024-04/graphql`;

// TODO fix refersh token
export async function customerAccountFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  // const expiredCoockie = await getExpiryTime();

  // if (!expiredCoockie) {
  //   // const updatedToken = await getRefreshToken();
  //   const updatedToken =
  //     'atkn_CiEI9InZsQYQ9KP3sgaiARIKENlzlD4MfEm5nAjLR6urftISQF9PYkT-htO7d7YrwcLN-jgBRTmpLd8zecRBdmuvp-0iGqRO0XJzSNu0VZXiYhK4C_SqRAeF1ZC-Tq3PBw2zZAs';

  //   if (!updatedToken) {
  //     throw new Error('Not a valid access token');
  //   }
  // }
  const accessToken = cookies().get(COOKIE_NAMES.SHOPIFY.ACCESS_TOKEN)?.value;

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken || '',
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e: any) {
    if (e.message === 'Not a valid access token') {
      await logIn();
    }
    if (isShopifyError(e)) {
      throw {
        cause: e.cause?.toString() || 'unknown',
        status: e.status || 500,
        message: e.message,
        query
      };
    }

    throw {
      error: e,
      query
    };
  }
}
