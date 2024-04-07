'use server';

import { MarketValues } from '@/data/constants';
import { cookies, draftMode } from 'next/headers';

export async function getMarket() {
  if (draftMode().isEnabled) {
    const previewMarket = cookies().get('previewMarket')?.value || 'no';
    return previewMarket as MarketValues;
  }
  const market = 'no' as MarketValues;

  return market;
}
