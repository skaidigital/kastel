'use server'

import {
  EmailCaptureForm,
  emailCaptureFormValidator
} from '@/components/shared/PageBuilder/EmailCapture/hooks'
import { env } from '@/env'

export async function submitEmailCaptureForm(data: EmailCaptureForm, listId: string) {
  const validatedData = emailCaptureFormValidator.safeParse(data)

  if (!validatedData.success) {
    return {
      success: false,
      message: validatedData.error.errors[0]?.message
    }
  }

  const email = data.email
  const apiKey = env.KLAVIYO_API_KEY

  const bodyData = {
    data: {
      type: 'profile-subscription-bulk-create-job',
      attributes: {
        profiles: {
          data: [
            {
              type: 'profile',
              attributes: {
                email: email,
                subscriptions: {
                  email: {
                    marketing: {
                      consent: 'SUBSCRIBED',
                      consented_at: new Date().toISOString()
                    }
                  }
                }
              }
            }
          ]
        }
      },
      relationships: {
        list: {
          data: {
            type: 'list',
            id: listId
          }
        }
      }
    }
  }

  const response = await fetch(`https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Klaviyo-API-Key ${apiKey}`,
      revision: '2023-12-15'
    },
    body: JSON.stringify(bodyData)
  })

  const { status } = response

  if (status === 202) {
    return { success: true }
  }
  return { success: false }
}
