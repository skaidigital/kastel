import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { Quotes } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const quote = defineType({
  title: 'Quote',
  name: 'quote',
  type: 'document',
  icon: Quotes,
  preview: {
    select: {
      title: 'internalTitle'
      //   subtitle: 'by'
    },
    prepare({ title }) {
      return {
        title
        // subtitle: subtitle || undefined
      };
    }
  },
  fields: [
    defineField({
      title: 'Internal title',
      name: 'internalTitle',
      type: 'internalTitle'
    }),
    defineField({
      title: 'Quote',
      description: 'You do not need to add quotation marks',
      name: 'text',
      type: 'i18n.text',
      options: {
        rows: 3
      },
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Show author?',
      name: 'showAuthor',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Type',
      name: 'authorType',
      type: 'string',
      options: {
        list: [
          { title: 'Person in Sanity', value: 'internal' },
          { title: 'External', value: 'external' }
        ],
        layout: 'radio'
      },
      initialValue: 'internal',
      validation: (Rule) => Rule.required(),
      hidden: ({ parent }) => !parent?.showAuthor
    }),
    defineField({
      title: 'Author',
      name: 'person',
      type: 'reference',
      to: [{ type: 'person' }],
      validation: (Rule) =>
        Rule.custom((person, context: any) => {
          if (
            context?.parent?.showAuthor &&
            context?.parent?.authorType === 'internal' &&
            !person
          ) {
            return 'Please select a person';
          }
          return true;
        }),
      hidden: ({ parent }) => !parent?.showAuthor || parent?.authorType === 'external'
    }),
    defineField({
      title: 'Author',
      name: 'by',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((person, context: any) => {
          if (
            context?.parent?.showAuthor &&
            context?.parent?.authorType === 'external' &&
            !person
          ) {
            return 'Please write the name of the author';
          }
          return true;
        }),
      hidden: ({ parent }) => !parent?.showAuthor || parent?.authorType === 'internal'
    })
  ]
});
