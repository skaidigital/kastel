import { LinkItem } from '@/app/(site)/[market]/[lang]/(dynamic)/account/(has-sidebar)/LinkItem';
import { getDictionary } from '@/app/dictionaries';
import { Container } from '@/components/base/Container';
import { COOKIE_NAMES, LangValues, ROUTES } from '@/data/constants';
import { getExpiryTime } from '@/lib/getExpiryTime';
import { handleRefreshToken } from '@/lib/getRefreshToken';
import { logIn, logOut } from '@/lib/shopify/customer/actions';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';

interface Props {
  params: { lang: LangValues };
  children: ReactNode;
}

export default async function Layout({ params: { lang }, children }: Props) {
  const expiredCoockie = await getExpiryTime();
  const refreshToken = cookies().get(COOKIE_NAMES.SHOPIFY.REFRESH_TOKEN)?.value;
  const { account_layout: dictionary } = await getDictionary({ lang });

  if (!expiredCoockie && refreshToken) {
    const updatedToken = await handleRefreshToken();

    if (!updatedToken) {
      await logIn();
    }
  }

  if (!expiredCoockie && !refreshToken) {
    await logIn();
  }

  return (
    // TODO recheck these classes later on
    <Container className="min-h-dvh">
      <div className=" mt-8 lg:mt-10 lg:grid lg:grid-cols-12 lg:gap-4">
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
        {children}
      </div>
    </Container>
  );
}
