import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

export const phase2Product = defineType({
  title: 'Nature Lab phase 2 product',
  name: 'phase2Product',
  type: 'document',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    })
  ]
});
