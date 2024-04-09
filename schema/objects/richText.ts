import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { Image, Link, Sneaker, Video } from '@phosphor-icons/react';
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
    }
  ]
});
