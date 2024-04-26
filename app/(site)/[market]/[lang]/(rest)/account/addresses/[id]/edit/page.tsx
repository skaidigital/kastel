import { getDictionary } from '@/app/dictionaries';
import { EditAddressPage } from '@/components/pages/CreateAddressPage';
import { MarketValues } from '@/data/constants';
import { getAddresses } from '@/lib/shopify/customer/getAddress';
import { Metadata } from 'next';

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  // TODO get address and pass the default address to the page
  const { id } = params;

  const { create_address_page: dictionary } = await getDictionary();

  const addressData = await getAddresses(id);

  if (!addressData) {
    return null;
  }

  return <EditAddressPage dictionary={dictionary} data={addressData} />;
}

export const metadata: Metadata = {
  title: getTitle()
};

function getTitle() {
  const market = 'no' as MarketValues;

  switch (market) {
    case 'no':
      return 'Rediger adresse';
    case 'sv':
      return 'Redigera adress';
  }
}
