'use client';

import { useShopifyAnalytics } from '@/app/(site)/shopify/hooks/useShopifyAnalytics';
import { AnalyticsEventName } from '@shopify/hydrogen-react';
import { useEffect } from 'react';

interface Props {
  hasConsent: boolean;
}

export default function ShopifyAnalytics({ hasConsent }: Props) {
  const { sendPageView, pathname } = useShopifyAnalytics();

  useEffect(() => {
    if (hasConsent) {
      sendPageView(AnalyticsEventName.PAGE_VIEW);
    }
  }, [pathname, sendPageView, hasConsent]);
  return null;
}
