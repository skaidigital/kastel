import { getWishlist } from '@/lib/shopify';

const STATUS_CODE = {
  OK: 200,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

export async function GET(request: Request) {
  // get customer id from cookies

  const getWishlistResponse = await getWishlist();
  const responseData = JSON.stringify(getWishlistResponse);
  return new Response(responseData, {
    status: STATUS_CODE.OK
  });
}

export async function DELETE(request: Request) {
  const responseData = JSON.stringify('Delete the wishlist');
  return new Response(responseData, {
    status: STATUS_CODE.OK
  });
}
