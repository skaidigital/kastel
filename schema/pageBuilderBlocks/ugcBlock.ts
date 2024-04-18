import { VideoCamera } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const ugcBlock = defineType({
  title: 'UGC Block',
  name: 'ugcBlock',
  type: 'document',
  icon: VideoCamera,
  preview: {
    select: {
      title: 'internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'UGC block',
        subtitle: 'UGC block'
      };
    }
  },
  fields: [
    defineField({
      title: 'Internal title',
      name: 'internalTitle',
      type: 'internalTitle'
    }),
    defineField({
      title: 'Videos',
      description: 'Add 3 UGC videos',
      name: 'videos',
      type: 'array',
      of: [{ type: 'mux.video' }],
      validation: (Rule) => Rule.required().min(3).max(3)
    })
  ]
});
