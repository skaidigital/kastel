import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

export const featuredNavItem = defineType({
  title: 'Featured Nav Item',
  name: 'featuredNavItem',
  type: 'object',
  preview: {
    select: {
      title: 'title.no'
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Featured Nav Item'
      };
    }
  },
  fields: [
    defineField({
      title: 'Image',
      name: 'image',
      type: 'figure',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Link',
      name: 'link',
      type: 'link',
      validation: (Rule) => Rule.required()
    })
  ]
});
