import { Video } from '@phosphor-icons/react'
import { defineType } from 'sanity'

export const youtubeEmbed = defineType({
  name: 'youtubeEmbed',
  title: 'Youtube Embed',
  type: 'object',
  icon: Video,
  fields: [
    {
      title: 'URL',
      name: 'url',
      type: 'url',
      validation: (Rule) => Rule.required()
    }
  ]
})
