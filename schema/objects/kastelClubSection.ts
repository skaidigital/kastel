import { Trophy } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const kastelClubSection = defineType({
  title: 'Kastel Club section',
  name: 'kastelClubSection',
  type: 'object',
  icon: Trophy,
  preview: {
    select: {
      title: 'kastelClubBlock.internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Kastel Club section'
      };
    }
  },
  fields: [
    defineField({
      title: 'Kastel Club block',
      name: 'kastelClubBlock',
      type: 'reference',
      to: [{ type: 'kastelClubBlock' }],
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
