import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

export const blogLandingPage = defineType({
  title: 'Blog Landing page',
  name: 'blogLandingPage',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'Blog Landing page',
        subtitle: 'Blog Landing page'
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
      title: 'Description',
      name: 'description',
      type: 'i18n.text',
      options: {
        rows: 4
      },
      validation: validateAllStringTranslations
    })
  ]
});
