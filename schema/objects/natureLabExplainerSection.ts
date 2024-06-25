import { Recycle } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

export const natureLabExplainerSection = defineType({
  title: 'Nature Lab Explainer section',
  name: 'natureLabExplainerSection',
  type: 'object',
  icon: Recycle,
  preview: {
    select: {
      title: 'natureLabExplainerBlock.internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Nature Lab Explainer section'
      }
    }
  },
  fields: [
    defineField({
      title: 'Nature Lab Explainer block',
      name: 'natureLabExplainerBlock',
      type: 'reference',
      to: [{ type: 'natureLabExplainerBlock' }],
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
