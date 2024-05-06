import { PopupCookieResponse } from '@/app/api/getPopupCookies/route';
import { useQuery } from '@tanstack/react-query';

async function getPopupCookies(): Promise<PopupCookieResponse> {
  const response = await fetch('/api/getPopupCookies');
  const data = await response.json();

  return data;
}

export function usePopupCookies() {
  const { data, isLoading } = useQuery({
    queryKey: ['popupCookies'],
    queryFn: async () => {
      const cookies = await getPopupCookies();
      return cookies;
    }
  });

  return { cookies: data, isLoading };
}
