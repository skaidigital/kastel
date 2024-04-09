import { Package } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const featuredCollection = defineType({
  title: 'Featured collection',
  name: 'featuredCollection',
  type: 'object',
  icon: Package,
  preview: {
    select: {
      title: 'collection.internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Featured Collection'
      };
    }
  },
  fields: [
    defineField({
      title: 'Collection',
      name: 'collection',
      type: 'reference',
      to: [{ type: 'collection' }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Background image/video',
      name: 'meida',
      type: 'media',
      validation: (Rule) => Rule.required()
    })
  ]
});