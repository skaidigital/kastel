import { AccountPage } from '@/components/pages/AccountPage';
import { MarketValues } from '@/data/constants';
import { env } from '@/env';
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

function getTitle() {
  const market = env.NEXT_PUBLIC_MARKET as MarketValues;
  switch (market) {
    case 'dk':
      return 'Konto';
    case 'no':
      return 'Konto';
    case 'sv':
      return 'Konto';
    case 'eu':
      return 'Account';
  }
}
