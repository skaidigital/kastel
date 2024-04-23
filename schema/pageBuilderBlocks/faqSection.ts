import { List } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const faqSection = defineType({
  title: 'FAQ section',
  name: 'faqSection',
  type: 'object',
  icon: List,
  preview: {
    select: {
      title: 'faqBlock.internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'No title defined',
        subtitle: 'FAQ section',
        icon: List
      };
    }
  },
  fields: [
    defineField({
      title: 'FAQs',
      type: 'reference',
      name: 'faqBlock',
      to: [{ type: 'faqBlock' }],
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
