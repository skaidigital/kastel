import { TextIcon } from '@radix-ui/react-icons';
import { defineField, defineType } from 'sanity';

export const textBlock = defineType({
  title: 'Text Block',
  name: 'textBlock',
  type: 'document',
  icon: TextIcon,
  preview: {
    select: {
      title: 'internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Text section'
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
      title: 'Content 🇧🇻',
      name: 'contentNo',
      type: 'richText',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Content 🇬🇧',
      name: 'contentEn',
      type: 'richText',
      validation: (Rule) => Rule.required()
    })
  ]
});
