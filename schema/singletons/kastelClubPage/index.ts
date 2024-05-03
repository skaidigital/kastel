import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { HandCoins } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

// TODO make the internal title hidden once it's set in both datasets
export const kastelClubPage = defineType({
  title: 'Kastel Club Page',
  name: 'kastelClubPage',
  type: 'document',
  icon: HandCoins,
  preview: {
    prepare() {
      return {
        title: 'Kastel Club page',
        subtitle: 'Kastel Club page'
      };
    }
  },
  fields: [
    defineField({
      title: 'Internal title',
      name: 'internalTitle',
      type: 'internalTitle',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Ways to earn',
      name: 'waysToEarn',
      type: 'kastelClubPageSection',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'The perks',
      name: 'perks',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          title: 'Title',
          name: 'title',
          type: 'i18n.string',
          validation: validateAllStringTranslations
        }),
        defineField({
          title: 'Description (optional)',
          name: 'description',
          type: 'i18n.text',
          options: {
            rows: 3
          }
        }),
        defineField({
          title: 'Table 🇧🇻',
          name: 'table_no',
          type: 'table',
          validation: (Rule) => Rule.required()
        }),
        defineField({
          title: 'Table 🇬🇧',
          name: 'table_en',
          type: 'table',
          validation: (Rule) => Rule.required()
        })
      ]
    }),
    defineField({
      title: 'Frequently asked questions',
      name: 'faq',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          title: 'Title',
          name: 'title',
          type: 'i18n.string',
          validation: validateAllStringTranslations
        }),
        defineField({
          title: 'Questions',
          name: 'questions',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'question' }] }],
          validation: (Rule) => Rule.required().min(1)
        })
      ]
    })
  ]
});
