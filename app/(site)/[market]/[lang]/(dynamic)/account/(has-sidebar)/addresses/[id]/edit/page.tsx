import { getDictionary } from '@/app/dictionaries'
import { EditAddressPage } from '@/components/pages/EditAddressPage'
import { LangValues, MarketValues } from '@/data/constants'
import { getAddresses } from '@/lib/shopify/customer/getAddress'
import { getDefaultAddress } from '@/lib/shopify/customer/getDefaultAddress'
import { Metadata } from 'next'

interface Props {
  params: {
    lang: LangValues
    id: string
  }
}

export default async function Page({ params: { id, lang } }: Props) {
  const { create_address_page: dictionary } = await getDictionary({ lang })

  const [address, defaultAddress] = await Promise.all([getAddresses(id), getDefaultAddress()])
  const isDefaultAddress = defaultAddress?.id === address?.id ? true : false

  if (!address || !defaultAddress) {
    return null
  }

  return (
    <EditAddressPage
      dictionary={dictionary}
      data={address}
      addressId={id}
      isDefaultAddress={isDefaultAddress}
    />
  )
}

export const metadata: Metadata = {
  title: getTitle()
}

function getTitle() {
  const market = 'no' as MarketValues

  switch (market) {
    case 'no':
      return 'Rediger adresse'
    case 'sv':
      return 'Redigera adress'
  }
}
