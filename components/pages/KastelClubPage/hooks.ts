import { LangValues } from '@/data/constants';
import { getImageBase } from '@/lib/sanity/fragments';
import { imageValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

const sectionItemValidator = z.object({
  title: z.string(),
  description: z.string(),
  icon: imageValidator
});

const sectionValidator = z.object({
  title: z.string(),
  description: z.string().optional(),
  items: z.array(sectionItemValidator)
});

export const kastelClubPageValidator = z.object({
  waysToEarn: sectionValidator
});

export type KastelClubSectionItemProps = z.infer<typeof sectionItemValidator>;
export type KastelClubSectionProps = z.infer<typeof sectionValidator>;
export type KastelClubPagePayload = z.infer<typeof kastelClubPageValidator>;

export function getSectionItem(lang: LangValues) {
  return groq`
    "title": title.${lang},
    "description": description.${lang},
    items[]{
      "title": title.${lang},
      "description": description.${lang},
      icon{
        ${getImageBase(lang)}
      }
    }
  `;
}

export function getKastelClubPageQuery(lang: LangValues) {
  return groq`
    *[_type == "kastelClubPage"][0] {
      waysToEarn{
        ${getSectionItem(lang)}
      }
    }  
  `;
}
