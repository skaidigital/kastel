import { Package } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

export const featuredCollectionSection = defineType({
  title: 'Featured Collection section',
  name: 'featuredCollectionSection',
  type: 'object',
  icon: Package,
  preview: {
    select: {
      title: 'featuredCollectionBlock.internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Featured Collection section'
      }
    }
  },
  fields: [
    defineField({
      title: 'Featured Collection block',
      name: 'featuredCollectionBlock',
      type: 'reference',
      to: [{ type: 'featuredCollectionBlock' }],
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
