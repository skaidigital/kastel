'use server';

import { COOKIE_NAMES } from '@/data/constants';
import { cookies } from 'next/headers';

export async function setActiveTypeName(activeTypeName: string) {
  const oneHour = 60 * 60;

  cookies().set(COOKIE_NAMES.SHOE_PICKER_ACTIVE_TYPE_NAME, activeTypeName, {
    maxAge: oneHour,
    path: '/',
    sameSite: 'strict'
  });
}
