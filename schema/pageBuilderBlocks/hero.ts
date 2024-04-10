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
      name: 'type',
      type: 'string',
      initialValue: 'fullBleed',
      options: {
        list: [
          { title: 'Full bleed', value: 'fullBleed' },
          { title: 'Contained', value: 'contained' }
        ]
      },
      validation: (Rule) => Rule.required()
    }),

    defineField({
      title: 'Aspect ratio settings',
      name: 'aspectRatioSettings',
      type: 'aspectRatioSettings'
    }),
    defineField({
      title: 'Media',
      name: 'media',
      type: 'media'
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
