import LipscoreInit from '@/components/lipscore/LipscoreInit';
import SmileInit from '@/components/smile/SmileInit';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SmileInit customerId="7292377628922" />
      <LipscoreInit />
      {children}
    </>
  );
}
