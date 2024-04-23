import { getDictionary } from '@/app/dictionaries';
import { Breadcrumb, Breadcrumbs } from '@/components/Breadcrumbs';
import { Container } from '@/components/base/Container';
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  const { product_layout: dictionary } = await getDictionary();

  return (
    <>
      <Container className="mb-5 mt-5 lg:mb-0">
        <Breadcrumbs className="truncate">
          <Breadcrumb href="/">{dictionary.home}</Breadcrumb>
          <Breadcrumb href="/">{dictionary.products}</Breadcrumb>
        </Breadcrumbs>
      </Container>
      {children}
    </>
  );
}
