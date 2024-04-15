'use server';

import { METAFIELDS } from '@/data/constants';
import { getCustomDataForUser, getWishlistForUser, updateCustomerName } from '..';
import { shopifyAdminQuery } from '../admin';
import { deleteWishlistQuery, metafieldsSetMutation } from './query';

// Get wishlist for user, returns array of product GIDs or empty array
export async function getWishlist(): Promise<string[]> {
  const wishlistResponse = await getWishlistForUser();

  return JSON.parse(wishlistResponse?.value) || [];
}

export async function deleteWishlist() {
  const wishlistResponse = await getWishlistForUser();

  if (!wishlistResponse) {
    return 'No wishlist found';
  }

  await deleteWishlistForUser({ gid: wishlistResponse.id });

  return 'Delete the wishlist';
}

// Check if item is in wishlist, returns boolean
export async function isItemInWishlist(itemGid: string) {
  const wishlistResponse = await getWishlist();

  return wishlistResponse.includes(itemGid);
}

export async function addItemToWishlist(customerGid: string, itemGid: string) {
  const wishlist = await getWishlist();

  if (wishlist.includes(itemGid)) {
    return 'Item already in wishlist';
  }
  wishlist.push(itemGid);

  await adjustItemsInWishlistForUser({ customerGid, wishlist });

  return 'Item added to wishlist';
}

export async function removeItemFromWishlist(customerGid: string, itemGid: string) {
  const wishlist = await getWishlist();

  if (!wishlist.includes(itemGid)) {
    return 'Item not in wishlist';
  }

  const newWishlist = wishlist.filter((item) => item !== itemGid);

  await adjustItemsInWishlistForUser({ customerGid, wishlist: newWishlist });

  return 'Item removed from wishlist';
}

// Admin function, sets new wishlist
async function adjustItemsInWishlistForUser({
  customerGid,
  wishlist
}: {
  customerGid: string;
  wishlist: string[];
}) {
  const metafields = [
    {
      key: METAFIELDS.customer.wishlist.key,
      namespace: METAFIELDS.customer.wishlist.namespace,
      type: METAFIELDS.customer.wishlist.type,
      ownerId: customerGid,
      value: JSON.stringify(wishlist)
    }
  ];

  const addItemToWishlistResponse = await shopifyAdminQuery(metafieldsSetMutation, { metafields });

  return addItemToWishlistResponse;
}

// Admin function, removes wishlist
async function deleteWishlistForUser({ gid }: { gid: string }) {
  const deleteWishlistResponse = await shopifyAdminQuery(deleteWishlistQuery, {
    id: gid
  });

  return deleteWishlistResponse;
}

// Get customer data for user
export async function getCustomerData() {
  const customerDataResponse = await getCustomDataForUser();

  console.log(customerDataResponse);

  return (customerDataResponse && JSON.parse(customerDataResponse?.value)) || {};
}

interface CustomerData {
  customerGid: string;
  data: {
    firstName: string;
    lastName: string;
    isPrompted?: boolean;
    footLength?: string;
    style?: string;
    color?: string;
  };
}

export async function updateCustomerData({ customerGid, data }: CustomerData) {
  const metafields = [
    {
      key: METAFIELDS.customer.customer_data.key,
      namespace: METAFIELDS.customer.customer_data.namespace,
      type: METAFIELDS.customer.customer_data.type,
      ownerId: customerGid,
      value: JSON.stringify({
        isPrompted: data.isPrompted,
        footLength: data.footLength,
        style: data.style,
        color: data.color
      })
    }
  ];
  let success: boolean = true;
  // Update first and last name
  const updateCustomerNameResponse = await updateCustomerName(data.firstName, data.lastName);

  if (!updateCustomerNameResponse) {
    console.log('Error updating customer name', updateCustomerNameResponse);
    success = false;
  }

  // Update customer metadata for user
  const updateCustomerDataResponse = await shopifyAdminQuery(metafieldsSetMutation, { metafields });

  if (!updateCustomerDataResponse) {
    console.log('Error updating customer data', updateCustomerDataResponse);
    success = false;
  }

  const updatedMetaData =
    (updateCustomerDataResponse?.data.metafieldsSet &&
      JSON.parse(updateCustomerDataResponse?.data.metafieldsSet?.metafields[0]?.value)) ||
    {};

  const responseForm: CustomerData['data'] = {
    firstName: updateCustomerNameResponse.firstName || '',
    lastName: updateCustomerNameResponse.lastName || '',
    isPrompted: updatedMetaData.isPrompted || false,
    footLength: updatedMetaData.footLength || '',
    style: updatedMetaData.style || '',
    color: updatedMetaData.color || ''
  };

  return { success, responseForm };
}
