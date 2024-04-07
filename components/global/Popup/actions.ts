'use server';

import { COOKIE_NAMES } from '@/data/constants';
import { cookies } from 'next/headers';

export async function hasSeenPopup() {
  const oneDay = 24 * 60 * 60 * 1000;
  cookies().set(COOKIE_NAMES.POPUP, 'true', {
    expires: new Date(Date.now() + oneDay)
  });
}
