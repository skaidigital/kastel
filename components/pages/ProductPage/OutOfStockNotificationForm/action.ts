'use server';

import { z } from 'zod';

// TODO implement real API call
export async function getBackInStockNotification(
  variantId: string,
  prevState: any,
  formData: FormData
) {
  const formValidator = z.object({
    email: z.string().email()
  });

  const validatedFormData = formValidator.safeParse(Object.fromEntries(formData));

  if (!validatedFormData.success) {
    return {
      success: false,
      errors: validatedFormData.error.flatten().fieldErrors
    };
  }

  return {
    success: true
  };
}
