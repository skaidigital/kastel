import { Calendar } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

export const timelineSection = defineType({
  title: 'Timeline section',
  name: 'timelineSection',
  type: 'object',
  icon: Calendar,
  preview: {
    select: {
      title: 'timelineBlock.title.en'
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Timeline section'
      }
    }
  },
  fields: [
    defineField({
      title: 'Timeline block',
      name: 'timelineBlock',
      type: 'reference',
      to: [{ type: 'timelineBlock' }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Section settings',
      name: 'sectionSettings',
      type: 'sectionSettings',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Disable / Hide this block in a market',
      name: 'marketAvailability',
      type: 'marketAvailability'
    })
  ]
})
