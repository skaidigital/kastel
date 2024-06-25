import {
  INTERNAL_LINK_OPTIONS,
  LINK_TYPES,
  SMILE_DEEP_LINKS,
  SMILE_DEEP_LINK_OPTIONS
} from '@/data/constants'
import { ValidationContext, defineField, defineType } from 'sanity'

export const linkWithoutText = defineType({
  title: 'Link without text',
  name: 'linkWithoutText',
  type: 'object',
  preview: {
    select: {
      to: 'to.title',
      href: 'href'
    },
    prepare(value) {
      const { to, href } = value
      return {
        title: to || href || 'No title',
        subtitle: 'Link'
      }
    }
  },
  fields: [
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      initialValue: 'internal',
      options: {
        list: LINK_TYPES
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Links to',
      name: 'linkTo',
      type: 'reference',
      to: INTERNAL_LINK_OPTIONS,
      hidden: ({ parent }) => parent?.type !== 'internal',
      validation: (Rule) =>
        Rule.custom((linkTo, context: ValidationContext) => {
          if (context.document?._type === 'internal' && !linkTo) {
            return 'Internal link requires a link to a page'
          }
          return true
        })
    }),
    defineField({
      title: 'Smile Launcher',
      description: 'Pick a place in the Smile Launcher',
      name: 'linkToSmileLancher',
      type: 'string',
      initialValue: SMILE_DEEP_LINKS.home,
      options: {
        list: SMILE_DEEP_LINK_OPTIONS
      },
      hidden: ({ parent }) => parent?.type !== 'smile',
      validation: (Rule) =>
        Rule.custom((linkToSmileLancher, context: any) => {
          if (context.parent?.type === 'smile' && !linkToSmileLancher) {
            return 'Smile link requires a link to a place in the Smile Launcher'
          }
          return true
        })
    }),
    defineField({
      title: 'URL',
      name: 'href',
      type: 'url',
      description: 'Example: "https://www.google.com"',
      hidden: ({ parent }) => parent?.type !== 'external',
      validation: (Rule) =>
        Rule.custom((href, context: ValidationContext) => {
          if (context.document?.type === 'external' && !href) {
            return 'External link requires a link to a page'
          }
          return true
        })
    }),
    defineField({
      title: 'Open in new tab?',
      name: 'openInNewTab',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => parent?.type !== 'external',
      validation: (Rule) =>
        Rule.custom((openInNewTab, context: any) => {
          if (context.parent?.type === 'external' && openInNewTab === undefined) {
            return 'You have to choose if the link should open in a new tab or not'
          }
          return true
        })
    })
  ]
})
