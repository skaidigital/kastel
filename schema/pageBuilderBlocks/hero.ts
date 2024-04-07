import { Image } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const hiddenBasedOnLink = ({ parent }: { parent: any }) => !parent?.hasLink;

export const validateLinkType = (Rule: any) =>
  Rule.custom((field: any, context: any) => {
    const hasLink = context.parent?.hasLink;

    if (hasLink && !field) {
      return 'This field is required';
    }

    return true;
  });

export const hero = defineType({
  title: 'Hero',
  name: 'hero',
  type: 'object',
  icon: Image,
  preview: {
    select: {
      title: 'title.no'
    },
    prepare({ title }) {
      return {
        title: title || 'No title defined',
        subtitle: 'Hero',
        icon: Image
      };
    }
  },
  fieldsets: [
    {
      name: 'settings',
      title: 'Settings',
      options: { columns: 2 }
    }
  ],
  fields: [
    defineField({
      title: 'Type',
      name: 'imageOrVideo',
      type: 'string',
      initialValue: 'image',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' }
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Desktop aspect ratio',
      name: 'aspectRatioDesktop',
      type: 'string',
      initialValue: '16:9',
      options: {
        list: [
          { title: '16:9', value: '16:9' },
          { title: '4:3', value: '4:3' },
          { title: '21:9', value: '21:9' }
        ]
      },
      fieldset: 'settings'
    }),
    defineField({
      title: 'Mobile aspect ratio',
      name: 'aspectRatioMobile',
      type: 'string',
      initialValue: '9:16',
      options: {
        list: [
          { title: '9:16', value: '9:16' },
          { title: '3:4', value: '3:4' }
        ]
      },
      fieldset: 'settings'
    }),
    defineField({
      title: 'Video mobile',
      name: 'videoMobile',
      type: 'mux.video',
      hidden: ({ parent }) => parent?.imageOrVideo !== 'video',
      validation: (Rule) =>
        Rule.custom((video, context: any) => {
          const imageOrVideo = context.parent?.imageOrVideo;

          if (imageOrVideo === 'video' && !video) {
            return 'Video is required';
          }

          return true;
        })
    }),
    defineField({
      title: 'Video desktop',
      name: 'videoDesktop',
      type: 'mux.video',
      hidden: ({ parent }) => parent?.imageOrVideo !== 'video',
      validation: (Rule) =>
        Rule.custom((video, context: any) => {
          const imageOrVideo = context.parent?.imageOrVideo;

          if (imageOrVideo === 'video' && !video) {
            return 'Video is required';
          }

          return true;
        })
    }),
    defineField({
      title: 'Background image – Mobile',
      name: 'imageMobile',
      type: 'image',
      hidden: ({ parent }) => parent?.imageOrVideo !== 'image',
      validation: (Rule) =>
        Rule.custom((image, context: any) => {
          const imageOrVideo = context.parent?.imageOrVideo;

          if (imageOrVideo === 'image' && !image) {
            return 'Image is required';
          }

          return true;
        }),
      options: {
        hotspot: true
      },
      fieldsets: [
        {
          name: 'settings',
          title: 'Settings',
          options: { collapsible: true, collapsed: true, columns: 2 }
        }
      ],
      fields: [
        defineField({
          title: 'Descriptive text for screen readers and search engines',
          type: 'altText',
          name: 'altText'
        })
      ]
    }),
    defineField({
      title: 'Background image – Desktop',
      name: 'imageDesktop',
      type: 'image',
      hidden: ({ parent }) => parent?.imageOrVideo !== 'image',
      validation: (Rule) =>
        Rule.custom((image, context: any) => {
          const imageOrVideo = context.parent?.imageOrVideo;

          if (imageOrVideo === 'image' && !image) {
            return 'Image is required';
          }

          return true;
        }),
      options: {
        hotspot: true
      },
      fieldsets: [
        {
          name: 'settings',
          title: 'Settings',
          options: { collapsible: true, collapsed: true, columns: 2 }
        }
      ],
      fields: [
        defineField({
          title: 'Descriptive text for screen readers and search engines',
          type: 'altText',
          name: 'altText'
        })
      ]
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string'
    }),
    defineField({
      title: 'Subtitle',
      name: 'subtitle',
      type: 'i18n.string'
    }),
    defineField({
      title: 'Mobile text placement',
      name: 'textPositionMobile',
      type: 'string',
      initialValue: 'center',
      options: {
        list: [
          { title: 'Top left', value: 'top-left' },
          { title: 'Top center', value: 'top-center' },
          { title: 'Top right', value: 'top-right' },
          { title: 'Center left', value: 'center-left' },
          { title: 'Center', value: 'center' },
          { title: 'Center right', value: 'center-right' },
          { title: 'Bottom left', value: 'bottom-left' },
          { title: 'Bottom center', value: 'bottom-center' },
          { title: 'Bottom right', value: 'bottom-right' }
        ]
      },
      fieldset: 'settings'
    }),
    defineField({
      title: 'Desktop text placement',
      name: 'textPositionDesktop',
      type: 'string',
      initialValue: 'center',
      options: {
        list: [
          { title: 'Top left', value: 'top-left' },
          { title: 'Top center', value: 'top-center' },
          { title: 'Top right', value: 'top-right' },
          { title: 'Center left', value: 'center-left' },
          { title: 'Center', value: 'center' },
          { title: 'Center right', value: 'center-right' },
          { title: 'Bottom left', value: 'bottom-left' },
          { title: 'Bottom center', value: 'bottom-center' },
          { title: 'Bottom right', value: 'bottom-right' }
        ]
      },
      fieldset: 'settings'
    }),
    defineField({
      title: 'Link',
      name: 'link',
      type: 'object',
      fields: [
        defineField({
          title: 'Link to something?',
          name: 'hasLink',
          type: 'boolean',
          initialValue: true,
          validation: (Rule) => Rule.required()
        }),
        defineField({
          title: 'Type',
          name: 'type',
          type: 'string',
          initialValue: 'internal',
          options: {
            list: [
              { title: 'To a page made in Sanity', value: 'internal' },
              { title: 'To an external page', value: 'external' }
            ]
          },
          hidden: hiddenBasedOnLink,
          validation: validateLinkType
        }),
        defineField({
          title: 'Link text',
          name: 'text',
          type: 'i18n.string',
          hidden: ({ parent }) => {
            if (parent?.hasLink === false) {
              return true;
            }
            return false;
          }
        }),
        defineField({
          title: 'Links to',
          name: 'linkTo',
          type: 'reference',
          to: [{ type: 'page' }, { type: 'product' }, { type: 'collection' }],
          hidden: ({ parent }) => parent?.type !== 'internal' || !parent?.hasLink,
          validation: (Rule) =>
            Rule.custom((linkTo, context: any) => {
              const hasLink = context.parent?.hasLink;
              const linkType = context.parent?.type;

              if (hasLink && linkType === 'internal' && !linkTo) {
                return 'Internal link requires a link to a page';
              }
              return true;
            })
        }),
        defineField({
          title: 'URL',
          name: 'href',
          type: 'url',
          description: 'Example: "https://www.google.com"',
          hidden: ({ parent }) => parent?.type !== 'external' || !parent?.hasLink,
          validation: (Rule) =>
            Rule.custom((href, context: any) => {
              const hasLink = context.parent?.hasLink;
              const linkType = context.parent?.type;

              if (hasLink && linkType === 'external' && !href) {
                return 'External link requires a link to a page';
              }
              return true;
            })
        }),
        defineField({
          title: 'Open in new tab?',
          name: 'openInNewTab',
          type: 'boolean',
          initialValue: false,
          hidden: ({ parent }) => parent?.type !== 'external' || !parent?.hasLink,
          validation: (Rule) =>
            Rule.custom((openInNewTab, context: any) => {
              const hasLink = context.parent?.hasLink;
              const linkType = context.parent?.type;

              if (hasLink && linkType === 'external' && openInNewTab === undefined) {
                return 'You have to choose if the link should open in a new tab or not';
              }
              return true;
            })
        })
      ]
    })
  ]
});
