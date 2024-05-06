'use client';

import { useQuery } from '@tanstack/react-query';

async function getIsLoggedIn() {
  const response = await fetch('/api/isLoggedIn');
  const { isLoggedIn } = await response.json();

  return isLoggedIn;
}

export function useUser() {
  const { data: isLoggedIn } = useQuery({
    queryKey: ['isLoggedIn'],
    queryFn: async () => {
      return getIsLoggedIn();
    }
  });

  return { isLoggedIn };
}
