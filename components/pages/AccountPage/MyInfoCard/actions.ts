'use server';

import {
  MyInfoFormProps,
  myInfoFormValidator
} from '@/components/pages/AccountPage/MyInfoCard/hooks';

export async function sendMyInfoForm(data: MyInfoFormProps) {
  const validatedData = myInfoFormValidator.safeParse(data);

  if (!validatedData.success) {
    console.log('Ooop, something went wrong');
    console.error(validatedData.error);
    return {
      success: false,
      error: validatedData.error
    };
  }

  console.log('sendContactForm', data);
  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    console.log('sendContactForm', data);

    return {
      success: false,
      error: 'Something went wrong. Please try again later.'
    };
  } catch (error) {
    return {
      success: false,
      error
    };
  }
}
