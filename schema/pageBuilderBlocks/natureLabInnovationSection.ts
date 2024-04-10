import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

export const natureLabInnovationSection = defineType({
  title: 'Nature Lab Innnovation',
  name: 'natureLabInnovationSection',
  type: 'object',
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
        rows: 3
      },
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Innovations',
      description: 'Choose 1-6 innovations from Nature Lab that this shoe uses',
      name: 'innovations',
      type: 'array',
      of: [{ type: 'natureLabInnovationItem' }],
      validation: (Rule) => Rule.min(1).max(6)
    })
  ]
});
