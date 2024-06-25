import { validateAllStringTranslations } from '@/lib/sanity/studioUtils'
import { Star } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

export const uspExplainerBlock = defineType({
  title: 'USP Explainer block',
  name: 'uspExplainerBlock',
  type: 'document',
  icon: Star,
  preview: {
    select: {
      title: 'internalTitle'
    },
    prepare: ({ title }) => ({
      title: title || 'Untitled',
      subtitle: 'USP Explainer block'
    })
  },
  fields: [
    defineField({
      title: 'Internal title',
      name: 'internalTitle',
      type: 'internalTitle'
    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'object',
          icon: Star,
          preview: {
            select: {
              title: 'title.en'
            },
            prepare: ({ title }) => ({
              title: title || 'Untitled'
            })
          },
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
                rows: 5
              },
              validation: validateAllStringTranslations
            }),
            defineField({
              title: 'USPs',
              name: 'usps',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'usp' }] }],
              validation: (Rule) => Rule.required()
            }),
            defineField({
              title: 'Image / Video',
              name: 'media',
              type: 'media',
              validation: (Rule) => Rule.required()
            })
          ]
        }
      ]
    })
  ]
})
