import { MARKETS } from '@/data/constants';
import { filterAlreadyAddedReferences, i18nField } from '@/lib/sanity/studioUtils';
import { Question, Square } from '@phosphor-icons/react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const productType = defineType({
  title: 'Product Type',
  name: 'productType',
  type: 'document',
  icon: Square,
  preview: {
    select: {
      title: 'internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled'
      };
    }
  },
  groups: [
    {
      icon: () => '🙌',
      name: 'shared',
      title: 'Shared',
      default: true
    },
    ...MARKETS.map((market) => ({
      name: market.id,
      title: market.name,
      icon: () => market.flag
    }))
  ],
  fields: [
    defineField({
      title: 'What is this?',
      description:
        'A product type is used to share images, page builder blocks and other content between related products. It is also used to link to products that are of the same type from within a product page',
      name: 'myCustomNote',
      type: 'note',
      options: {
        icon: () => <Question size={16} weight="duotone" />,
        tone: 'positive'
      },
      group: 'shared'
    }),
    defineField({
      title: 'Internal title',
      name: 'internalTitle',
      type: 'internalTitle',
      validation: (Rule) => Rule.required(),
      group: 'shared'
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'i18n.string',
      validation: (Rule) => Rule.required(),
      group: 'shared'
    }),
    defineField({
      title: 'Gallery',
      name: 'gallery',
      type: 'gallery',
      options: {
        layout: 'grid'
      },
      group: 'shared'
    }),
    ...i18nField({
      title: 'Description',
      name: 'description',
      type: 'richText'
    }),
    defineField({
      title: 'Page builder',
      name: 'pageBuilder',
      type: 'pageBuilder',
      group: 'shared'
    }),
    defineField({
      title: 'Accordions',
      name: 'accordions',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'accordion' }],
          options: {
            filter: filterAlreadyAddedReferences
          }
        })
      ],
      group: 'shared'
    })
  ]
});
