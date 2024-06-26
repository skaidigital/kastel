import {
  InternationalizedObjectField,
  generateObjectFields
} from '@/components/sanity/InternationalizedObjectField'
import { validateAllStringTranslations } from '@/lib/sanity/studioUtils'
import { formatDate } from '@/lib/utils'
import { Article, Chat } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

// TODO Validate everything in the question based on the boolean
// TODO add metadata
// TODO translate callout
// TODO add slug
// TODO add array of content objects (main content)
export const phase1BlogPost = defineType({
  title: 'Nature Lab phase 1 blog post',
  name: 'phase1BlogPost',
  type: 'document',
  icon: Article,
  preview: {
    select: {
      title: 'title.en'
    },
    prepare({ title }) {
      return {
        title: title || 'No title defined',
        subtitle: 'Phase 1 blog post'
      }
    }
  },
  groups: [
    { name: 'settings', title: 'Settings', icon: () => '⚙️', default: true },
    { name: 'editorial', title: 'Editorial', icon: () => '📝' }
  ],
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations,
      group: 'settings'
    }),
    defineField({
      title: 'Experiment ID',
      description: "For example '#2' or 'NLE-2'",
      name: 'experimentId',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'settings'
    }),
    defineField({
      title: 'Start date',
      name: 'startDate',
      type: 'date',
      validation: (Rule) => Rule.required(),
      group: 'settings'
    }),
    defineField({
      title: 'Status',
      name: 'status',
      type: 'string',
      options: {
        list: [
          { value: 'open', title: 'OPEN' },
          { value: 'closed', title: 'CLOSED' }
        ]
      },
      initialValue: 'open',
      validation: (Rule) => Rule.required(),
      group: 'settings'
    }),
    defineField({
      title: 'Callout (optional)',
      description:
        'Can be used for directing the user to a phase 2 product that came from this experiment.',
      name: 'callout',
      type: 'object',
      fields: generateObjectFields({ schemaType: 'richText', type: 'lang' }),
      components: {
        field: InternationalizedObjectField
      },
      group: 'settings'
    }),
    defineField({
      title: 'Updates',
      name: 'updates',
      type: 'array',
      of: [{ type: 'updateItem' }],
      validation: (Rule) => Rule.min(1),
      group: 'editorial'
    }),
    defineField({
      title: 'Allow comments?',
      name: 'allowComments',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) => Rule.required(),
      group: 'settings'
    }),
    defineField({
      title: 'Text below "Feedback from the community"',
      name: 'commentsDescription',
      type: 'object',
      fields: generateObjectFields({ schemaType: 'richText', type: 'lang' }),
      components: {
        field: InternationalizedObjectField
      },
      group: 'settings',
      validation: validateAllStringTranslations,
      hidden: ({ parent }) => !parent?.allowComments
    }),
    defineField({
      title: 'Desktop image',
      name: 'imageDesktop',
      type: 'figure',
      validation: (Rule) => Rule.required(),
      group: 'editorial'
    }),
    defineField({
      title: 'Mobile image',
      name: 'imageMobile',
      type: 'figure',
      validation: (Rule) => Rule.required(),
      group: 'editorial'
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'object',
      fields: generateObjectFields({ schemaType: 'slug', type: 'lang' }),
      components: {
        field: InternationalizedObjectField
      },
      group: 'settings',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Comments',
      name: 'comments',
      type: 'array',
      icon: Chat,
      // Preview with name, text and date
      of: [
        {
          type: 'object',
          title: 'Comment',
          preview: {
            select: {
              name: 'name',
              text: 'text',
              createdAt: 'createdAt'
            },
            prepare({ name, text, createdAt }) {
              return {
                title: `${name} commented (${formatDate(createdAt)})`,
                subtitle: text
              }
            }
          },
          fields: [
            defineField({
              title: 'Name',
              name: 'name',
              type: 'string',
              validation: (Rule) => Rule.required(),
              readOnly: true
            }),
            defineField({
              title: 'Email',
              name: 'email',
              type: 'email',
              validation: (Rule) => Rule.required(),
              readOnly: true
            }),
            defineField({
              title: 'Text',
              name: 'text',
              type: 'text',
              validation: (Rule) => Rule.required(),
              readOnly: true
            }),
            defineField({
              title: 'Created at',
              name: 'createdAt',
              type: 'datetime',
              validation: (Rule) => Rule.required(),
              readOnly: true
            })
          ]
        }
      ],
      group: 'editorial'
    }),
    defineField({
      title: 'Metadata',
      name: 'metadata',
      type: 'metadata',
      group: 'settings'
    })
  ]
})
