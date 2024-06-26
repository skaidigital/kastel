import { validateAllStringTranslations } from '@/lib/sanity/studioUtils'
import { Sneaker } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

export const phase2Product = defineType({
  title: 'Nature Lab phase 2 product',
  name: 'phase2Product',
  type: 'document',
  icon: Sneaker,
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Product',
      name: 'product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Updates',
      name: 'updates',
      type: 'array',
      of: [{ type: 'updateItem' }]
    })
  ],
  preview: {
    select: {
      title: 'title.no'
    }
  }
})
