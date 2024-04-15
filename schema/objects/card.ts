import { Square } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const card = defineType({
  title: 'Card',
  name: 'card',
  type: 'object',
  icon: Square,
  preview: {
    select: {
      title: 'title.en'
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: 'Card'
      };
    }
  },
  fields: [
    defineField({
      title: 'Media',
      name: 'media',
      type: 'media',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Link',
      name: 'link',
      type: 'conditionalLink',
      validation: (Rule) => Rule.required()
    })
  ]
});
