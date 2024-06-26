import {
  slugIsUniqueForLangAndSchemaType,
  validateAllStringTranslations
} from '@/lib/sanity/studioUtils';
import { Gavel } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const legalPage = defineType({
  title: 'Legal page',
  name: 'legalPage',
  type: 'document',
  icon: Gavel,
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
      title: 'Content 🇧🇻',
      name: 'content_no',
      type: 'legalPageText',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Content 🇬🇧',
      name: 'content_en',
      type: 'legalPageText',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Content 🇸🇪',
      name: 'content_sv',
      type: 'legalPageText'
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
            schemaType: 'legalPage',
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
    }),
    defineField({
      title: 'Slug 🇸🇪',
      name: 'slug_sv',
      type: 'slug',
      options: {
        source: 'title.sv',
        isUnique: (slug, context) =>
          slugIsUniqueForLangAndSchemaType({
            slug,
            schemaType: 'legalPage',
            lang: 'sv',
            context
          })
      }
    }),
    defineField({
      title: 'Metadata',
      name: 'metadata',
      type: 'metadata'
    })
  ]
});
