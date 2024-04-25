'use client';

import { Text } from '@/components/base/Text';
import { useEffect, useState } from 'react';

interface Props {
  sku: string;
  expectedBackInStockText: string;
}

export async function BackInStockDate({ sku, expectedBackInStockText }: Props) {
  const [backInStockDate, setBackInStockDate] = useState<string | null>(null);

  useEffect(() => {
    if (!sku) return;
    getBackInStockDate(sku).then((data) => {
      // console.log(data);
      setBackInStockDate(data.backInStockDate);
    });
  }, []);

  if (!backInStockDate) return null;

  return (
    <Text className="italic">
      {expectedBackInStockText} {backInStockDate}
    </Text>
  );
}

async function getBackInStockDate(sku: string) {
  try {
    const response = await fetch('http://localhost:3000/api/getBackInStockDate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sku })
    });

    const data = await response.json();
    // console.log({ data });

    return data;
  } catch (error) {
    console.error(error);
  }
}
