import { defineType } from 'sanity';

// Define a new object for bundle items

//! Legg til språkstøtte
export const configurationStepImages = defineType({
  title: 'Configuration Step Images',
  name: 'configurationStepImages',
  type: 'object',
  description: 'A list of products available to pick from in this step',
  fields: [
    {
      title: 'Step title',
      name: 'stepTitle',
      type: 'string'
    },
    // new productList field as array
    {
      title: 'Product list',
      name: 'productArray', // new name
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text'
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption'
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'stepTitle'
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title || 'No Internal title' // Provide a fallback title if necessary
      };
    }
  }
});
