import { validateAllStringTranslations } from '@/lib/sanity/studioUtils'
import { Check } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

export const layoutUspMarquee = defineType({
  title: 'Layout USP Marquee',
  name: 'layoutUSPMarquee',
  type: 'document',
  icon: Check,
  preview: {
    prepare() {
      return {
        title: 'Layout UPS Marquee'
      }
    }
  },
  fields: [
    defineField({
      title: 'What is this?',
      description: 'This is the marquee that is directly above the footer. Choose 1-4 items',
      name: 'myCustomNote',
      type: 'note',
      options: {
        tone: 'positive'
      }
    }),
    defineField({
      title: 'Items',
      name: 'items',
      type: 'array',
      of: [
        defineField({
          title: 'Item',
          name: 'item',
          type: 'object',
          icon: Check,
          preview: {
            select: {
              title: 'item.en'
            }
          },
          fields: [
            defineField({
              title: 'Item',
              name: 'item',
              type: 'i18n.string',
              validation: validateAllStringTranslations
            })
          ]
        })
      ],
      validation: (Rule) => Rule.required().min(1).max(4)
    })
  ]
})
