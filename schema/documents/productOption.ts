import { MARKETS } from '@/data/constants';
import { i18nSlug, i18nString } from '@/lib/sanity/studioUtils';
import { Square } from '@phosphor-icons/react';
import { SlugRule, defineField, defineType } from 'sanity';

// TODO sette type på optinType som enten er text eller color.
// TODO hvis parent er color, så må du sette en farge her.
export const productOption = defineType({
  title: 'Product Option',
  name: 'productOption',
  type: 'document',
  icon: Square,
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
      title: 'title_no',
      type: 'type.title_no',
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
      title: 'What is a product option?',
      description:
        'A product option is a specific option for a given product option type. For example, if you have a product option type called "Size", you would create a product option called "Small".',
      name: 'myCustomNote',
      group: 'settings',
      type: 'note',
      options: {
        tone: 'positive'
      }
    }),
    defineField({
      title: 'Option used for',
      description: 'This is only used for internal reference, to make it easier identifying.',
      name: 'internalUsedFor',
      group: 'settings',
      type: 'string'
    }),

    ...i18nString({
      title: 'Title',
      name: 'title',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Type',
      name: 'type',
      type: 'reference',
      to: { type: 'productOptionType' },
      group: 'settings',
      validation: (Rule) => Rule.required()
    }),
    ...i18nSlug({ schemaType: 'productOption', validation: (Rule: SlugRule) => Rule.required() }),
    defineField({
      title: 'Color',
      name: 'color',
      type: 'reference',
      to: [{ type: 'colorDocument' }],
      group: 'settings',
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
