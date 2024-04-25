'use server';

import { newsletterFormSchema } from '@/components/shared/NewsletterSignup/hooks';
import { env } from '@/env';

interface Props {
  email: string;
  klaviyoId: string;
}

export async function subscribeToNewsletter({ email, klaviyoId }: Props) {
  if (!klaviyoId) {
    return {
      success: false
    };
  }

  const result = newsletterFormSchema.safeParse({ email });

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors
    };
  }

  const listId = env.KLAVIYO_NEWSLETTER_LIST_ID;
  const apiKey = env.KLAVIYO_API_KEY;

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
  };

  const response = await fetch(`https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Klaviyo-API-Key ${apiKey}`,
      revision: '2023-12-15'
    },
    body: JSON.stringify(bodyData)
  });

  const { status } = response;

  if (status === 202) {
    return { success: true };
  }
  return { success: false };
}
