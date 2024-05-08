// TODO redirect once we have the required ID to make the flow work
export async function POST(request: Request) {
  const body = await request.json();

  if (!body) {
    return new Response(JSON.stringify({ success: false }), { status: 400 });
  }

  const shop = 'kastel-shoes.myshopify.com';

  const url = new URL(`https://crude-hurtigkasse-2.herokuapp.com/api/gateway/start`);

  url.searchParams.append('shop', shop);
  url.searchParams.append('cart', JSON.stringify(body));
  url.searchParams.append('url', 'https://kastel.myshopify.com/');
  url.searchParams.append('token', 'Z2NwLXVzLWNlbnRyYWwxOjAxSFdNRFhKM1kzVDdDWkU0WVJCUzVKNk1N');

  return new Response(JSON.stringify(url), {
    headers: {
      'content-type': 'application/json'
    }
  });
  //   //   // redirect to url
  //   return Response.redirect(url.toString(), 302);
}
