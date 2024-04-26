import { LangValues } from '@/data/constants';
import { z } from 'zod';

const footerDictionaryValidator = z.object({
  min_read: z.string(),
  read_more: z.string()
});

export type FooterDictionary = z.infer<typeof footerDictionaryValidator>;

type DictionaryLoader = () => Promise<FooterDictionary>;

const dictionaries: Record<string, DictionaryLoader> = {
  eu: () => import('./en.json').then((module) => module.default),
  no: () => import('./no.json').then((module) => module.default)
};

export const getPagebuilderDictionary = async (lang: LangValues) => {
  if (!lang && lang !== 'no' && lang !== 'en') {
    throw new Error('Not supported language');
  }

  const loader = dictionaries[lang];

  if (!loader) {
    throw new Error(`Error in dictionary`);
  }
  return loader();
};
