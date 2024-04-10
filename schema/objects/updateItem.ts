import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

export const updateItem = defineType({
  title: 'Item',
  name: 'updateItem',
  type: 'object',
  preview: {
    select: {
      title: 'title.en',
      date: 'date'
    },
    prepare({ title, date }) {
      return {
        title: title || 'Untitled',
        subtitle: date || undefined
      };
    }
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{ type: 'person' }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Date',
      name: 'date',
      type: 'date',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Content 🇧🇻',
      name: 'contentNo',
      type: 'richTextNatureLab',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Content 🇬🇧',
      name: 'contentEn',
      type: 'richTextNatureLab',
      validation: (Rule) => Rule.required()
    })
  ]
});
