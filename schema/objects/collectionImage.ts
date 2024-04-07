import { defineField, defineType } from 'sanity';

export const collectionImage = defineType({
  title: 'Kolleksjonsbilde',
  name: 'collectionImage',
  type: 'object',
  preview: {
    select: {
      title: 'title',
      image: 'card.image'
    },
    prepare({ title, image }) {
      return {
        title: title || 'No title defined',
        subtitle: 'Image',
        media: image
      };
    }
  },
  fields: [
    defineField({
      title: 'Card',
      name: 'card',
      type: 'reference',
      to: [{ type: 'card' }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Size',
      name: 'size',
      type: 'string',
      initialValue: 'small',
      options: {
        list: ['small', 'large']
      },
      validation: (Rule) => Rule.required()
    })
  ]
});
