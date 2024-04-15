import { Square } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const cardBlock = defineType({
  title: 'Card block',
  name: 'cardBlock',
  type: 'document',
  icon: Square,
  preview: {
    select: {
      title: 'internalTitle'
    },
    prepare({ title }) {
      return {
        title: title,
        subtitle: 'Card block'
      };
    }
  },
  fields: [
    defineField({
      title: 'Internal title',
      name: 'internalTitle',
      type: 'internalTitle',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Cards',
      name: 'cards',
      type: 'array',
      of: [{ type: 'card' }],
      validation: (Rule) => Rule.min(2).max(3)
    }),
    defineField({
      title: 'Aspect ratio settings',
      name: 'aspectRatioSettings',
      type: 'aspectRatioSettings',
      validation: (Rule) => Rule.required()
    })
  ]
});
