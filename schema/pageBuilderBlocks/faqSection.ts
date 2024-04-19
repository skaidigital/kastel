import { List } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const faqSection = defineType({
  title: 'FAQ section',
  name: 'faqSection',
  type: 'object',
  icon: List,
  fieldsets: [{ name: 'paddingSettings', title: 'Padding settings', options: { columns: 2 } }],
  preview: {
    select: {
      title: 'accordionBlock.internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'No title defined',
        subtitle: 'Accordion section',
        icon: List
      };
    }
  },
  fields: [
    defineField({
      title: 'FAQs',
      type: 'reference',
      name: 'faqs',
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
