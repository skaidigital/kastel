import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import {
  Crosshair,
  Image,
  Images,
  Link,
  Quotes,
  Sneaker,
  TextColumns,
  Video
} from '@phosphor-icons/react';
import { defineArrayMember, defineField } from 'sanity';

export const blogPostText = defineField({
  name: 'blogPostText',
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
          title: 'Normal',
          value: 'normal'
          // component: ({ children }: any) => {
          //   return <p className="text-sm text-brand-mid-grey lg:text-md">{children}</p>;
          // }
        },
        {
          title: 'H2',
          value: 'h2'
          // component: ({ children }: any) => {
          //   return <h2 className="text-heading-sm font-bold text-brand-dark-grey">{children}</h2>;
          // }
        },
        {
          title: 'H3',
          value: 'h3'
          // component: ({ children }: any) => {
          //   return <h2 className="text-heading-xs font-bold text-brand-dark-grey">{children}</h2>;
          // }
        },
        {
          title: 'H4',
          value: 'h4'
        },
        {
          title: 'Text (Large)',
          value: 'text-lg'
          // component: ({ children }: any) => {
          //   return <p className="text-lg text-brand-mid-grey">{children}</p>;
          // }
        },
        {
          title: 'Text (Small)',
          value: 'text-sm'
          // component: ({ children }: any) => {
          //   return <p className="text-sm text-brand-mid-grey">{children}</p>;
          // }
        },
        {
          title: 'Quote',
          value: 'blockquote'
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
          title: 'Video settings',
          name: 'videoSettings',
          type: 'videoSettings',
          validation: (Rule) => Rule.required()
        }),
        defineField({
          title: 'Width',
          name: 'width',
          type: 'blogWidthSettings',
          validation: (Rule) => Rule.required()
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
      preview: {
        select: {
          title: 'title.en'
        },
        prepare(selection) {
          return {
            title: selection.title,
            subtitle: 'Products'
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
          title: 'Products',
          description: 'Add 2-8 products',
          name: 'products',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'product' }]
            }
          ],
          validation: (Rule) => Rule.required().min(2).max(8)
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
            title: selection.title[0]?.children[0]?.text || 'No content',
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
          title: 'Type',
          name: 'type',
          type: 'string',
          options: {
            list: [
              { title: 'Image/Video', value: 'media' },
              { title: 'Product', value: 'product' }
            ]
          },
          initialValue: 'media',
          validation: (Rule) => Rule.required()
        }),
        defineField({
          title: 'Media',
          name: 'media',
          type: 'media',
          validation: (Rule) =>
            Rule.custom((value, context: any) => {
              if (context.parent?.type === 'media' && !value) {
                return 'Media is required';
              }
              return true;
            }),
          hidden: ({ parent }) => parent?.type !== 'media'
        }),
        defineField({
          title: 'Aspect ratio settings',
          name: 'aspectRatioSettings',
          type: 'aspectRatioSettings',
          validation: (Rule) =>
            Rule.custom((value, context: any) => {
              if (context.parent?.type === 'media' && !value) {
                return 'Aspect ratio settings are required';
              }
              return true;
            }),
          hidden: ({ parent }) => parent?.type !== 'media'
        }),
        defineField({
          title: 'Product',
          name: 'product',
          type: 'reference',
          to: [{ type: 'product' }],
          validation: (Rule) =>
            Rule.custom((value, context: any) => {
              if (context.parent?.type === 'product' && !value) {
                return 'Product is required';
              }
              return true;
            }),
          hidden: ({ parent }) => parent?.type !== 'product'
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
          options: {
            layout: 'grid'
          },
          of: [
            {
              type: 'image',
              options: {
                hotspot: true
              },
              fields: [
                defineField({
                  title: 'Descriptive text for screen readers and search engines',
                  type: 'altText',
                  name: 'altText'
                }),
                defineField({
                  title: 'Caption (optional)',
                  name: 'caption',
                  type: 'i18n.string'
                }),
                defineField({
                  title: 'Aspect ratio settings',
                  name: 'aspectRatioSettings',
                  type: 'aspectRatioSettings'
                })
              ]
            }
          ],
          validation: (Rule) => Rule.required().min(2).max(3)
        }),
        defineField({
          title: 'Width',
          name: 'width',
          type: 'blogWidthSettings',
          validation: (Rule) => Rule.required()
        })
      ]
    },
    {
      title: 'Hotspot image',
      name: 'hotspotImage',
      type: 'object',
      preview: {
        select: {
          title: 'image.internalTitle'
        },
        prepare(selection) {
          return {
            title: selection.title,
            subtitle: 'Hotspot image'
          };
        }
      },
      fields: [
        defineField({
          title: 'Image',
          name: 'image',
          type: 'reference',
          to: [{ type: 'hotspotImage' }],
          validation: (Rule) => Rule.required()
        }),
        defineField({
          title: 'Aspect ratio settings',
          name: 'aspectRatioSettings',
          type: 'aspectRatioSettings',
          validation: (Rule) => Rule.required()
        })
      ],
      icon: Crosshair
    }
  ]
});
