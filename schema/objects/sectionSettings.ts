import { defineField, defineType } from 'sanity';

export const sectionSettings = defineType({
  title: 'Section settings',
  name: 'sectionSettings',
  type: 'object',
  fieldsets: [{ name: 'paddingSettings', title: 'Padding settings', options: { columns: 2 } }],
  fields: [
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
