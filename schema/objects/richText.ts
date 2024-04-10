import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { Image, Images, Link, Quotes, Sneaker, TextColumns, Video } from '@phosphor-icons/react';
import { defineArrayMember, defineField } from 'sanity';

export const richText = defineField({
  name: 'richText',
  title: 'Content',
  type: 'array',
  of: [
    defineArrayMember({
      lists: [
        {
          title: 'Bulleted list',
          value: 'bullet'
        },
        {
          title: 'Numbered list',
          value: 'number'
        }
      ],
      marks: {
        annotations: [
          {
            name: 'inlineLink',
            type: 'object',
            title: 'Inline link',
            icon: Link,
            fields: [
              defineField({
                title: 'Lenke',
                name: 'link',
                type: 'linkWithoutText'
              })
            ]
          },
          {
            name: 'productLink',
            type: 'object',
            title: 'Product link',
            icon: Sneaker,
            fields: [
              defineField({
                title: 'Product',
                name: 'product',
                type: 'reference',
                to: [{ type: 'product' }]
              })
            ]
          }
        ],
        decorators: [
          {
            title: 'Italic',
            value: 'em'
          },
          {
            title: 'Bold',
            value: 'strong'
          }
        ]
      },
      styles: [
        {
          title: 'Text (Normal)',
          value: 'text-md'
        },
        {
          title: 'H2',
          value: 'h2'
        },
        {
          title: 'H3',
          value: 'h3'
        },
        {
          title: 'H4',
          value: 'h4'
        },
        {
          title: 'Text (Large)',
          value: 'text-lg'
        },
        {
          title: 'Text (Small)',
          value: 'text-sm'
        }
      ],
      type: 'block'
    }),
    {
      type: 'object',
      name: 'video',
      title: 'Video',
      icon: Video,
      fields: [
        defineField({
          title: 'Video',
          name: 'video',
          type: 'mux.video',
          validation: (Rule) => Rule.required()
        }),
        defineField({
          title: 'Width',
          name: 'width',
          type: 'blogWidthSettings'
        })
      ]
    },
    {
      type: 'image',
      name: 'image',
      title: 'Image',
      icon: Image,
      fields: [
        defineField({
          title: 'Descriptive text for screen readers and search engines',
          type: 'altText',
          name: 'altText'
        }),
        defineField({
          title: 'Width',
          name: 'width',
          type: 'blogWidthSettings'
        })
      ]
    },
    {
      type: 'object',
      name: 'products',
      title: 'Products',
      icon: Sneaker,
      fields: [
        defineField({
          title: 'Title',
          name: 'title',
          type: 'i18n.string',
          validation: validateAllStringTranslations
        }),
        defineField({
          title: 'Products',
          name: 'products',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'product' }]
            }
          ],
          validation: (Rule) => Rule.min(1).max(8)
        })
      ]
    },
    {
      title: 'Quote',
      name: 'quote',
      type: 'reference',
      to: [{ type: 'quote' }],
      icon: Quotes
    },
    {
      title: 'Standout section',
      name: 'standout',
      type: 'object',
      icon: TextColumns,
      preview: {
        select: {
          title: 'content'
        },
        prepare(selection) {
          return {
            title: selection.title[0].children[0].text,
            subtitle: 'Standout section'
          };
        }
      },
      fields: [
        defineField({
          title: 'Background color',
          name: 'backgroundColor',
          type: 'reference',
          to: [{ type: 'colorDocument' }],
          validation: (Rule) => Rule.required()
        }),
        defineField({
          title: 'Content',
          name: 'content',
          type: 'richText',
          validation: (Rule) => Rule.required()
        }),
        defineField({
          title: 'Media',
          name: 'media',
          type: 'media',
          validation: (Rule) => Rule.required()
        })
      ]
    },
    {
      title: 'Image grid',
      name: 'imageGrid',
      type: 'object',
      icon: Images,
      preview: {
        select: {
          images: 'images'
        },
        prepare(selection) {
          return {
            title: selection.images ? `${selection.images.length} images` : 'No images',
            subtitle: 'Image grid'
          };
        }
      },
      fields: [
        defineField({
          title: 'Images',
          description: 'Add 2-3 images',
          name: 'images',
          type: 'array',
          of: [
            {
              type: 'image',
              fields: [
                defineField({
                  title: 'Aspect ratio settings',
                  name: 'aspectRatioSettings',
                  type: 'aspectRatioSettings'
                })
              ]
            }
          ],
          validation: (Rule) => Rule.min(2).max(3)
        })
      ]
    }
  ]
});
