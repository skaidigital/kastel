import { GridFour } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const cardSection = defineType({
  title: 'Card section',
  name: 'cardSection',
  type: 'document',
  icon: GridFour,
  preview: {
    prepare() {
      return {
        title: 'Card section',
        subtitle: 'Card section'
      };
    }
  },
  fields: [
    defineField({
      title: 'Aspect ratio settings',
      name: 'aspectRatioSettings',
      type: 'aspectRatioSettings'
    }),
    defineField({
      title: 'Cards',
      description: 'Create 2-3 cards',
      name: 'cards',
      type: 'array',
      of: [{ type: 'media' }],
      validation: (Rule) => Rule.min(2).max(3)
    })
  ]
});
