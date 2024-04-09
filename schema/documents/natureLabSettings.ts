import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

export const natureLabSettings = defineType({
  title: 'Nature Lab settings page',
  name: 'natureLabSettings',
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
