import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

export const blogPost = defineType({
  title: 'Blog pst',
  name: 'blogPost',
  type: 'document',
  fields: [
    defineField({
      title: 'Title',
      name: 'titleInfo',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    })
  ]
});
