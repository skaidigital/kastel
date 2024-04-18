'use server';

import { EMAILS } from '@/data/constants';
import { env } from '@/env';
import { ReactElement } from 'react';
import { Resend } from 'resend';
import NatureLabEmailTemplate from './NatureLabQuestionairlTemplate';

const resend = new Resend(env.RESEND_API_KEY);

export interface NatureLabEmailTemplateProps {
  name: string;
  email: string;
  natureLabTitle: string;
  questionResponse: { question: string; answer: string }[];
}

export async function sendNatureLabEmail(data: NatureLabEmailTemplateProps) {
  const { name, email, natureLabTitle, questionResponse } = data;

  const isProduction = process.env.NODE_ENV === 'production';
  const to = isProduction ? EMAILS.CONTACT : 'hello@skaidigital.com';

  try {
    const { error } = await resend.emails.send({
      from: 'The Boys <hello@skaidigital.com>',
      to: [to],
      subject: 'Svar på Nature lab spørsmål på nettside',
      react: NatureLabEmailTemplate({
        name,
        email,
        natureLabTitle,
        questionResponse
      }) as ReactElement
    });

    if (error) console.error(error);
  } catch (error) {
    console.error(error);
  }
}
