'use client';

import { PopupLayout } from '@/components/global/Popup/PopupLayout';
import { LangValues } from '@/data/constants';
import { useQuery } from '@tanstack/react-query';

function usePopup(lang: LangValues) {
  return useQuery({
    queryKey: ['popup'],
    queryFn: async () => {
      const response = await fetch('/api/sanity/getPopupData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lang })
      });

      const data = await response.json();
      return data;
    },
    enabled: !!lang
  });
}

interface Props {
  lang: LangValues;
}

export function Popup({ lang }: Props) {
  const { data: popupData } = usePopup(lang);

  if (!popupData || !popupData.data.isShown) {
    return null;
  }

  return <PopupLayout data={popupData.data} />;
}
