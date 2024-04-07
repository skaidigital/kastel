import { TextIcon } from '@radix-ui/react-icons';
import { defineField, defineType } from 'sanity';

export const textSection = defineType({
  title: 'Text section',
  name: 'textSection',
  type: 'object',
  icon: TextIcon,
  fieldsets: [
    {
      title: 'Padding settings',
      name: 'paddingSettings',
      options: {
        columns: 2
      }
    }
  ],
  preview: {
    select: {
      title: 'textBlock.internalTitle'
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: 'Text section',
        icon: TextIcon
      };
    }
  },
  fields: [
    defineField({
      title: 'Content',
      name: 'textBlock',
      type: 'reference',
      to: [{ type: 'textBlock' }]
    }),
    defineField({
      title: 'Padding',
      name: 'padding',
      type: 'padding'
    }),
    defineField({
      title: 'Top padding',
      name: 'hasTopPadding',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required(),
      fieldset: 'paddingSettings'
    }),
    defineField({
      title: 'Bottom padding',
      name: 'hasBottomPadding',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required(),
      fieldset: 'paddingSettings'
    }),
    defineField({
      title: 'Bottom border',
      name: 'hasBottomBorder',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required()
    })
  ]
});
