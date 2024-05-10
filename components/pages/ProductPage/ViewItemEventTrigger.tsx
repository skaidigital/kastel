'use client';

import { ANALTYICS_EVENT_NAME } from '@/data/constants';
import { ViewItemEventObject } from '@/lib/gtm';
import { sendGTMEvent } from '@next/third-parties/google';
import { useEffect } from 'react';

interface Props {
  productId: string;
  productTitle: string;
  price: number;
}

export function ViewItemEventTrigger({ productId, productTitle, price }: Props) {
  const viewItemTrackingData: ViewItemEventObject | undefined = {
    event: ANALTYICS_EVENT_NAME.VIEW_ITEM,
    ecommerce: {
      currency: 'NOK',
      items: [
        {
          item_id: productId,
          item_name: productTitle,
          item_brand: 'Kastel Shoes',
          price: price
        }
      ]
    }
  };

  useEffect(() => {
    sendGTMEvent(viewItemTrackingData);
  }, []);

  return null;
}
