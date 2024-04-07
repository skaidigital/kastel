import { getDictionary } from '@/app/dictionaries';
import { CreateAddressPage } from '@/components/pages/CreateAddressPage';
import { MarketValues } from '@/data/constants';
import { env } from '@/env';
import { Metadata } from 'next';

export default async function Page() {
  const { create_address_page: dictionary } = await getDictionary();
  return <CreateAddressPage dictionary={dictionary} />;
}

export const metadata: Metadata = {
  title: getTitle()
};

function getTitle() {
  const market = env.NEXT_PUBLIC_MARKET as MarketValues;

  switch (market) {
    case 'dk':
      return 'Opret adresse';
    case 'no':
      return 'Opprett adresse';
    case 'sv':
      return 'Skapa adress';
    case 'eu':
      return 'Create address';
  }
}
