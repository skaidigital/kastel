import { Cart } from '@/lib/shopify/types';
import { useQuery } from '@tanstack/react-query';

async function getCart(): Promise<{ cart: Cart | null }> {
  const cartResponse = await fetch('/api/shopify/getCart', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const cart = await cartResponse.json();

  return cart;
}

export function useCart() {
  const response = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      return getCart();
    }
  });

  return { cart: response.data?.cart || undefined, isLoading: response.isLoading };
}
