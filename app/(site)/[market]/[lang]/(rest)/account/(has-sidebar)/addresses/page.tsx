import { getDictionary } from '@/app/dictionaries';
import { AddressesPage } from '@/components/pages/AddressesPage';
import { LangValues, MarketValues } from '@/data/constants';
import { getAddresses } from '@/lib/shopify/customer/getAddresses';
import { getDefaultAddress } from '@/lib/shopify/customer/getDefaultAddress';
import { Metadata } from 'next';

interface Props {
  params: { lang: LangValues };
}

export default async function Page({ params: { lang } }: Props) {
  const [addresses, defaultAddress] = await Promise.all([getAddresses(), getDefaultAddress()]);
  const addressesWithoutDefault = addresses.filter((address) => address.id !== defaultAddress.id);
  const { address_page: dictionary } = await getDictionary({ lang });

  return (
    <AddressesPage
      lang={lang}
      addresses={addressesWithoutDefault}
      defaultAddress={defaultAddress}
      dictionary={dictionary}
    />
  );
}

export const metadata: Metadata = {
  title: getTitle()
};

// TODO get market from params
function getTitle() {
  const market = 'no' as MarketValues;

  switch (market) {
    case 'no':
      return 'Adresser';
    case 'sv':
      return 'Addresses';
  }
}
