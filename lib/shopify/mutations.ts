import { API_ROUTES } from '@/data/constants'
import { apiRouteQuery } from '@/lib/apiRouteQuery'
import { ProductUpdateSchemaResponse, ProductUpdateValidator } from '../api/types'
import { shopifyAdminQuery } from './admin'
import {
  createProductMutation,
  publishablePublishMutation,
  updateProductMutation
} from './mutations/product'
import { ProductInputCreate, ProductInputUpdate, PublicationInput } from './types'

export const customerActivateMutation = async ({
  customerId,
  activationToken,
  password
}: {
  customerId: string
  activationToken: string
  password: string
}) => {
  const route = API_ROUTES.shopify.ACTIVATE_CUSTOMER
  const body = { customerId, activationToken, password }
  const response = await apiRouteQuery(route, body)

  return response
}

export const customerResetPasswordMutation = async (email: string) => {
  const route = API_ROUTES.shopify.RESET_PASSWORD
  const body = { email }
  const response = await apiRouteQuery(route, body)

  return response
}

export const CreateProductInShopify = async (serializedProduct: ProductInputCreate) => {
  const response = await shopifyAdminQuery(createProductMutation, serializedProduct).catch(
    (error) => {
      console.error('Shopifylib - admin ', error)
    }
  )

  if (!response || !response.data || !response.data.productCreate) {
    return {
      success: false,
      error: response
    }
  }

  const createdProduct = response.data.productCreate.product

  return {
    success: true,
    createdProduct: createdProduct
  }
}

export const PublishProductToSalesChannel = async (serialzedInput: PublicationInput) => {
  const response = await shopifyAdminQuery(publishablePublishMutation, serialzedInput).catch(
    (error) => {
      console.error('Shopifylib - admin ', error)
    }
  )

  if (!response || !response.data || !response.data.publishablePublish) {
    return {
      success: false,
      error: response
    }
  }

  const publisedProduct = response.data.publishablePublish.publishable

  return {
    success: true,
    publisedProduct: publisedProduct
  }
}

export const UpdateProductInShopify = async (
  serializedProduct: ProductInputUpdate
): Promise<ProductUpdateSchemaResponse> => {
  const response = await shopifyAdminQuery(updateProductMutation, serializedProduct).catch(
    (error) => {
      console.error('Shopifylib - admin ', error)
    }
  )

  if (!response || !response.data || !response.data.productUpdate) {
    return {
      updatedProduct: null
    }
  }

  const updatedProduct = response.data.productUpdate.product

  const validatedUpdateProduct = ProductUpdateValidator.safeParse(updatedProduct)

  if (!validatedUpdateProduct.success) {
    console.error(
      'Shopifylib - UpdateProductInShopify - ProductUpdateValidator',
      validatedUpdateProduct.error
    )
    return {
      updatedProduct: null
    }
  }

  return {
    updatedProduct: validatedUpdateProduct.data
  }
}
