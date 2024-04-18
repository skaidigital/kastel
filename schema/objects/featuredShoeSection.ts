import { Sneaker } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const featuredShoeSection = defineType({
  title: 'Featured Shoe section',
  name: 'featuredShoeSection',
  type: 'object',
  icon: Sneaker,
  preview: {
    select: {
      title: 'featuredShoeBlock.internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Featured Shoe section'
      };
    }
  },
  fields: [
    defineField({
      title: 'Featured Shoe block',
      name: 'featuredShoeBlock',
      type: 'reference',
      to: [{ type: 'featuredShoeBlock' }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Section settings',
      name: 'sectionSettings',
      type: 'sectionSettings',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Disable / Hide this block in a market',
      name: 'marketAvailability',
      type: 'marketAvailability'
    })
  ]
});
