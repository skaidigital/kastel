import { defineField, defineType } from 'sanity';

export const productDescription = defineType({
  title: 'Detailed description',
  name: 'descriptionDetailed',
  type: 'object',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'text',
      rows: 3
      //   options: { rows: 3 },
      //   validation: (Rule) => Rule.required()
      //   validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'text',
      rows: 3
      //   options: { rows: 3 },
      //   validation: validateAllStringTranslations
      //   validation: (Rule) => Rule.required()
    })
  ]
});
