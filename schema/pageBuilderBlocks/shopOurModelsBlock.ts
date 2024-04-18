import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { Slideshow } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const shopOurModelsBlock = defineType({
  title: 'Shop Our Models block',
  name: 'shopOurModelsBlock',
  type: 'document',
  icon: Slideshow,
  preview: {
    select: {
      title: 'internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Shop Our Models block'
      };
    }
  },
  fields: [
    defineField({
      title: 'Internal title',
      name: 'internalTitle',
      type: 'internalTitle'
    }),
    defineField({
      title: 'Badge (optional)',
      name: 'badge',
      type: 'reference',
      to: [{ type: 'badge' }]
    }),
    defineField({
      title: 'Shoes',
      name: 'shoes',
      type: 'array',
      validation: (Rule) => Rule.min(2).max(6),
      of: [
        {
          type: 'object',
          preview: {
            select: {
              title: 'title.no' || 'Untitled',
              media: 'shoe.mainImage'
            },
            prepare({ title, media }) {
              return {
                title: title || 'No title defined',
                media: media || undefined
              };
            }
          },
          fields: [
            defineField({
              title: 'Shoe Model',
              name: 'shoe',
              type: 'reference',
              to: [{ type: 'productType' }],
              validation: (Rule) => Rule.required()
            }),
            defineField({
              title: 'Title',
              name: 'title',
              type: 'i18n.string',
              validation: validateAllStringTranslations
            }),
            defineField({
              title: 'Description (optional)',
              name: 'description',
              type: 'i18n.text',
              options: {
                rows: 2
              }
            }),
            defineField({
              title: 'Product details',
              description: 'Add 2-4 dropdowns with product details',
              name: 'details',
              type: 'array',
              of: [
                {
                  type: 'object',
                  preview: {
                    select: {
                      title: 'title.no'
                    },
                    prepare({ title }) {
                      return {
                        title: title || 'No title defined'
                      };
                    }
                  },
                  fields: [
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
                      options: {
                        rows: 2
                      },
                      validation: validateAllStringTranslations
                    })
                  ]
                }
              ],
              validation: (Rule) => Rule.required().min(2).max(4)
            })
          ]
        }
      ]
    })
  ]
});
