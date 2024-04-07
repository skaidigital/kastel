import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { Quotes } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const usp = defineType({
  title: 'Unique selling proposition',
  name: 'usp',
  type: 'object',
  icon: Quotes,
  preview: {
    select: {
      title: 'title.eu'
    }
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Subtitle',
      name: 'subtitle',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    })
  ]
});
