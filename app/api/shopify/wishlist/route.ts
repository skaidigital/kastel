import { getWishlistQuery } from '@/lib/shopify/wishlist/wishlist';

const STATUS_CODE = {
  OK: 200,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

export async function GET(request: Request) {
  // get customer id from cookies
  const responseData = JSON.stringify('Get the wishlist');
  return new Response(responseData, {
    status: STATUS_CODE.OK
  });
}

function getWishlist() {
  // get customer id from cookies
  const customerId = '7742157848805';

  const query = getWishlistQuery;
}

export async function DELETE(request: Request) {
  const responseData = JSON.stringify('Delete the wishlist');
  return new Response(responseData, {
    status: STATUS_CODE.OK
  });
}
