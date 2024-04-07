import { getDictionaryClientSide } from '@/app/dictionaries-client';
import { MarketValues } from '@/data/constants';
import { useEffect, useState } from 'react';
import { z } from 'zod';

export const contactFormValidator = z.object({
  name: z.string().min(2, 'You have to enter a name'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'You have to enter a message')
});

export type ContactFormFormProps = z.infer<typeof contactFormValidator>;

export const useDictionary = (market: MarketValues | undefined) => {
  const [dictionary, setDictionary] = useState<any>(null);
  const [loading, setLoading] = useState(market === undefined);
  const [error, setError] = useState<any>(null);
  const isClientSide = typeof window !== 'undefined';

  useEffect(() => {
    if (!isClientSide) {
      setLoading(true);
      return;
    }
    if (!market) {
      setLoading(true);
      return;
    }

    const fetchDictionary = async () => {
      setLoading(true);
      try {
        const loadedDictionary = await getDictionaryClientSide(market);

        setDictionary(loadedDictionary);
        setError(null); // Reset error state on successful fetch
      } catch (error) {
        console.error('Failed to load dictionary', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDictionary();
  }, [market, isClientSide]);

  return { dictionary, loading, error };
};
