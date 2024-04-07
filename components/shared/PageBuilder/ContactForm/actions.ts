'use server';

import ContactFormEmailTemplate from '@/components/shared/PageBuilder/ContactForm/ContactFormEmailTemplate';
import { ContactFormFormProps } from '@/components/shared/PageBuilder/ContactForm/hooks';
import { EMAILS } from '@/data/constants';
import { env } from '@/env';
import { draftMode } from 'next/headers';
import { ReactElement } from 'react';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_API_KEY);

// TODO make contact form go to Abate once we go to production
export async function sendContactForm(data: ContactFormFormProps) {
  const { name, email, message } = data;

  const isProduction = process.env.NODE_ENV === 'production';
  const to = isProduction ? EMAILS.CONTACT : 'hello@skaidigital.com';

  try {
    const { error } = await resend.emails.send({
      from: 'The Boys <hello@skaidigital.com>',
      to: [to],
      subject: 'Kontaktskjema på nettside',
      react: ContactFormEmailTemplate({ name, email, message }) as ReactElement
    });

    if (error) console.error(error);
  } catch (error) {
    console.error(error);
  }
}

// ? Why is this function in here
export async function checkIfDraftMode() {
  const isDraft = draftMode().isEnabled;
  return isDraft;
}
