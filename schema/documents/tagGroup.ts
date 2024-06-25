import { TAG_OPTIONS } from '@/data/constants'
import {
  slugIsUniqueForLangAndSchemaType,
  validateAllStringTranslations
} from '@/lib/sanity/studioUtils'
import { Folders } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

export const tagGroup = defineType({
  title: 'Tag group',
  name: 'tagGroup',
  type: 'document',
  icon: Folders,
  preview: {
    select: {
      title: 'title.en'
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Tag group'
      }
    }
  },
  fields: [
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: TAG_OPTIONS.map((option) => ({
          title: option.name,
          value: option.id
        }))
      }
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
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
            schemaType: 'tagGroup',
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
            schemaType: 'tagGroup',
            lang: 'en',
            context
          })
      },
      validation: (Rule) => Rule.required()
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
            schemaType: 'tagGroup',
            lang: 'sv',
            context
          })
      }
    })
  ]
})
