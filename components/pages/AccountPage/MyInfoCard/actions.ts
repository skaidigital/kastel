'use server'

import {
  MyInfoFormProps,
  myInfoFormValidator
} from '@/components/pages/AccountPage/MyInfoCard/hooks'
import { updateCustomerData } from '@/lib/shopify/metafields/updateCustomerData'

export async function sendMyInfoForm(data: MyInfoFormProps, id: string) {
  const validatedData = myInfoFormValidator.safeParse(data)

  if (!validatedData.success) {
    console.error(validatedData.error)
    return {
      success: false,
      error: validatedData.error
    }
  }

  try {
    await updateCustomerData({ customerGid: id, data })

    return {
      success: true,
      error: null
    }
  } catch (error) {
    return {
      success: false,
      error
    }
  }
}
