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
  track(eventName, options);
}

export async function handleHasChosenMarket() {
  cookies().set(COOKIE_NAMES.HAS_CHOSEN_MARKET, 'true');
}
