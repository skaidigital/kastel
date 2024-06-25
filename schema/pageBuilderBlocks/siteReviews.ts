import { ThumbsUp } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

export const siteReviews = defineType({
  title: 'Site reviews',
  name: 'siteReviews',
  type: 'object',
  icon: ThumbsUp,
  preview: {
    prepare() {
      return {
        title: 'Enabled',
        subtitle: 'Site reviews'
      }
    }
  },
  fields: [
    defineField({
      title: 'Enabled',
      description: 'You do not need to do anything else to enable this block',
      name: 'myCustomNote',
      type: 'note',
      options: {
        tone: 'positive'
      }
    }),
    defineField({
      title: 'Is enabled',
      name: 'isEnabled',
      type: 'boolean',
      initialValue: true,
      hidden: true
    })
  ]
})
