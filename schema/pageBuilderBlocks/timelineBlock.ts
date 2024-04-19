import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { Calendar } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const timelineBlock = defineType({
  title: 'Timeline block',
  name: 'timelineBlock',
  type: 'document',
  icon: Calendar,
  preview: {
    select: {
      title: 'title.en'
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Timeline section'
      };
    }
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Description (optional)',
      name: 'description',
      type: 'i18n.text',
      options: {
        rows: 3
      }
    }),
    defineField({
      title: 'Badge (optional)',
      name: 'badge',
      type: 'reference',
      to: [{ type: 'badge' }]
    }),
    defineField({
      title: 'Timeline',
      description: 'Add 1-4 items to the timeline',
      name: 'timeline',
      type: 'array',
      of: [{ type: 'timelineItem' }],
      validation: (Rule) => Rule.min(1).max(4)
    })
  ]
});
