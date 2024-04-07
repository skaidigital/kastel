import { List } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const accordionSection = defineType({
  title: 'Accordion section',
  name: 'accordionSection',
  type: 'object',
  icon: List,
  fieldsets: [{ name: 'paddingSettings', title: 'Padding settings', options: { columns: 2 } }],
  preview: {
    select: {
      title: 'accordionBlock.internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'No title defined',
        subtitle: 'Accordion section',
        icon: List
      };
    }
  },
  fields: [
    defineField({
      title: 'Accordion',
      type: 'reference',
      name: 'accordionBlock',
      to: [{ type: 'accordionBlock' }],
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
      fieldset: 'paddingSettings'
    }),
    defineField({
      title: 'Bottom padding',
      name: 'hasBottomPadding',
      type: 'hasBottomPadding',
      fieldset: 'paddingSettings'
    }),
    defineField({
      title: 'Bottom border',
      name: 'hasBottomBorder',
      type: 'hasBottomBorder'
    })
  ]
});
