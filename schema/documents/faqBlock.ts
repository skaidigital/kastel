import {
  filterAlreadyAddedReferences,
  validateAllStringTranslations
} from '@/lib/sanity/studioUtils'
import { List } from '@phosphor-icons/react'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const faqBlock = defineType({
  title: 'FAQ block',
  name: 'faqBlock',
  type: 'document',
  icon: List,
  preview: {
    select: {
      title: 'internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'No title defined',
        subtitle: 'FAQ block',
        icon: List
      }
    }
  },
  fields: [
    defineField({
      title: 'Internal title',
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
      title: 'Description (optional)',
      name: 'description',
      type: 'i18n.text',
      options: {
        rows: 3
      }
    }),
    defineField({
      title: 'FAQs',
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'question' }],
          options: {
            filter: filterAlreadyAddedReferences
          }
        })
      ],
      validation: (Rule) => Rule.required().max(20)
    }),
    defineField({
      title: 'Badge (optional)',
      name: 'badge',
      type: 'reference',
      to: [{ type: 'badge' }]
    })
  ]
})
