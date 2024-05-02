import { Subtitles } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const fullBleedMediaSection = defineType({
  title: 'Full bleed media section',
  name: 'fullBleedMediaSection',
  type: 'object',
  icon: Subtitles,
  preview: {
    select: {
      title: 'fullBleedMediaBlock.internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'No title defined',
        subtitle: 'Full Bleed Media section'
      };
    }
  },
  fields: [
    defineField({
      title: 'Media',
      type: 'reference',
      name: 'fullBleedMediaBlock',
      to: [{ type: 'fullBleedMediaBlock' }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Disable / Hide this block in a market',
      name: 'marketAvailability',
      type: 'marketAvailability'
    })
  ]
});
