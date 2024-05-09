'use client';

import { ANALTYICS_EVENT_NAME } from '@/data/constants';
import { sendGTMEvent } from '@next/third-parties/google';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // GTM – Analytics
    sendGTMEvent({ eventName: ANALTYICS_EVENT_NAME.VIEW_ITEM, pagePath: pathname });
  }, []);

  return <div>{children}</div>;
}
