'use server';

import { COOKIE_NAMES } from '@/data/constants';
import { TrackEventOptions } from '@/lib/types';
import { track } from '@vercel/analytics/server';
import { cookies } from 'next/headers';

interface TrackEvent {
  eventName: string;
  options?: TrackEventOptions;
}

export async function trackEvent({ eventName, options }: TrackEvent) {
  const hasConsent = cookies().get(COOKIE_NAMES.COOKIE_CONSENT)?.value === 'true';

  if (!hasConsent) {
    return;
  }

  track(eventName, options);
}
