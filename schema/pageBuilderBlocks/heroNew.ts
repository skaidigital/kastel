import { defineField, defineType } from 'sanity';

const textPlacements = [
  { title: 'Top left', value: 'top-left' },
  { title: 'Top center', value: 'top-center' },
  { title: 'Top right', value: 'top-right' },
  { title: 'Center left', value: 'center-left' },
  { title: 'Center', value: 'center' },
  { title: 'Center right', value: 'center-right' },
  { title: 'Bottom left', value: 'bottom-left' },
  { title: 'Bottom center', value: 'bottom-center' },
  { title: 'Bottom right', value: 'bottom-right' },
  { title: 'Split top', value: 'split-top' },
  { title: 'Split center', value: 'split-center' },
  { title: 'Split bottom', value: 'split-bottom' }
];

export const heroNew = defineType({
  title: 'Hero New',
  name: 'heroNew',
  type: 'object',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: (Rule) => Rule.required()
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
      title: 'Link',
      name: 'link',
      type: 'conditionalLink'
    }),
    defineField({
      title: 'Button settings',
      name: 'buttonSettings',
      type: 'buttonSettings',
      hidden: ({ parent }) => !parent.link?.hasLink,
      validation: (Rule) =>
        Rule.custom((field: any, context: any) => {
          const haslink = context.parent.link?.hasLink;

          if (haslink && !field) {
            return 'You must select a button variant';
          }

          if (field && !field?.variant) {
            return 'You must select a button variant';
          }
          return true;
        })
    }),
    defineField({
      title: 'Image / Video',
      name: 'media',
      type: 'media',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Aspect ratio settings',
      name: 'aspectRatioSettings',
      type: 'aspectRatioSettings',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Mobile text placement',
      name: 'textPositionMobile',
      type: 'string',
      initialValue: 'center',
      options: {
        list: textPlacements
      }
    }),
    defineField({
      title: 'Desktop text placement',
      name: 'textPositionDesktop',
      type: 'string',
      initialValue: 'center',
      options: {
        list: textPlacements
      }
    })
  ]
});
