import { getDictionary } from '@/app/dictionaries';
import { AddressesPage } from '@/components/pages/AddressesPage';
import { MarketValues } from '@/data/constants';
import { env } from '@/env';
import { getAddresses } from '@/lib/shopify/customer/getAddresses';
import { getDefaultAddress } from '@/lib/shopify/customer/getDefaultAddress';
import { Metadata } from 'next';

export default async function Page() {
  const [addresses, defaultAddress] = await Promise.all([getAddresses(), getDefaultAddress()]);
  const addressesWithoutDefault = addresses.filter((address) => address.id !== defaultAddress.id);
  const { address_page: dictionary } = await getDictionary();

  return (
    <AddressesPage
      addresses={addressesWithoutDefault}
      defaultAddress={defaultAddress}
      dictionary={dictionary}
    />
  );
}

export const metadata: Metadata = {
  title: getTitle()
};

function getTitle() {
  const market = env.NEXT_PUBLIC_MARKET as MarketValues;

  switch (market) {
    case 'dk':
      return 'Adresser';
    case 'no':
      return 'Adresser';
    case 'sv':
      return 'Adresser';
    case 'eu':
      return 'Addresses';
  }
}
