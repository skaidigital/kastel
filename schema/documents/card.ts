import { hiddenBasedOnLink, validateLinkType } from '@/schema/pageBuilderBlocks/hero';
import { Square } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const card = defineType({
  title: 'Card',
  name: 'card',
  type: 'document',
  icon: Square,
  preview: {
    select: {
      title: 'internalTitle',
      type: 'type',
      image: 'image',
      video: 'video.playbackId'
    },
    prepare({ title, type, image, video }) {
      return {
        title: title || 'No title defined',
        subtitle: 'Card',
        media: type === 'image' ? image : video
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
      title: 'Internal title',
      name: 'internalTitle',
      type: 'internalTitle'
    }),
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: ['image', 'video']
      },
      initialValue: 'image',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Background image',
      name: 'image',
      type: 'figure',
      options: {
        hotspot: true
      },
      hidden: ({ parent }) => parent?.type !== 'image',
      validation: (Rule) =>
        Rule.custom((image, context: any) => {
          const type = context.parent?.type;

          if (type === 'image' && !image) {
            return 'Image is required';
          }

          return true;
        })
    }),
    defineField({
      title: 'Background video',
      name: 'video',
      type: 'mux.video',
      hidden: ({ parent }) => parent?.type !== 'video',
      validation: (Rule) =>
        Rule.custom((video, context: any) => {
          const type = context.parent?.type;

          if (type === 'video' && !video) {
            return 'Video is required';
          }

          return true;
        })
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
