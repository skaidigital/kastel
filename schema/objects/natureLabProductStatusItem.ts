import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

export const natureLabProductStatusItem = defineType({
  title: 'Status item',
  name: 'natureLabProductStatusItem',
  type: 'object',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'i18n.text',
      validation: validateAllStringTranslations
    })
  ]
});
