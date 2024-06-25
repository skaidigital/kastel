'use server'

import { CACHE_TAGS } from '@/data/constants'
import { revalidateTag } from 'next/cache'

export async function revalidateWishlistProducts() {
  revalidateTag(CACHE_TAGS.WISHLIST_PRODUCTS)
  return true
}
