import {
  slugIsUniqueForLangAndSchemaType,
  validateAllStringTranslations
} from '@/lib/sanity/studioUtils';
import { Gear, Package, PaintBrush } from '@phosphor-icons/react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const collection = defineType({
  title: 'Kolleksjon',
  name: 'collection',
  type: 'document',
  icon: Package,
  groups: [
    {
      icon: PaintBrush,
      name: 'editorial',
      title: 'Editorial',
      default: true
    },
    {
      icon: Gear,
      name: 'settings',
      title: 'Settings'
    }
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
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations,
      group: 'editorial'
    }),
    defineField({
      title: 'Short description',
      name: 'descriptionShort',
      type: 'i18n.text',
      validation: validateAllStringTranslations,
      options: {
        rows: 2
      },
      group: 'editorial'
    }),
    defineField({
      title: 'Long description',
      name: 'descriptionLong',
      type: 'i18n.text',
      validation: validateAllStringTranslations,
      options: {
        rows: 5
      },
      group: 'editorial'
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
            schemaType: 'collection',
            lang: 'no',
            context
          })
      },
      validation: (Rule) => Rule.required(),
      group: 'settings'
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
            schemaType: 'collection',
            lang: 'en',
            context
          })
      },
      validation: (Rule) => Rule.required(),
      group: 'settings'
    }),
    defineField({
      title: 'Products',
      name: 'products',
      type: 'array',
      group: 'editorial',
      of: [
        defineArrayMember({
          title: 'Product',
          name: 'product',
          type: 'collectionProduct'
        })
      ],
      validation: (Rule) => Rule.min(1)
    }),
    defineField({
      title: 'Moods',
      name: 'moods',
      type: 'array',
      group: 'editorial',
      options: {
        layout: 'grid'
      },
      of: [
        defineArrayMember({
          title: 'Mood',
          name: 'mood',
          type: 'media'
        })
      ]
    }),
    defineField({
      title: 'Page builder',
      name: 'pageBuilder',
      type: 'pageBuilder',
      group: 'settings'
    }),
    defineField({
      title: 'Metadata',
      name: 'metadata',
      type: 'metadata',
      group: 'settings'
    })
  ]
});
