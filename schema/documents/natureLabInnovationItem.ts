import { validateAllStringTranslations } from '@/lib/sanity/studioUtils'
import { Leaf } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

export const natureLabInnovationItem = defineType({
  title: 'Nature Lab Innovation Item',
  name: 'natureLabInnovationItem',
  type: 'document',
  icon: Leaf,
  preview: {
    select: {
      title: 'title.en'
    },
    prepare(selection) {
      return {
        title: selection.title
      }
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
      title: 'Description (optional)',
      name: 'description',
      type: 'i18n.text',
      options: {
        rows: 3
      }
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'figure',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Key features',
      name: 'keyFeatures',
      type: 'array',
      of: [
        {
          type: 'object',
          icon: Leaf,
          preview: {
            select: {
              title: 'feature.en'
            }
          },
          fields: [
            defineField({
              title: 'Feature',
              name: 'feature',
              type: 'i18n.string',
              validation: validateAllStringTranslations
            })
          ]
        }
      ],
      validation: (Rule) => Rule.required().min(1).max(5)
    }),
    defineField({
      title: 'Link to the innovation',
      name: 'link',
      type: 'link',
      validation: (Rule) => Rule.required()
    })
  ]
})
