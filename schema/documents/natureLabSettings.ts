import { validateAllStringTranslations } from '@/lib/sanity/studioUtils'
import { Gear, Sneaker } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

export const natureLabSettings = defineType({
  title: 'Nature Lab settings page',
  name: 'natureLabSettings',
  type: 'document',
  icon: Gear,
  preview: {
    prepare() {
      return {
        title: 'Nature Lab settings'
      }
    }
  },
  groups: [
    {
      icon: Sneaker,
      name: 'productStatus',
      title: 'Product statuses',
      default: true
    }
  ],

  fields: [
    defineField({
      title: 'What is this?',
      description:
        'Here you can set what the title, description for the "status" tab in the Nature Lab product pages. The price and discount percentage will be populated from the product itself.',
      name: 'myCustomNote',
      type: 'note',
      group: 'productStatus'
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations,
      group: 'productStatus'
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'i18n.text',
      options: {
        rows: 3
      },
      validation: validateAllStringTranslations,
      group: 'productStatus'
    }),
    defineField({
      title: 'Pre order',
      name: 'preOrder',
      type: 'natureLabProductStatusItem',
      group: 'productStatus',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Production',
      name: 'production',
      type: 'natureLabProductStatusItem',
      group: 'productStatus',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Shipping',
      name: 'shipping',
      type: 'natureLabProductStatusItem',
      group: 'productStatus',
      validation: (Rule) => Rule.required()
    })
  ]
})
