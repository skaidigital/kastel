'use server';

import { VariantChanges } from '@/components/sanity/customComponents/bulkVariantEditForm';
import { COOKIE_NAMES, LangValues, MarketValues } from '@/data/constants';
import { cookies } from 'next/headers';
import { adminClient } from './adminClient';

export async function setPreviewMarket(market: MarketValues) {
  cookies().set(COOKIE_NAMES.PREVIEW_MARKET, market);

  return { success: true };
}

export async function setPreviewLang(lang: LangValues) {
  cookies().set(COOKIE_NAMES.PREVIEW_LANG, lang);

  return { success: true };
}

export async function bulkUpdateVariants(data: VariantChanges) {
  try {
    const transaction = adminClient.transaction();
    for (const [id, changes] of Object.entries(data)) {
      transaction.patch(id, (patch) => patch.set(changes));
    }
    await transaction.commit();
    return true;
  } catch (error) {
    console.error('Transaction failed: ', error);
    return false;
  }
}
