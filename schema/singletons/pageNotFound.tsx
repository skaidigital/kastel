import { validateAllStringTranslations } from '@/lib/sanity/studioUtils'
import { Check } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

export const pageNotFound = defineType({
  title: 'Page not found',
  name: 'pageNotFound',
  type: 'document',
  icon: Check,
  preview: {
    prepare() {
      return {
        title: 'Page not found'
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
      title: 'Content',
      name: 'content',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'figure',
      validation: (Rule) => Rule.required()
    })
  ]
})
