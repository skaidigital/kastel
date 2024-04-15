import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

export const retailersPage = defineType({
  title: 'Retailers page',
  name: 'retailersPage',
  type: 'document',
  preview: {
    select: {
      title: 'title.en'
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Retailers page'
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
      title: 'Retailers',
      name: 'retailers',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'retailer' }] }],
      validation: (Rule) => Rule.required()
    })
  ]
});
