import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { Image, Sneaker } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const shoePicker = defineType({
  title: 'Shoe picker',
  name: 'shoePicker',
  type: 'document',
  icon: Sneaker,
  preview: {
    select: {
      title: 'internalTitle'
    },
    prepare: ({ title }) => ({
      title: title || 'Untitled',
      subtitle: 'Shoe picker'
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
      of: [
        {
          type: 'object',
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
              of: [
                { type: 'media', title: 'Image/Video', icon: Image },
                {
                  title: 'Product',
                  type: 'reference',
                  to: [{ type: 'product' }]
                }
              ]
            })
          ]
        }
      ]
    })
  ]
});