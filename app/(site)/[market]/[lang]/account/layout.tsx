import { LinkItem } from '@/app/(site)/[market]/[lang]/account/(overview)/LinkItem';
import { getDictionary } from '@/app/dictionaries';
import { Container } from '@/components/base/Container';
import { ROUTES } from '@/data/constants';
import { getExpiryTime } from '@/lib/getExpiryTime';
import { logIn, logOut } from '@/lib/shopify/customer/actions';
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  const expiredCoockie = await getExpiryTime();
  const { account_layout: dictionary } = await getDictionary();

  if (!expiredCoockie) {
    await logIn();
  } else {
  }

  return (
    // TODO recheck these classes later on
    <Container className="mt-8 min-h-dvh lg:mt-10 lg:grid lg:grid-cols-12 lg:gap-4">
      <aside className="hidden lg:col-span-2 lg:col-start-2 lg:block">
        <nav className="flex w-full flex-col gap-y-4">
          <LinkItem href={ROUTES.ACCOUNT}>{dictionary.my_account}</LinkItem>
          <LinkItem href={ROUTES.ORDERS}>{dictionary.orders}</LinkItem>
          <LinkItem href={`${ROUTES.ADDRESSES}`}>{dictionary.addresses}</LinkItem>
          <LinkItem href={`${ROUTES.WISHLIST}`}>{dictionary.wishlist}</LinkItem>
          <LinkItem href={`${ROUTES.ACCOUNT_CUSTOMER_SERVICE}`}>
            {dictionary.customer_service}
          </LinkItem>
        </nav>
        <form
          action={async () => {
            'use server';
            await logOut();
          }}
        >
          <button className="mt-4 text-sm text-brand-mid-grey" type="submit">
            {dictionary.log_out}
          </button>
        </form>
      </aside>
      <div className="flex-grow md:overflow-y-auto">{children}</div>
    </Container>
  );
}
