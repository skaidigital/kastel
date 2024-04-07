import { filterAlreadyAddedReferences } from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

// Define a new object for bundle items

//! Legg til språkstøtte
export const configurationStep = defineType({
  title: 'Configuration Step',
  name: 'configurationStep',
  type: 'object',
  description: 'A list of products available to pick from in this step',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string'
    }),
    {
      title: 'Slug (NO)',
      name: 'slug_no',
      type: 'slug',
      hidden: true
    },
    {
      title: 'Slug (EU)',
      name: 'slug_eu',
      type: 'slug',
      hidden: true
    },
    {
      title: 'Slug (DK)',
      name: 'slug_dk',
      type: 'slug',
      hidden: true
    },
    {
      title: 'Slug (SV)',
      name: 'slug_sv',
      type: 'slug',
      hidden: true
    },
    // new productList field as array
    {
      title: 'Product list',
      name: 'productArray', // new name
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }],
          options: {
            filter: filterAlreadyAddedReferences
          }
        }
      ],
      options: {
        filter: '_type == "product"'
        // filterParams: { availability: true }
      }
    }
  ],
  preview: {
    select: {
      title: 'title.no'
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title || 'No Internal title' // Provide a fallback title if necessary
      };
    }
  }
});
