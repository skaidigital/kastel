import { OrderDetailsPage } from '@/components/pages/OrderDetailsPage';
import { MarketValues } from '@/data/constants';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default function Page({
  params: { orderId }
}: {
  params: {
    orderId: string;
  };
}) {
  if (!orderId) {
    return notFound();
  }

  return <OrderDetailsPage orderId={orderId} />;
}

// TODO show the order number from Shopify instead (i.e. #1008)
export function generateMetadata({
  params
}: {
  params: {
    orderId: string;
  };
}): Metadata {
  return {
    title: `${getTitle()} ${params.orderId}`
  };
}

// TODO get market from params
function getTitle() {
  const market = 'no' as MarketValues;
  switch (market) {
    case 'no':
      return 'Ordre';
    case 'eu':
      return 'Order';
  }
}
