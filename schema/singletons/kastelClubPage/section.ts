import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

export const kastelClubPageSection = defineType({
  title: 'Section',
  name: 'kastelClubPageSection',
  type: 'object',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Description (optional)',
      name: 'description',
      type: 'i18n.text',
      options: {
        rows: 3
      }
    }),
    defineField({
      title: 'Items',
      name: 'items',
      type: 'array',
      of: [{ type: 'kastelClubPageSectionItem' }],
      validation: (Rule) => Rule.required().min(1)
    })
  ]
});
