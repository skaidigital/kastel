import { PRODUCT_OPTIONS } from '@/data/constants';
import {
  slugIsUniqueForLangAndSchemaType,
  validateAllStringTranslations
} from '@/lib/sanity/studioUtils';
import { GridFour } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const productOptionType = defineType({
  title: 'Option group',
  name: 'productOptionType',
  type: 'document',
  icon: GridFour,
  preview: {
    select: {
      title: 'title.en'
    },
    prepare: ({ title }) => {
      return {
        title: title || 'Missing title',
        subtitle: 'Option group'
      };
    }
  },
  fields: [
    defineField({
      title: 'What is a product option type?',
      description:
        'An option group is a collection of options. When you create an option you will select which option group it belongs to. For example, if you have a "Size" option, you would create a "Size" option group and add the sizes as options when you create them.',
      name: 'myCustomNote',
      type: 'note',
      options: {
        tone: 'positive'
      }
    }),
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: PRODUCT_OPTIONS.map((option) => ({
          title: option.name,
          value: option.id
        }))
      }
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
      validation: (Rule: any) =>
        Rule.custom((value: any) => {
          if (!value?.current) {
            return 'Slug is required';
          }
          if (value?.current?.includes(' ')) {
            return 'Slug cannot contain spaces';
          }
          return true;
        })
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
      validation: (Rule: any) =>
        Rule.custom((value: any) => {
          if (!value?.current) {
            return 'Slug is required';
          }
          if (value?.current?.includes(' ')) {
            return 'Slug cannot contain spaces';
          }
          return true;
        })
    })
  ]
});
