import {
  filterAlreadyAddedReferences,
  validateAllStringTranslations
} from '@/lib/sanity/studioUtils'
import { Leaf } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

export const natureLabInnovationSection = defineType({
  title: 'Nature Lab Innnovation',
  name: 'natureLabInnovationSection',
  icon: Leaf,
  preview: {
    select: {
      title: 'title.en',
      description: 'description.en'
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.description
      }
    }
  },
  type: 'object',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'i18n.text',
      options: {
        rows: 3
      },
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Innovations',
      description: 'Choose 1-6 innovations from Nature Lab that this shoe uses',
      name: 'innovations',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'natureLabInnovationItem' }],
          options: {
            filter: filterAlreadyAddedReferences
          }
        }
      ],
      validation: (Rule) => Rule.required().min(1).max(6)
    })
  ]
})
