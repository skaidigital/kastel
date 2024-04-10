import { VideoCamera } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const ugcs = defineType({
  title: 'UGC Section',
  name: 'UGCSection',
  type: 'document',
  icon: VideoCamera,
  preview: {
    select: {
      title: 'internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'UGC section',
        subtitle: 'UGC section'
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
