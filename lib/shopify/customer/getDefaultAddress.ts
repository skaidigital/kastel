import { CACHE_TAGS } from '@/data/constants'
import { customerAccountFetch } from '@/lib/shopify/customer'
import { Address } from '@/lib/shopify/types'

type ShopifyResponse = {
  data: {
    customer: {
      defaultAddress: Address
    }
  }
}

const customerAddressesQuery = /* GraphQL */ `
  {
    customer {
      defaultAddress {
        id
        firstName
        lastName
        phoneNumber
        address1
        address2
        zip
        city
        territoryCode
        formatted
      }
    }
  }
`

export async function getDefaultAddress() {
  const res = await customerAccountFetch<ShopifyResponse>({
    query: customerAddressesQuery,
    cache: 'no-store',
    tags: [CACHE_TAGS.CUSTOMER_ADDRESS]
  })

  return res.body.data.customer.defaultAddress
}
