import { filterAlreadyAddedReferences } from '@/lib/sanity/studioUtils';
import { Columns } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const cardGrid = defineType({
  title: 'Card grid',
  name: 'cardGrid',
  type: 'object',
  icon: Columns,
  fieldsets: [
    { name: 'settingsPadding', title: 'Padding settings', options: { columns: 2 } },
    { name: 'settingsImage', title: 'Image settings', options: { columns: 2 } }
  ],
  preview: {
    select: {
      title: 'title.no'
    },
    prepare({ title }) {
      return {
        title: title || 'No title defined',
        subtitle: 'Card grid',
        icon: Columns
      };
    }
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string'
    }),
    defineField({
      title: 'Cards',
      name: 'cards',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'card' }],
          options: {
            filter: filterAlreadyAddedReferences
          }
        }
      ],
      validation: (Rule) => Rule.min(2).max(3)
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
      fieldset: 'settingsImage',
      validation: (Rule) => Rule.required()
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
      fieldset: 'settingsImage',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Padding',
      name: 'padding',
      type: 'padding'
    }),
    defineField({
      title: 'Top padding',
      name: 'hasTopPadding',
      type: 'hasTopPadding',
      fieldset: 'settingsPadding'
    }),
    defineField({
      title: 'Bottom padding',
      name: 'hasBottomPadding',
      type: 'hasBottomPadding',
      fieldset: 'settingsPadding'
    }),
    defineField({
      title: 'Bottom border',
      name: 'hasBottomBorder',
      type: 'hasBottomBorder'
    })
  ]
});
