'use server'

import { COOKIE_NAMES } from '@/data/constants'
import { cookies } from 'next/headers'

export async function getExpiryTime() {
  const expiryTime = (cookies().get(COOKIE_NAMES.SHOPIFY.EXPIRES_IN)?.value as string) || null

  // If no expiry time, return null or if the expiry time is in the past return null
  if (!expiryTime || new Date(expiryTime) < new Date()) {
    return null
  }

  return expiryTime
}
