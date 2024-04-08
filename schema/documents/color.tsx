import {
  slugIsUniqueForLangAndSchemaType,
  validateAllStringTranslations
} from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

export const color = defineType({
  title: 'Color',
  name: 'colorDocument',
  type: 'document',
  preview: {
    select: {
      title: 'title.no',
      color: 'color.value'
    },
    prepare({ title, color }) {
      return {
        title: title || 'Untitled',
        media: () => <div style={{ backgroundColor: color, width: '100%', height: '100%' }} />
      };
    }
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Farge',
      name: 'color',
      type: 'simplerColor',
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
            schemaType: 'colorDocument',
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
            schemaType: 'colorDocument',
            lang: 'en',
            context
          })
      },
      validation: (Rule) => Rule.required()
    })
  ]
});
