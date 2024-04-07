import { defineField, defineType } from 'sanity';

// TODO make image preview work
export const collectionProduct = defineType({
  title: 'Collection product',
  name: 'collectionProduct',
  type: 'object',
  preview: {
    select: {
      title: 'product.title',
      image: 'product.images.0'
    },
    prepare({ title, image }) {
      return {
        title: title || 'No title defined',
        subtitle: 'Product',
        media: image
      };
    }
  },
  fields: [
    defineField({
      title: 'Produkt',
      name: 'product',
      type: 'reference',
      to: [{ type: 'product' }]
      // options: {
      //   filter: filterAlreadyAddedReferences
      // }
    }),
    defineField({
      title: 'Erstatningsbilde',
      name: 'replacementImage',
      type: 'image'
    })
  ]
});
