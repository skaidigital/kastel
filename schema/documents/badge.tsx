import { validateAllStringTranslations } from '@/lib/sanity/studioUtils'
import { Tag } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

export const badge = defineType({
  title: 'Badge',
  name: 'badge',
  type: 'document',
  icon: Tag,
  preview: {
    select: {
      title: 'title.en'
    },
    prepare({ title }) {
      return {
        title,
        icon: Tag
      }
    }
  },
  fields: [
    defineField({
      title: 'What is a badge?',
      description:
        'A badge is a small piece of information that can be used to highlight something on product cards and above titles for example',
      name: 'myCustomNote',
      type: 'note',
      options: {
        tone: 'positive'
      }
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    })
  ]
})
