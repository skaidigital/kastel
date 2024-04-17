import { Sneaker } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const shopOurModelsSection = defineType({
  title: 'Shop Our Models section',
  name: 'shopOurModelsSection',
  type: 'object',
  icon: Sneaker,
  preview: {
    select: {
      title: 'shopOurModelsBlock.internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Shop Our Models section'
      };
    }
  },
  fields: [
    defineField({
      title: 'Shop Our Models block',
      name: 'shopOurModelsBlock',
      type: 'reference',
      to: [{ type: 'shopOurModelsBlock' }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Section settings',
      name: 'sectionSettings',
      type: 'sectionSettings',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Disable / Hide this block in a market',
      name: 'marketAvailability',
      type: 'marketAvailability'
    })
  ]
});
