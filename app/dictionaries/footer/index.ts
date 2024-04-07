import { LangValues } from '@/data/constants';
import { z } from 'zod';

const footerDictionaryValidator = z.object({
  made_with: z.string(),
  by: z.string(),
  about: z.string(),
  sign_up: z.object({
    title: z.string(),
    description: z.string(),
    email: z.string(),
    button_text: z.string(),
    success_message: z.string(),
    success_description: z.string(),
    error_message: z.string(),
    error_description: z.string()
  })
});

export type FooterDictionary = z.infer<typeof footerDictionaryValidator>;

type DictionaryLoader = () => Promise<FooterDictionary>;

const dictionaries: Record<string, DictionaryLoader> = {
  eu: () => import('./en.json').then((module) => module.default),
  no: () => import('./no.json').then((module) => module.default)
};

export const getFooterDictionary = async (lang: LangValues) => {
  if (!lang || lang !== 'en' || lang !== 'en') {
    throw new Error('Not supported language');
  }

  const loader = dictionaries[lang];

  if (!loader) {
    throw new Error(`Error in dictionary`);
  }
  return loader();
};
