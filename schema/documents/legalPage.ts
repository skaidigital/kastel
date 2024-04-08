import {
  slugIsUniqueForLangAndSchemaType,
  validateAllStringTranslations
} from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

export const legalPage = defineType({
  title: 'Legal page',
  name: 'legalPage',
  type: 'document',
  preview: {
    select: {
      title: 'internalTitle'
    },
    prepare: ({ title }) => {
      return {
        title: title || 'Untitled',
        subtitle: 'Legal page'
      };
    }
  },
  fields: [
    defineField({
      name: 'internalTitle',
      type: 'internalTitle'
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Subtitle (optional)',
      name: 'subtitle',
      type: 'i18n.text',
      options: {
        rows: 3
      }
    }),
    defineField({
      title: 'Badge (optional)',
      name: 'badge',
      type: 'reference',
      to: [{ type: 'badge' }]
    }),
    defineField({
      title: 'Content 🇧🇻',
      name: 'contentNo',
      type: 'richText',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Content 🇬🇧',
      name: 'contentEn',
      type: 'richText',
      validation: (Rule) => Rule.required()
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
            schemaType: 'legalPage',
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
            schemaType: 'legalPage',
            lang: 'en',
            context
          })
      },
      validation: (Rule) => Rule.required()
    })
  ]
});
