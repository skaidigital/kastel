'use client';

import { ProductInventoryResponse } from '@/components/ProductForm/hooks';
import { useQuery } from '@tanstack/react-query';

async function getProductInventory(id: string): Promise<ProductInventoryResponse> {
  const response = await fetch(`/api/shopify/getProductInventory`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  });

  const data = await response.json();

  return data;
}

// TODO set maxAge for this thing
export function useProductInventory(productId: string) {
  return useQuery({
    queryKey: ['productInventory', productId],
    queryFn: async () => {
      const response = await getProductInventory(productId);
      return response;
    },
    enabled: !!productId
  });
}
