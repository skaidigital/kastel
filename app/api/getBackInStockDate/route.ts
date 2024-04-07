import { getBackInStockBySku } from '@/lib/drizzle/hooks';

export async function POST(request: Request) {
  const { sku } = await request.json();
  // const sku = '696969';

  const backInStockResponse = await getBackInStockBySku(sku);

  if (backInStockResponse.success) {
    const backInStockDate = backInStockResponse.data[0]?.expected_in_date;

    const formattedDate = backInStockDate?.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'numeric',
      year: '2-digit'
    });

    return Response.json({ backInStockDate: formattedDate }, { status: 200 });
  }

  return new Response(null, { status: 404 });
}
