'use server';

import { COOKIE_NAMES, LangValues, MarketValues } from '@/data/constants';
import { cookies } from 'next/headers';

export async function setPreviewMarket(market: MarketValues) {
  cookies().set(COOKIE_NAMES.PREVIEW_MARKET, market);

  return { success: true };
}

export async function setPreviewLang(lang: LangValues) {
  cookies().set(COOKIE_NAMES.PREVIEW_LANG, lang);

  return { success: true };
}
