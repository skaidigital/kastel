import { filterAlreadyAddedReferences } from '@/lib/sanity/studioUtils';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const merchandising = defineType({
  title: 'Merchandising',
  name: 'merchandising',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'Merchandising'
      };
    }
  },
  fields: [
    defineField({
      title: 'Reccommended products',
      name: 'reccommendedProducts',
      description: 'Products that will be shown in a carousel on the product pages',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'product' }],
          options: {
            filter: filterAlreadyAddedReferences
          }
        })
      ],
      validation: (Rule) => Rule.min(4).max(12)
    }),
    defineField({
      title: 'Cross sell product in cart',
      name: 'cartCrossSell',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required(),
      description: 'Product that will be shown in the cart as a cross sell'
    }),
    defineField({
      title: 'Free shipping limit',
      description: "Leave empty if you don't want to show the free shipping countdown",
      name: 'freeShippingAmount',
      type: 'i18n.number'
    })
  ]
});
