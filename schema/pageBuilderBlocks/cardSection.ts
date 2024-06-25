import { GridFour } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

export const cardSection = defineType({
  title: 'Card section',
  name: 'cardSection',
  type: 'object',
  icon: GridFour,
  preview: {
    prepare() {
      return {
        title: 'Card section',
        subtitle: 'Card section'
      }
    }
  },
  fields: [
    defineField({
      title: 'Cards',
      name: 'cardBlock',
      type: 'reference',
      to: [{ type: 'cardBlock' }],
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
