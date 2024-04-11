import { Sheet, SheetContent, SheetTrigger } from '@/components/Sheet';
import { createCustomerAccessToken } from '@/lib/shopify';
import {
  addItemToWishlist,
  getWishlist,
  isItemInWishlist,
  removeItemFromWishlist
} from '@/lib/shopify/wishlist/hooks';
import { cookies } from 'next/headers';

export default async function Page() {
  let accessToken = cookies().get('accessToken')?.value;

  if (!accessToken) {
    const token = await createCustomerAccessToken('petter@skaidigital.com', 'testtest');
    accessToken = token.accessToken;
    console.log(token);
  }

  const data = await getWishlist();
  // console.log(data);

  //! This one deletes the wishlist
  // await deleteWishlist();

  const gid = 'gid://shopify/Product/8618931388645';
  const customerGid = 'gid://shopify/Customer/7742157848805';
  let removeItemResponse;
  let addItemResponse;

  const isInWishlist = await isItemInWishlist(gid);

  if (isInWishlist) {
    console.log('Item is in wishlist');
    removeItemResponse = await removeItemFromWishlist(customerGid, gid);
  } else {
    console.log('Item is not in wishlist');
    addItemResponse = await addItemToWishlist(customerGid, gid);
  }

  console.log(isInWishlist);

  return (
    <div className="flex flex-col">
      <SheetTest />
      <p> Wishlist: {data}</p>
      <p>isItemInWishlistResponse: {String(isInWishlist)}</p>
      <p>addItemResponse: {addItemResponse || 'Not ran now'}</p>
      <p>removeItemResponse: {removeItemResponse || 'Not ran now'}</p>
    </div>
  );
}

function SheetTest() {
  return (
    <Sheet>
      <SheetTrigger>Test</SheetTrigger>
      <SheetContent title="Test">My content is here</SheetContent>
    </Sheet>
  );
}

// Login function
