'use server';

import { env } from '@/env';
import { removeVariantGid } from '@/lib/shopify/helpers';

export async function goToVippsHurtigkasse(activeVariantId: string) {
  if (!activeVariantId) {
    console.error('No active variant id found');
    return;
  }

  const formattedVariantId = removeVariantGid(activeVariantId);

  const items = [{ variant_id: formattedVariantId, quantity: 1 }];

  const baseUrl = env.BASE_URL;

  const response = await fetch(baseUrl + '/api/vipps/create-checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      items
    })
  });

  // const data = await response.json();

  // return data;
}
