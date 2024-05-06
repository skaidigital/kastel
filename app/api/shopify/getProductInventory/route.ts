import { getProductInventory } from '@/components/ProductForm/hooks';

export async function POST(request: Request) {
  const { id } = await request.json();
  const response = await getProductInventory(id);

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'content-type': 'application/json' }
  });
}
