import { validateAllStringTranslations } from '@/lib/sanity/studioUtils'
import { TextHOne } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

export const pageTitle = defineType({
  title: 'Page title',
  name: 'pageTitle',
  type: 'object',
  icon: TextHOne,
  preview: {
    select: {
      title: 'title.en'
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
      title: 'Description',
      name: 'description',
      type: 'i18n.text',
      options: {
        rows: 3
      },
      validation: validateAllStringTranslations
    })
  ]
})
