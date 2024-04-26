import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

export const productDisplay = defineType({
  title: 'Product display (Optional)',
  name: 'productDisplay',
  type: 'object',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string'
      // validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Products',
      name: 'products',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              title: 'Product',
              name: 'product',
              type: 'reference',
              to: [{ type: 'product' }],
              validation: (Rule) => Rule.required()
            }),
            defineField({
              title: 'Title',
              name: 'title',
              type: 'i18n.string',
              validation: validateAllStringTranslations
            }),
            defineField({
              title: 'Description',
              name: 'description',
              type: 'i18n.text',
              validation: validateAllStringTranslations
            }),
            defineField({
              title: 'Badge (optional)',
              name: 'badge',
              type: 'reference',
              to: [{ type: 'badge' }]
            })
          ]
        }
      ]
      // validation: (Rule) => Rule.min(1).max(4)
    })
  ]
});
