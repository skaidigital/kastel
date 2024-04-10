import { QuestionMark } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const defaultProductFAQS = defineType({
  title: 'Default Product FAQs',
  name: 'defaultProductFAQS',
  type: 'document',
  icon: QuestionMark,
  preview: {
    prepare() {
      return {
        title: 'Default Product FAQs',
        subtitle: 'Default Product FAQs'
      };
    }
  },
  fields: [
    defineField({
      title: 'FAQs',
      name: 'faqs',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'question' }] }],
      validation: (Rule) => Rule.min(1).max(20)
    })
  ]
});
