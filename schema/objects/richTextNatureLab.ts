import { Image, Link, Quotes, Sneaker, Video } from '@phosphor-icons/react'
import { defineArrayMember, defineField } from 'sanity'

export const richTextNatureLab = defineField({
  name: 'richTextNatureLab',
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
          title: 'Block quote',
          value: 'blockquote'
        }
      ],
      type: 'block'
    }),
    {
      type: 'mux.video',
      name: 'video',
      title: 'Video',
      icon: Video
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
          title: 'Aspect ratio settings',
          name: 'aspectRatioSettings',
          type: 'aspectRatioSettings',
          validation: (Rule) => Rule.required()
        })
      ]
    },
    {
      type: 'object',
      name: 'products',
      title: 'Products',
      icon: Sneaker,
      preview: {
        select: {
          title: 'title'
        },
        prepare({ title }) {
          return {
            title,
            subtitle: 'Product grid'
          }
        }
      },
      fields: [
        defineField({
          title: 'Title',
          name: 'title',
          type: 'string',
          validation: (Rule) => Rule.required()
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
    }
  ]
})
