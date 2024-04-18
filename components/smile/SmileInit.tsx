'use client';

import { env } from '@/env';
import { useEffect } from 'react';

const channelKey = env.NEXT_PUBLIC_SMILE_CHANNEL_KEY;

interface Porps {
  customerId: string;
}

export default function SmileInit({ customerId }: Porps) {
  useEffect(() => {
    initializeSmileUI();

    async function initializeSmileUI() {
      if (window.SmileUI) {
        console.log('SmileUI is already loaded');
        return;
      }

      // Fetch the JWT from your API
      const response = await fetch('/api/smile/create-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ customer_id: customerId })
      });

      const { token: customer_identity_jwt } = await response.json();

      console.log(customer_identity_jwt);

      if (window.SmileUI) {
        window.SmileUI.init({
          channel_key: channelKey,
          customer_identity_jwt: customer_identity_jwt // Use the fetched JWT
        });
      }
    }

    if (!window.SmileUI) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://js.smile.io/v1/smile-ui.js';
      document.head.appendChild(script);
      script.onload = initializeSmileUI;
    } else {
      initializeSmileUI();
    }
  }, [customerId]);

  return null;
}
