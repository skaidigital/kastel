import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

export const natureLabLandingPage = defineType({
  title: 'Nature Lab landing page',
  name: 'natureLabLandingPage',
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
