import SmileInit from '@/components/SmileInit';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  // const hasConsent = cookies().get(COOKIE_NAMES.COOKIE_CONSENT)?.value === 'true';

  console.log('layout');

  return (
    <>
      <SmileInit customerId="7292377628922" />
      {children}
    </>
  );
}
