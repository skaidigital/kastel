import { LinkItem } from '@/app/(site)/[market]/[lang]/account/(overview)/LinkItem';
import { getDictionary } from '@/app/dictionaries';
import { Button } from '@/components/Button';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
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
    <aside className="flex min-h-[800px] flex-col lg:h-full lg:flex-row lg:overflow-hidden">
      <div className="border-brand-border w-full flex-none border-r lg:w-64">
        <Container className="mt-10 flex w-full lg:hidden">
          <nav className="flex space-x-3">
            <LinkItem href={ROUTES.ACCOUNT} className=" ">
              {dictionary.orders}
            </LinkItem>
            <LinkItem href={`${ROUTES.ACCOUNT}/addresses`}>{dictionary.addresses}</LinkItem>
          </nav>
        </Container>
        <Section
          noBottomPadding
          label="account-page-nav"
          srHeading="Account pages nav"
          className="hidden h-full shrink-0 flex-col justify-between lg:flex"
        >
          <nav className="flex w-full flex-col space-y-2 px-2">
            <Heading as="h2" size="sm" className="mb-3">
              {dictionary.my_account}
            </Heading>
            <LinkItem href={ROUTES.ACCOUNT}>{dictionary.orders}</LinkItem>
            <LinkItem href={`${ROUTES.ADDRESSES}`}>{dictionary.addresses}</LinkItem>
          </nav>
          <form
            action={async () => {
              'use server';
              await logOut();
            }}
          >
            <Button variant="secondary" className="border-x-0 border-b-0" type="submit">
              {dictionary.log_out}
            </Button>
          </form>
        </Section>
      </div>
      <div className="flex-grow md:overflow-y-auto">{children}</div>
    </aside>
  );
}
