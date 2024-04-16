import { defineField, defineType } from 'sanity';

export const shoePickerSection = defineType({
  title: 'Shoe Picker section',
  name: 'shoePickerSection',
  type: 'object',
  fields: [
    defineField({
      title: 'Shoe picker block',
      name: 'shoePickerBlock',
      type: 'reference',
      to: [{ type: 'shoePickerBlock' }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Section settings',
      name: 'sectionSettings',
      type: 'sectionSettings',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Disable / Hide this block in a market',
      name: 'marketAvailability',
      type: 'marketAvailability'
    })
  ]
});
