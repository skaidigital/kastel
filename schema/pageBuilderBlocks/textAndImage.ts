import { MARKETS } from '@/data/constants';
import { i18nField } from '@/lib/sanity/studioUtils';
import { FileImage } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

// TODO either add title or extract from portable text a preview
export const textAndImage = defineType({
  title: 'Text and image',
  name: 'textAndImage',
  type: 'document',
  icon: FileImage,
  preview: {
    select: {
      title: 'internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'No title defined',
        subtitle: 'Text + Image',
        icon: FileImage
      };
    }
  },
  fieldsets: [
    {
      name: 'contentSettings',
      title: 'Content settings',
      options: {
        columns: 3
      }
    },
    {
      name: 'paddingSettings',
      title: 'Padding settings',
      options: {
        columns: 2
      }
    }
  ],
  groups: [
    {
      icon: () => '⚙️',
      name: 'settings',
      title: 'Settings',
      default: true
    },
    ...MARKETS.map((market) => ({
      name: market.id,
      title: market.name,
      icon: () => market.flag
    }))
  ],
  fields: [
    defineField({
      title: 'Internal title',
      name: 'internalTitle',
      type: 'internalTitle',
      group: 'settings',
      validation: (Rule) => Rule.required()
    }),
    ...i18nField({
      title: 'Content',
      name: 'richText',
      type: 'richText',
      validation: (Rule: any) => Rule.required()
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'figure',
      group: 'settings',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Size',
      name: 'size',
      type: 'string',
      initialValue: 'fullWidth',
      group: 'settings',
      options: {
        list: [
          { title: 'Full width', value: 'fullWidth' },
          { title: 'Contained', value: 'contained' }
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Image placement',
      name: 'imageLeftOrRight',
      type: 'string',
      initialValue: 'left',
      fieldset: 'contentSettings',
      group: 'settings',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' }
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Text placement',
      name: 'textPlacement',
      type: 'string',
      initialValue: 'center',
      fieldset: 'contentSettings',
      group: 'settings',
      options: {
        list: [
          { title: 'Top', value: 'top' },
          { title: 'Center', value: 'center' },
          { title: 'Bottom', value: 'bottom' }
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Padding',
      name: 'padding',
      type: 'string',
      initialValue: 'lg',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Small', value: 'sm' },
          { title: 'Medium', value: 'md' },
          { title: 'Large', value: 'lg' }
        ]
      },
      fieldset: 'contentSettings',
      group: 'settings'
    }),
    defineField({
      title: 'Top padding',
      name: 'hasTopPadding',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required(),
      fieldset: 'paddingSettings',
      group: 'settings'
    }),
    defineField({
      title: 'Bottom padding',
      name: 'hasBottomPadding',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required(),
      fieldset: 'paddingSettings',
      group: 'settings'
    }),
    defineField({
      title: 'Bottom border',
      name: 'hasBottomBorder',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
      hidden: ({ parent }: any) => parent.size !== 'fullWidth'
    })
  ]
});
