import { defineField, defineType } from 'sanity';

export const collectionProduct = defineType({
  title: 'Collection product',
  name: 'collectionProduct',
  type: 'object',
  preview: {
    select: {
      title: 'product.internalTitle',
      image: 'product.mainImage',
      lifeStyleImage: 'product.lifestyleImage',
      firstImage: 'firstImage'
    },
    prepare({ title, image, firstImage, lifeStyleImage }) {
      const subtitle = firstImage === 'lifestyle' ? 'Lifestyle image' : 'Product image';
      const media = firstImage === 'lifestyle' ? lifeStyleImage : image;
      return {
        title: title || 'No title defined',
        subtitle,
        media
      };
    }
  },
  fields: [
    defineField({
      title: 'Produkt',
      name: 'product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Show image first',
      description:
        'You can choose to show a lifestyle image first and the product image on hover. This will only apply if you have both a lifestyle and a product image set on the product',
      name: 'firstImage',
      type: 'string',
      options: {
        list: [
          { title: 'Product', value: 'product' },
          { title: 'Lifestyle', value: 'lifestyle' }
        ]
      },
      initialValue: 'product',
      validation: (Rule) => Rule.required()
    })
  ]
});
