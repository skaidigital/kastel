import { VideoCamera } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const ugcSection = defineType({
  title: 'UGC Section',
  name: 'ugcSection',
  type: 'object',
  icon: VideoCamera,
  preview: {
    select: {
      title: 'ugcBlock.internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Shoe Picker section'
      };
    }
  },
  fields: [
    defineField({
      title: 'UGC block',
      name: 'ugcBlock',
      type: 'reference',
      to: [{ type: 'ugcBlock' }],
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
