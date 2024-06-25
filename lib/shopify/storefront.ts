'use server'

import { shopifyFetch } from '@/lib/shopify'
import {
  ShopifyCustomerAccessTokenCreateOperation,
  ShopifyCustomerAccessTokenCreateProps,
  ShopifyCustomerActivateOperation,
  ShopifyCustomerActivateProps,
  ShopifyCustomerCreateOperation,
  ShopifyCustomerCreateProps,
  ShopifyCustomerRecoversOperation as ShopifyCustomerRecoverOperation
} from '@/lib/shopify/types'
import { z } from 'zod'

export async function customerAccessTokenCreateMutation(
  body: ShopifyCustomerAccessTokenCreateProps
) {
  const mutation = `
    mutation customerAccessTokenCreate($email: String!, $password: String!){
      customerAccessTokenCreate(input: {email: $email, password: $password}) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  try {
    const response = await shopifyFetch<ShopifyCustomerAccessTokenCreateOperation>({
      query: mutation,
      variables: body
    })

    const errors = response?.body?.data?.customerAccessTokenCreate?.userErrors

    if (errors.length > 0) {
      return {
        success: false,
        error: errors
      }
    }

    const accessToken =
      response?.body?.data?.customerAccessTokenCreate?.customerAccessToken.accessToken

    const validatedAccessToken = z.string().safeParse(accessToken)

    if (!validatedAccessToken.success) {
      return {
        success: false,
        error: 'Invalid access token'
      }
    }

    return {
      success: true,
      data: validatedAccessToken.data
    }
  } catch (error: any) {
    console.error('Error in lib/shopify.ts - customerAccessTokenCreateMutation:', error)
    return { success: false, error: error.message }
  }
}

export async function recoverPasswordMutation(email: string) {
  const mutation = `
      mutation customerRecover($email: String!) {
        customerRecover(email: $email) {
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `
  try {
    const response = await shopifyFetch<ShopifyCustomerRecoverOperation>({
      query: mutation,
      variables: { email }
    })

    const errors = response?.body?.data?.customerRecover?.customerUserErrors

    if (errors.length > 0) {
      return {
        success: false,
        error: errors
      }
    }

    return { success: true }
  } catch (error: any) {
    console.error('Error in lib/shopify.ts - recoverPassord:', error)
    return { success: false, error: error.message }
  }
}

export async function customerCreateMutation(body: ShopifyCustomerCreateProps) {
  const mutation = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `

  try {
    const response = await shopifyFetch<ShopifyCustomerCreateOperation>({
      query: mutation,
      variables: { input: body }
    })

    const errors = response?.body?.data?.customerCreate?.customerUserErrors

    if (errors.length > 0) {
      return {
        success: false,
        error: errors
      }
    }

    return { success: true }
  } catch (error: any) {
    console.error('Error in lib/shopify.ts - customerCreateMutation:', error)
    return { success: false, error: error.message }
  }
}

export async function activateAccountMutation(body: ShopifyCustomerActivateProps) {
  try {
    const { customerId, activationToken, password } = body

    const mutation = `
    mutation customerActivate($id: ID!, $input: CustomerActivateInput!) {
      customerActivate(id: $id, input: $input) {
          customer {
            id
          }
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `

    const formattedCustomerId = `gid://shopify/Customer/${customerId}`

    const input = {
      id: formattedCustomerId,
      input: {
        activationToken,
        password
      }
    }

    const response = await shopifyFetch<ShopifyCustomerActivateOperation>({
      query: mutation,
      variables: input
    })

    const errors = response?.body?.data?.customerActivate?.customerUserErrors

    if (errors.length > 0) {
      return {
        success: false,
        error: response?.body?.data?.customerActivate?.customerUserErrors
      }
    }

    const accessToken = response?.body?.data?.customerActivate?.customerAccessToken.accessToken

    const validatedAccessToken = z.string().safeParse(accessToken)

    if (!validatedAccessToken.success) {
      return {
        success: false,
        error: 'Invalid access token'
      }
    }

    return {
      success: true,
      data: validatedAccessToken.data
    }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
