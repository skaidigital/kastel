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

export function generateMetadata({
  params: { orderId, market }
}: {
  params: {
    orderId: string;
    market: MarketValues;
  };
}): Metadata {
  return {
    title: `${getTitle(market)} ${orderId}`
  };
}

function getTitle(market: MarketValues) {
  switch (market) {
    case 'no':
      return 'Ordre';
    case 'sv':
      return 'Order';
    default:
      throw new Error(`Unknown market: ${market}`);
  }
}
