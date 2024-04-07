import { Check } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const pageNotFound = defineType({
  title: 'Page not found',
  name: 'pageNotFound',
  type: 'document',
  icon: Check,
  preview: {
    prepare() {
      return {
        title: 'Page not found'
      };
    }
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string'
    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'i18n.string'
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'figure',
      options: {
        hotspot: true
      }
    })
  ]
});
