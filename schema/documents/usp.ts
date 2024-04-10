import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { ListBullets } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const usp = defineType({
  title: 'USP',
  name: 'usp',
  type: 'document',
  icon: ListBullets,
  preview: {
    select: {
      title: 'internalTitle',
      image: 'icon'
    },
    prepare({ title, image }) {
      return {
        title: title || 'No title defined',
        subtitle: 'USP',
        media: image || ListBullets
      };
    }
  },
  fields: [
    defineField({
      title: 'Iternal title',
      name: 'internalTitle',
      type: 'internalTitle'
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Icon',
      name: 'icon',
      type: 'figure'
    })
  ]
});
