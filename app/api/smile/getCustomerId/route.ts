import { getCustomerId } from '@/components/smile/hooks';

export async function GET(request: Request) {
  const customerId = await getCustomerId();

  return new Response(JSON.stringify({ customerId }), {
    status: 200
  });
}
