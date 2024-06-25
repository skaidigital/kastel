import { defineField, defineType } from 'sanity'

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
      }
    }
  },
  fields: [
    defineField({
      title: 'Temp',
      name: 'temp',
      type: 'string'
    })

    // defineField({
    //   title: 'Card',
    //   name: 'card',
    //   type: 'reference',
    //   to: [{ type: 'card' }],
    //   validation: (Rule) => Rule.required()
    // }),
  ]
})
