import { MARKETS, PRODUCT_OPTIONS } from '@/data/constants';
import { i18nSlug, i18nString } from '@/lib/sanity/studioUtils';
import { GridFour } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const productOptionType = defineType({
  title: 'Option group',
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
        'An option group is a collection of options. When you create an option you will select which option group it belongs to. For example, if you have a "Size" option, you would create a "Size" option group and add the sizes as options when you create them.',
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
