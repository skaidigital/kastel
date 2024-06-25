'use server'

import { getCustomerId } from '@/components/smile/hooks'
import { METAFIELDS } from '@/data/constants'
import { shopifyAdminQuery } from '../admin'
import { getWishlist } from './getWishlist'
import { metafieldsSetMutation } from './query'

export async function addItemToWishlist(itemGid: string) {
  const wishlist = await getWishlist()

  if (wishlist.includes(itemGid)) {
    return 'Item already in wishlist'
  }
  wishlist.push(itemGid)

  const customerGid = await getCustomerId()

  if (!customerGid) {
    return 'No customer found'
  }

  await adjustItemsInWishlistForUser({ customerGid, wishlist })

  return 'Item added to wishlist'
}

export async function removeItemFromWishlist(itemGid: string) {
  const wishlist = await getWishlist()

  if (!wishlist.includes(itemGid)) {
    return 'Item not in wishlist'
  }
  const customerGid = await getCustomerId()

  if (!customerGid) {
    return 'No customer found'
  }

  const newWishlist = wishlist.filter((item) => item !== itemGid)

  await adjustItemsInWishlistForUser({ customerGid, wishlist: newWishlist })

  return 'Item removed from wishlist'
}

// Admin function, sets new wishlist
async function adjustItemsInWishlistForUser({
  customerGid,
  wishlist
}: {
  customerGid: string
  wishlist: string[]
}) {
  const metafields = [
    {
      key: METAFIELDS.customer.wishlist.key,
      namespace: METAFIELDS.customer.wishlist.namespace,
      type: METAFIELDS.customer.wishlist.type,
      ownerId: customerGid,
      value: JSON.stringify(wishlist)
    }
  ]

  const addItemToWishlistResponse = await shopifyAdminQuery(metafieldsSetMutation, { metafields })

  return addItemToWishlistResponse
}
