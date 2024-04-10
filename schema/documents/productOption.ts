import {
  slugIsUniqueForLangAndSchemaType,
  validateAllStringTranslations
} from '@/lib/sanity/studioUtils';
import { Square } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const productOption = defineType({
  title: 'Option',
  name: 'productOption',
  type: 'document',
  icon: Square,
  preview: {
    select: {
      title: 'title.no',
      type: 'type.title.no',
      internal: 'internalUsedFor'
    },
    prepare({ title, type, internal }) {
      const subTitle = internal || type;
      return {
        title: title || 'No title set',
        subtitle: subTitle || 'No subtitle set'
      };
    }
  },
  fields: [
    defineField({
      title: 'What is a option?',
      description:
        'A option is a specific option for a given option type. For example, if you have a option group called "Size", you would create a option called "Small".',
      name: 'myCustomNote',
      type: 'note',
      options: {
        tone: 'positive'
      }
    }),
    defineField({
      title: 'Option used for',
      description: 'This is only used for internal reference, to make it easier identifying.',
      name: 'internalUsedFor',
      type: 'string'
    }),
    defineField({
      title: 'Type',
      name: 'type',
      type: 'reference',
      to: { type: 'productOptionType' },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Slug 🇧🇻',
      name: 'slug_no',
      type: 'slug',
      options: {
        source: 'title.no',
        isUnique: (slug, context) =>
          slugIsUniqueForLangAndSchemaType({
            slug,
            schemaType: 'productOptionType',
            lang: 'no',
            context
          })
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Slug 🇬🇧',
      name: 'slug_en',
      type: 'slug',
      options: {
        source: 'title.en',
        isUnique: (slug, context) =>
          slugIsUniqueForLangAndSchemaType({
            slug,
            schemaType: 'productOptionType',
            lang: 'en',
            context
          })
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Color',
      name: 'color',
      type: 'reference',
      to: [{ type: 'colorDocument' }],
      hidden: ({ document }) => document?.type !== 'color',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const { document } = context;
          if (document?.type === 'color' && !value) {
            return 'You have to set this field';
          }

          return true;
        })
    })
  ]
});
