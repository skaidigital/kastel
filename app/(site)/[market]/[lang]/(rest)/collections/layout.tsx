import { Breadcrumb, Breadcrumbs } from '@/components/Breadcrumbs';
import { Container } from '@/components/base/Container';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Container className="mt-5">
        <Breadcrumbs>
          <Breadcrumb href="/">Home</Breadcrumb>
          <Breadcrumb href="/">Products</Breadcrumb>
        </Breadcrumbs>
      </Container>
      {children}
    </>
  );
}
