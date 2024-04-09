import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

export const phase3BlogPost = defineType({
  title: 'Nature Lab phase 3 blog post',
  name: 'phase3BlogPost',
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
