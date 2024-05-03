import { heroValidator } from '@/components/shared/PageBuilder/hooks';
import { LangValues } from '@/data/constants';
import {
  aspectRatioSettings,
  base,
  buttonSettings,
  getConditionalLink,
  getImageBase,
  getLink,
  getMedia,
  getQuestionAndAnswer,
  table
} from '@/lib/sanity/fragments';
import {
  imageValidator,
  linkValidator,
  questionAndAnswerValidator,
  tableValidator
} from '@/lib/sanity/validators';
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
  items: z.array(sectionItemValidator),
  cta: linkValidator
});

export const kastelClubPageValidator = z.object({
  hero: heroValidator,
  waysToEarn: sectionValidator,
  marquee: z.array(
    z.object({
      icon: imageValidator,
      title: z.string()
    })
  ),
  perks: z.object({
    title: z.string(),
    description: z.string().optional(),
    table: tableValidator
  }),
  faq: z.object({
    title: z.string(),
    questions: z.array(questionAndAnswerValidator)
  }),
  tiers: z.object({
    title: z.string(),
    description: z.string().optional(),
    table: tableValidator
  }),
  referAFriend: sectionValidator
});

export type KastelClubSectionItemProps = z.infer<typeof sectionItemValidator>;
export type KastelClubSectionProps = z.infer<typeof sectionValidator>;
export type KastelClubPagePayload = z.infer<typeof kastelClubPageValidator>;

export function getSection(lang: LangValues) {
  return groq`
    "title": title.${lang},
    "description": description.${lang},
    cta{
      ${getLink(lang)}
    },
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
      hero{
        ${base},
        "title": title.${lang},
        "description": description.${lang},
        link{
          ${getConditionalLink(lang)}
        },
        buttonSettings{
          ${buttonSettings}
        },
        media{
          ${getMedia(lang)}
        },
        aspectRatioSettings{
          ${aspectRatioSettings}
        },
        textPositionMobile,
        textPositionDesktop
      },
      marquee[]{
        "title": title.${lang},
        icon{
          ${getImageBase(lang)}
        }
      },
      waysToEarn{
        ${getSection(lang)}
      },
      perks{
        "title": title.${lang},
        "description": description.${lang},
        "table": table_${lang}{
          ${table}
        }
      },
      referAFriend{
        ${getSection(lang)}
      },
      tiers{
        "title": title.${lang},
        "description": description.${lang},
        "table": table_${lang}{
          ${table}
        }
      },
      faq{
        "title": title.${lang},
        questions[]->{
          ${getQuestionAndAnswer(lang)}
        }
      }
    }  
  `;
}
