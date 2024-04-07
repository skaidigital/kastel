'use server';

import { MarketValues } from '@/data/constants';
import { env } from '@/env';
import { cookies, draftMode } from 'next/headers';

export async function getMarket() {
  if (draftMode().isEnabled) {
    const previewMarket = cookies().get('previewMarket')?.value || 'no';
    return previewMarket as MarketValues;
  }
  const market = env.NEXT_PUBLIC_MARKET as MarketValues;

  return market;
}
