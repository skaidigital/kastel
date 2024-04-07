'use server';

import ContactFormEmailTemplate from '@/components/shared/PageBuilder/ContactForm/ContactFormEmailTemplate';
import { ContactFormFormProps } from '@/components/shared/PageBuilder/ContactForm/hooks';
import { env } from '@/env';
import { draftMode } from 'next/headers';
import { ReactElement } from 'react';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_API_KEY);

// TODO make contact form go to Abate once we go to production
export async function sendContactForm(data: ContactFormFormProps) {
  const { name, email, message } = data;

  try {
    const { error } = await resend.emails.send({
      from: 'Acme <hello@skaidigital.com>',
      to: ['hello@skaidigital.com'],
      subject: 'Kontaktskjema på nettside',
      react: ContactFormEmailTemplate({ name, email, message }) as ReactElement
    });

    if (error) console.error(error);
  } catch (error) {
    console.error(error);
  }
}

export async function checkIfDraftMode() {
  const isDraft = draftMode().isEnabled;
  return isDraft;
}
