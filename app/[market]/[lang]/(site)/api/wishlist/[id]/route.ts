const STATUS_CODE = {
  OK: 200,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

export async function GET(request: Request) {
  const responseData = JSON.stringify('Get an item from the wishlist');
  return new Response(responseData, {
    status: STATUS_CODE.OK
  });
}

export async function DELETE(request: Request) {
  const responseData = JSON.stringify('Delete an item from the wishlist');
  return new Response(responseData, {
    status: STATUS_CODE.OK
  });
}
