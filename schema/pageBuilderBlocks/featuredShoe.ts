import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { Star } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const featuredShoe = defineType({
  title: '(WIP) Featured shoe',
  name: 'featuredShoe',
  type: 'document',
  icon: Star,
  preview: {
    select: {
      title: 'title.en'
    },
    prepare: ({ title }) => ({
      title: title || 'Untitled',
      subtitle: 'Featured shoe'
    })
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
        rows: 2
      }
    }),
    defineField({
      title: 'Shoe',
      name: 'shoe',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Content',
      description: 'Images / Video / Hotspot images',
      name: 'content',
      type: 'array',
      of: [{ type: 'hotspotImage' }]
    })
  ]
});
