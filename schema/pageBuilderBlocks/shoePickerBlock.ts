import {
  filterAlreadyAddedReferences,
  validateAllStringTranslations
} from '@/lib/sanity/studioUtils';
import { Image, Sneaker } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const shoePickerBlock = defineType({
  title: 'Shoe Picker block',
  name: 'shoePickerBlock',
  type: 'document',
  icon: Sneaker,
  preview: {
    select: {
      title: 'internalTitle'
    },
    prepare: ({ title }) => ({
      title: title || 'Untitled',
      subtitle: 'Shoe Picker block'
    })
  },
  fields: [
    defineField({
      title: 'Internal title',
      name: 'internalTitle',
      type: 'internalTitle'
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Types',
      name: 'types',
      type: 'array',
      validation: (Rule) => Rule.required().min(2).max(5),
      of: [
        {
          type: 'object',
          icon: Sneaker,
          preview: {
            select: {
              title: 'title.en'
            }
          },
          fields: [
            defineField({
              title: 'Title',
              description: "I.e. 'Waterproof'",
              name: 'title',
              type: 'i18n.string',
              validation: validateAllStringTranslations
            }),
            defineField({
              title: 'Shoes / Media',
              name: 'items',
              type: 'array',
              validation: (Rule) => Rule.required().min(3).max(12),
              of: [
                { type: 'media', title: 'Image/Video', icon: Image },
                {
                  title: 'Product',
                  type: 'reference',
                  to: [{ type: 'product' }],
                  options: {
                    filter: filterAlreadyAddedReferences
                  }
                }
              ]
            })
          ]
        }
      ]
    })
  ]
});
