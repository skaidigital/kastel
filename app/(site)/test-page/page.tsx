'use client';

import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    async function initializeSmileUI() {
      console.log('initializeSmileUI');

      // Fetch the JWT from your API
      const response = await fetch('/api/smile/create-token');
      console.log(response);

      const token = await response.json();
      console.log(token);

      if (window.SmileUI) {
        console.log('SmileUI is loaded');

        window.SmileUI.init({
          channel_key: 'channel_QZQVoTCqzCwME1a8iUCbovIx',
          customer_identity_jwt: token // Use the fetched JWT
        });
      }
    }

    if (!window.SmileUI) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://js.smile.io/v1/smile-ui.js';
      script.onload = initializeSmileUI;
      document.head.appendChild(script);
    } else {
      initializeSmileUI();
    }
  }, []);

  return (
    <>
      {' '}
      <p>test</p>{' '}
    </>
  );
}
