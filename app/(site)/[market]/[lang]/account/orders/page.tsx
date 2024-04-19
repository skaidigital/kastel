import { OrdersPage } from '@/components/pages/OrdersPage';

export default function Page({
  searchParams
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;

  return <OrdersPage currentPage={currentPage} />;
}
