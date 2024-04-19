import { AccountPage } from '@/components/pages/AccountPage';
import { MarketValues } from '@/data/constants';
import { logIn } from '@/lib/shopify/customer/actions';
import { useUser } from '@/lib/useUser';
import { Metadata } from 'next';

export default async function Page({
  searchParams
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const { isLoggedIn } = useUser();

  if (!isLoggedIn) {
    await logIn();
  }

  const currentPage = Number(searchParams?.page) || 1;

  return <AccountPage currentPage={currentPage} />;
}

export const metadata: Metadata = {
  title: getTitle()
};

// TODO get market from params
function getTitle() {
  const market = 'no' as MarketValues;

  switch (market) {
    case 'no':
      return 'Konto';
    case 'sv':
      return 'Account';
  }
}
