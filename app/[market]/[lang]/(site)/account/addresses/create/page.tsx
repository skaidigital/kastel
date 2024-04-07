import { getDictionary } from '@/app/dictionaries';
import { CreateAddressPage } from '@/components/pages/CreateAddressPage';
import { MarketValues } from '@/data/constants';
import { Metadata } from 'next';

export default async function Page() {
  const { create_address_page: dictionary } = await getDictionary();
  return <CreateAddressPage dictionary={dictionary} />;
}

export const metadata: Metadata = {
  title: getTitle()
};

// TODO get market from params
function getTitle() {
  const market = 'no' as MarketValues;

  switch (market) {
    case 'no':
      return 'Opprett adresse';
    case 'eu':
      return 'Create address';
  }
}
