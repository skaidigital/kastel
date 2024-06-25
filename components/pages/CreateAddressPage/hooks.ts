import { z } from 'zod'

export const createAddressFormInputValidator = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phoneNumber: z.string().min(2),
  address1: z.string().min(2),
  address2: z.string().optional(),
  zip: z.string().min(2),
  city: z.string().min(2),
  territoryCode: z.string().min(2),
  defaultAddress: z.boolean()
})

export type CreateAddressFormInput = z.infer<typeof createAddressFormInputValidator>

export const customerAddressCreateInputValidator = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  address1: z.string(),
  address2: z.string().optional(),
  zip: z.string(),
  city: z.string(),
  territoryCode: z.string()
})

const customerAddressCreateResponseValidator = z.object({
  data: z.object({
    customerAddressCreate: z.object({
      customerAddress: z
        .object({
          id: z.string().optional()
        })
        .nullable(),
      userErrors: z.array(
        z.object({
          field: z.string(),
          message: z.string()
        })
      )
    })
  }),
  variables: z.object({
    address: customerAddressCreateInputValidator,
    defaultAddress: z.boolean()
  })
})

export type CustomerAddressCreateResponse = z.infer<typeof customerAddressCreateResponseValidator>

export const customerAddressCreateMutation = /* GraphQL */ `
  mutation customerAddressCreate($address: CustomerAddressInput!, $defaultAddress: Boolean) {
    customerAddressCreate(address: $address, defaultAddress: $defaultAddress) {
      customerAddress {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`
