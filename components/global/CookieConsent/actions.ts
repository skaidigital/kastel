'use server';

import { ANALTYICS_EVENT_NAME, COOKIE_NAMES } from '@/data/constants';
import { track } from '@vercel/analytics/server';
import { cookies } from 'next/headers';

const oneYear = 60 * 60 * 24 * 365;

export async function onAccept() {
  cookies().set(COOKIE_NAMES.COOKIE_CONSENT, 'true', {
    maxAge: oneYear,
    path: '/',
    sameSite: 'lax'
  });

  track(ANALTYICS_EVENT_NAME.CONSENT, {
    type: 'accept'
  });
}

export async function onReject() {
  cookies().set(COOKIE_NAMES.COOKIE_CONSENT, 'false', {
    maxAge: oneYear,
    path: '/',
    sameSite: 'lax'
  });

  track(ANALTYICS_EVENT_NAME.CONSENT, {
    type: 'reject'
  });
}
