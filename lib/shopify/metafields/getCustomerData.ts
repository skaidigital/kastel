import { COOKIE_NAMES, METAFIELDS } from '@/data/constants'
import { cookies } from 'next/headers'
import { customerAccountFetch } from '../customer'

export interface CustomerData {
  firstName?: string
  lastName?: string
  metafield: {
    isPrompted: boolean
    footLength?: string
    style?: string
    color?: string
  } | null
}

export async function getCustomerData() {
  const customerDataResponse = await getCustomDataForUser()

  return customerDataResponse
}

async function getCustomDataForUser() {
  const accessToken = cookies().get(COOKIE_NAMES.SHOPIFY.ACCESS_TOKEN)?.value

  if (!accessToken) {
    throw new Error('No access token')
  }

  const wishlistResponse = await customerAccountFetch<CustomerMetadata>({
    query: getWishlistQuery,
    variables: {
      key: METAFIELDS.customer.customer_data.key,
      namespace: METAFIELDS.customer.customer_data.namespace
    },
    cache: 'no-store'
  })

  return wishlistResponse.body.data?.customer
}

export type CustomerMetadata = {
  data: {
    customer: {
      id: string
      emailAddress: { emailAddress: string }
      firstName: string
      lastName: string
      metafield: {
        id: string
        key: string
        value: string
      }
    }
  }
  variables: {
    key: string
    namespace: string
  }
}

const getWishlistQuery = /* GraphQL */ `
  query getWishlist($key: String!, $namespace: String!) {
    customer {
      id
      emailAddress {
        emailAddress
      }
      firstName
      lastName
      metafield(key: $key, namespace: $namespace) {
        id
        key
        value
      }
    }
  }
`
