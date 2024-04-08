'use server';

import { COOKIE_NAMES } from '@/data/constants';
import { cookies } from 'next/headers';

export async function handleHasChosenMarket() {
  cookies().set(COOKIE_NAMES.HAS_CHOSEN_MARKET, 'true');
}
