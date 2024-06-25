import { validateAllStringTranslations } from '@/lib/sanity/studioUtils'
import { Subtitles } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

export const fullBleedMediaBlock = defineType({
  title: 'Full Bleed Media',
  name: 'fullBleedMediaBlock',
  type: 'document',
  icon: Subtitles,
  preview: {
    select: {
      title: 'internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'No title defined',
        subtitle: 'Full Bleed Media'
      }
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
    // ? Add button? Think so
    defineField({
      title: 'Image / Video',
      name: 'media',
      type: 'media',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Aspect ratio settings',
      name: 'aspectRatioSettings',
      type: 'aspectRatioSettings',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Text placement – Mobile',
      name: 'textPlacementMobile',
      type: 'string',
      options: {
        list: [
          { title: 'Left top', value: 'left-top' },
          { title: 'Left center', value: 'left-center' },
          { title: 'Left bottom', value: 'left-bottom' },
          { title: 'Center top', value: 'center-top' },
          { title: 'Center', value: 'center' },
          { title: 'Center bottom', value: 'center-bottom' }
        ]
      },
      initialValue: 'center',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Text placement – Desktop',
      name: 'textPlacementDesktop',
      type: 'string',
      options: {
        list: [
          { title: 'Left top', value: 'left-top' },
          { title: 'Left center', value: 'left-center' },
          { title: 'Left bottom', value: 'left-bottom' },
          { title: 'Center top', value: 'center-top' },
          { title: 'Center', value: 'center' },
          { title: 'Center bottom', value: 'center-bottom' },
          { title: 'Split bottom', value: 'split-bottom' }
        ]
      },
      initialValue: 'center',
      validation: (Rule) => Rule.required()
    })
  ]
})
