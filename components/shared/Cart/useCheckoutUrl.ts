import { useQuery } from '@tanstack/react-query';

// TODO update cache when you log in etch
async function getCheckoutUrl(isLoggedIn: boolean) {
  const checkoutUrlResponse = await fetch('/api/shopify/getCheckoutUrl', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ isLoggedIn })
  });
  const checkoutUrl = await checkoutUrlResponse.json();

  return checkoutUrl;
}

export function useCheckoutUrl(isLoggedIn: boolean) {
  const response = useQuery({
    queryKey: ['checkoutUrl'],
    queryFn: async () => {
      return getCheckoutUrl(isLoggedIn);
    }
  });

  return { checkoutUrl: response.data, isLoading: response.isLoading };
}
