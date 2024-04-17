import { defineField, defineType } from 'sanity';

export const buttonSettings = defineType({
  title: 'Button settings',
  name: 'buttonSettings',
  type: 'object',
  fields: [
    defineField({
      title: 'Variant',
      name: 'variant',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Outline', value: 'outline' }
        ]
      },
      initialValue: 'primary',
      validation: (Rule) => Rule.required()
    })
  ]
});
