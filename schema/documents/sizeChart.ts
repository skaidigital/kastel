import { validateAllStringTranslations } from '@/lib/sanity/studioUtils'
import { Table } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

export const sizeChart = defineType({
  title: 'Size chart',
  name: 'sizeChart',
  type: 'document',
  icon: Table,
  preview: {
    select: {
      title: 'internalTitle'
    }
  },
  fields: [
    defineField({
      title: 'Internal title',
      name: 'internalTitle',
      type: 'internalTitle',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Description 🇧🇻',
      name: 'description_no',
      type: 'richText',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Description 🇬🇧',
      name: 'description_en',
      type: 'richText',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Description 🇸🇪',
      name: 'description_sv',
      type: 'richText'
    }),
    defineField({
      title: 'Description',
      description: 'The description below the "Size Guide" text in the drawer on the product page',
      name: 'description',
      type: 'i18n.text',
      options: {
        rows: 3
      },
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Chart 🇧🇻',
      name: 'chart_no',
      type: 'table',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Chart 🇬🇧',
      name: 'chart_en',
      type: 'table',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Chart 🇸🇪',
      name: 'chart_sv',
      type: 'table'
    })
  ]
})
