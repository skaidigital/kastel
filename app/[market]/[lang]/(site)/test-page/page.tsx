import { Sheet, SheetContent, SheetTrigger } from '@/components/Sheet';
import { createCustomerAccessToken } from '@/lib/shopify';
import { addItemToWishlist, getWishlist, isItemInWishlist } from '@/lib/shopify/wishlist/hooks';
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

  // await deleteWishlist();
  // await addToWishlist(gid);
  // await removeFromWishlist(gid);
  const gid = 'gid://shopify/Product/8618931388645';
  const gid2 = 'gid://shopify/Product/9999999999999';

  const isItemInWishlistResponse = await isItemInWishlist(gid);

  await addItemToWishlist(gid2);
  console.log(isItemInWishlistResponse);

  return (
    <div className="flex flex-col">
      <SheetTest />
      Wishlist: {data}
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
