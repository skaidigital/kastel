import {
  filterAlreadyAddedReferences,
  validateAllStringTranslations
} from '@/lib/sanity/studioUtils';
import { Slideshow } from '@phosphor-icons/react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const productLsting = defineType({
  title: 'Product listing',
  name: 'productListing',
  type: 'object',
  icon: Slideshow,
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
      title: 'title.no',
      products: 'products'
    },
    prepare({ title, products }) {
      const productCount = products?.length || 0;
      return {
        title: title || 'Untitled',
        subtitle: `${productCount} product${productCount === 1 ? '' : 's'}`
      };
    }
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Products',
      name: 'products',
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'product' }],
          options: {
            filter: filterAlreadyAddedReferences
          }
        })
      ]
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
