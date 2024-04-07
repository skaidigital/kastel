import { filterAlreadyAddedReferences } from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

// Define a new object for bundle items
export const bundleItem = defineType({
  title: 'Bundle Item',
  name: 'bundleItem',
  type: 'object',
  description: 'A product and the number of items in a bundle',
  fields: [
    {
      title: 'Internal title',
      name: 'internalTitle',
      type: 'string',
      description: 'An internal title for the bundle group, not visible to the user'
    },
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: (Rule) => Rule.required()
    }),
    {
      title: 'Bundle items',
      name: 'bundleItems',
      type: 'array',
      of: [
        {
          title: 'Bundle item',
          name: 'bundleItem',
          type: 'reference',
          to: [{ type: 'product' }],
          options: {
            filter: filterAlreadyAddedReferences
          }
        }
      ]
    },
    {
      title: 'Number of items',
      name: 'numberOfItems',
      type: 'number'
    }
  ],
  preview: {
    select: {
      title: 'internalTitle', // Assumes your product has a title field
      numberOfItems: 'numberOfItems'
    },
    prepare(selection) {
      const { title, numberOfItems } = selection;
      return {
        title: title || 'No Internal title', // Provide a fallback title if necessary
        subtitle: `${numberOfItems} item${numberOfItems > 1 ? 's' : ''}` // Handle singular/plural
      };
    }
  }
});
