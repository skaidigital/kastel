'use server';

import { env } from '@/env';

export async function getSmilePoints(email: string) {
  const smileResponse = await fetch(`https://api.smile.io/v1/customers?email=${email}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${env.SMILE_API_KEY}`
    }
  });

  const customer = await smileResponse.json();
  const points = customer.customers[0]?.points_balance || 0;

  return points;
}
