import { MARKETS } from '@/data/constants';
import {
  filterAlreadyAddedReferences,
  i18nField,
  i18nSlug,
  i18nString
} from '@/lib/sanity/studioUtils';
import { Package } from '@phosphor-icons/react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const collection = defineType({
  title: 'Kolleksjon',
  name: 'collection',
  type: 'document',
  icon: Package,
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
  fields: [
    defineField({
      title: 'Internal title',
      name: 'internalTitle',
      type: 'internalTitle',
      group: 'shared'
    }),
    ...i18nString({
      title: 'Title',
      name: 'title',
      validation: (rule) => rule.required()
    }),
    ...i18nField({
      title: 'Description',
      name: 'description',
      type: 'richText'
    }),
    ...i18nSlug({ schemaType: 'collection' }),
    defineField({
      title: 'Products',
      name: 'products',
      type: 'array',
      group: 'shared',
      of: [
        defineArrayMember({
          title: 'Produkt',
          name: 'product',
          type: 'reference',
          to: [{ type: 'product' }],
          options: {
            filter: filterAlreadyAddedReferences
          }
        })
      ]
    }),
    defineField({
      title: 'Moods',
      name: 'moods',
      type: 'array',
      group: 'shared',
      options: {
        layout: 'grid'
      },
      of: [
        defineArrayMember({
          title: 'Produkt',
          name: 'collectionImage',
          type: 'collectionImage'
        })
      ]
    }),
    ...i18nField({
      title: 'Metadata',
      name: 'metadata',
      type: 'metadata'
    })
  ]
});
