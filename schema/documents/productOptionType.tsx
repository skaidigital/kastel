import { MARKETS, PRODUCT_OPTIONS } from '@/data/constants';
import { i18nSlug, i18nString } from '@/lib/sanity/studioUtils';
import { GridFour } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const productOptionType = defineType({
  title: 'Product Option Type',
  name: 'productOptionType',
  type: 'document',
  icon: GridFour,
  groups: [
    {
      name: 'settings',
      title: 'Settings',
      icon: () => '⚙️',
      default: true
    },
    ...MARKETS.map((market) => ({
      name: market.id,
      title: market.name,
      icon: () => market.flag
    }))
  ],
  preview: {
    select: {
      title: 'title_no'
    },
    prepare: ({ title }) => {
      return {
        title: title || 'Missing title'
      };
    }
  },
  fields: [
    defineField({
      title: 'What is a product option type?',
      description:
        'A product option type is a type of option that a product can have. For example, a product can have a size option, a color option, a material option, etc. This is where you define the different types of options that a product can have. This is used to create the different options that a product can have. For example, if you have a product that can have a size option, you would create a product option type called "Size".',
      name: 'myCustomNote',
      group: 'settings',
      type: 'note',
      options: {
        tone: 'positive'
      }
    }),
    ...i18nString({
      title: 'Title',
      name: 'title',
      validation: (Rule) => Rule.required()
    }),
    ...i18nSlug({ schemaType: 'productOptionType' }),
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      group: 'settings',
      validation: (Rule) => Rule.required(),
      options: {
        list: PRODUCT_OPTIONS.map((option) => ({
          title: option.name,
          value: option.id
        }))
      }
    })
  ]
});
