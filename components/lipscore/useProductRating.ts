'use client';

import { getProductRatingBySku } from '@/components/lipscore/hook';
import { useQuery } from '@tanstack/react-query';

export function useProductRating(sku: string) {
  return useQuery({
    queryKey: ['product-rating', sku],
    queryFn: async () => {
      const response = await getProductRatingBySku(sku);
      return response;
    },
    enabled: !!sku
  });
}
