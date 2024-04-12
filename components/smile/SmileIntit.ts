import { env } from '@/env';

export function SmileInit({ customerId }: { customerId: string }) {
  if (typeof window === 'undefined') {
    // This means we're running server-side, where the window object is not available.
    // We can simply return without doing anything.
    return;
  }

  if (window.SmileUI) {
    console.log('SmileUI is already loaded and initialized.');
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://js.smile.io/v1/smile-ui.js';
  document.head.appendChild(script);
  script.onload = () => initializeSmileUI(customerId);
  return;
}

async function initializeSmileUI(customerId: string) {
  if (window.SmileUI) {
    console.log('SmileUI is already loaded and initialized.');
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

  if (window.SmileUI) {
    window.SmileUI.init({
      channel_key: env.NEXT_PUBLIC_SMILE_CHANNEL_KEY,
      customer_identity_jwt: customer_identity_jwt // Use the fetched JWT
    });
  }
}
