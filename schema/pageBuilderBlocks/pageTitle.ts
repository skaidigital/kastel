import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { TextH } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const pageTitle = defineType({
  title: 'Page Title',
  name: 'pageTitle',
  type: 'object',
  icon: TextH,
  preview: {
    select: {
      title: 'title.no'
    },
    prepare({ title }) {
      return {
        title: title || 'No title defined',
        subtitle: 'Page title',
        icon: TextH
      };
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
      type: 'i18n.string'
    })
  ]
});
