import { MARKETS } from '@/data/constants';
import {
  i18nField,
  i18nSlug,
  i18nString,
  validateAllStringTranslations
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
      icon: () => '⚙️',
      name: 'settings',
      title: 'Settings',
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
      group: 'settings'
    }),
    ...i18nString({
      title: 'Title',
      name: 'title',
      validation: (rule) => rule.required()
    }),
    defineField({
      title: 'Short description',
      name: 'descriptionShort',
      type: 'i18n.text',
      validation: validateAllStringTranslations,
      options: {
        rows: 2
      },
      group: 'settings'
    }),
    defineField({
      title: 'Long description',
      name: 'descriptionLong',
      type: 'i18n.text',
      validation: validateAllStringTranslations,
      options: {
        rows: 5
      },
      group: 'settings'
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
      group: 'settings',
      of: [
        defineArrayMember({
          title: 'Product',
          name: 'product',
          type: 'collectionProduct'
        })
      ]
    }),
    defineField({
      title: 'Moods',
      name: 'moods',
      type: 'array',
      group: 'settings',
      options: {
        layout: 'grid'
      },
      of: [
        defineArrayMember({
          title: 'Mood',
          name: 'collectionImage',
          type: 'collectionImage'
        })
      ]
    }),
    defineField({
      title: 'Page builder',
      name: 'pageBuilder',
      type: 'pageBuilder',
      group: 'settings'
    }),
    ...i18nField({
      title: 'Metadata',
      name: 'metadata',
      type: 'metadata'
    })
  ]
});
