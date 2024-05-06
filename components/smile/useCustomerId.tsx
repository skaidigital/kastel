import { useQuery } from '@tanstack/react-query';

export function useCustomerId() {
  return useQuery({
    queryKey: ['customerId'],
    queryFn: async () => {
      const response = await fetch('/api/smile/getCustomerId');
      const data = await response.json();
      return data;
    }
  });
}
