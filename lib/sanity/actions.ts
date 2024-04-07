'use server';

import { cookies } from 'next/headers';

export async function setPreviewMarket(market: string) {
  cookies().set('previewMarket', market);

  return { success: true };
}
