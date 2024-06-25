import { Star } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

export const uspExplainerSection = defineType({
  title: 'USP Explainer section',
  name: 'uspExplainerSection',
  type: 'object',
  icon: Star,
  preview: {
    select: {
      title: 'uspExplainerBlock.internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'USP Explainer section'
      }
    }
  },
  fields: [
    defineField({
      title: 'Shoe picker block',
      name: 'uspExplainerBlock',
      type: 'reference',
      to: [{ type: 'uspExplainerBlock' }],
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
