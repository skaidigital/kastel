import { MegaphoneSimple } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

export const validateAllStringsIfTypeIs = (type: string) => (Rule: any) =>
  Rule.custom((value: any, context: any) => {
    if (context?.parent?.isShown === false) {
      return true
    }

    if (context?.parent?.type === type) {
      const hasNo = value?.no
      const hasEn = value?.en

      if (!hasNo || !hasEn) {
        return [
          !hasNo && {
            message: 'You must provide a Norwegian translation',
            paths: ['no']
          },
          !hasEn && {
            message: 'You must provide an English translation',
            paths: ['en']
          }
        ].filter(Boolean)
      }
    }

    return true
  })

export const popup = defineType({
  title: 'Popup',
  name: 'popup',
  type: 'document',
  icon: MegaphoneSimple,
  preview: {
    prepare() {
      return {
        title: 'Popup'
      }
    }
  },
  groups: [
    { title: 'Settings', name: 'settings', default: true },
    { title: 'Info popup', name: 'info' },
    { title: 'Newsletter popup', name: 'newsletter' }
  ],
  fields: [
    defineField({
      title: 'Show popup?',
      name: 'isShown',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required(),
      group: 'settings'
    }),
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Info', value: 'info' },
          { title: 'Newsletter Signup', value: 'newsletter' }
        ]
      },
      initialValue: 'info',
      validation: (Rule) => Rule.required(),
      group: 'settings'
    }),
    defineField({
      title: 'Badge (optional)',
      name: 'badgeInfo',
      type: 'reference',
      to: [{ type: 'badge' }],
      group: 'info'
    }),
    defineField({
      title: 'Title',
      name: 'titleInfo',
      type: 'i18n.string',
      validation: validateAllStringsIfTypeIs('info'),
      group: 'info'
    }),
    defineField({
      title: 'Badge (optional)',
      name: 'badgeNewsletter',
      type: 'reference',
      to: [{ type: 'badge' }],
      group: 'newsletter'
    }),
    defineField({
      title: 'Title',
      name: 'titleNewsletter',
      type: 'i18n.string',
      validation: validateAllStringsIfTypeIs('newsletter'),
      group: 'newsletter'
    }),
    defineField({
      title: 'Image',
      name: 'imageInfo',
      type: 'figure',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context?.parent?.isShown === false) {
            return true
          }

          if (context.parent.type === 'info' && !value) {
            return 'Required'
          }

          return true
        }),
      group: 'info'
    }),
    defineField({
      title: 'Content',
      name: 'contentInfo',
      type: 'i18n.text',
      options: {
        rows: 3
      },
      validation: validateAllStringsIfTypeIs('info'),
      group: 'info'
    }),
    defineField({
      title: 'Link',
      name: 'linkInfo',
      type: 'link',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context?.parent?.isShown === false) {
            return true
          }

          if (context.parent.type === 'info' && !value) {
            return 'Required'
          }

          return true
        }),
      group: 'info'
    }),
    defineField({
      title: 'Image',
      name: 'imageNewsletter',
      type: 'figure',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context?.parent?.isShown === false) {
            return true
          }

          if (context.parent.type === 'newsletter' && !value) {
            return 'Required'
          }

          return true
        }),
      group: 'newsletter'
    }),
    defineField({
      title: 'Content',
      name: 'contentNewsletter',
      type: 'i18n.text',
      options: {
        rows: 3
      },
      validation: validateAllStringsIfTypeIs('newsLetter'),
      group: 'newsletter'
    }),
    defineField({
      title: 'CTA button text',
      name: 'buttonTextNewsletter',
      type: 'i18n.string',
      validation: validateAllStringsIfTypeIs('newsletter'),
      group: 'newsletter'
    })
  ]
})
