import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { Star } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const featuredShoeBlock = defineType({
  title: 'Featured Shoe block',
  name: 'featuredShoeBlock',
  type: 'document',
  icon: Star,
  preview: {
    select: {
      title: 'internalTitle'
    },
    prepare: ({ title }) => ({
      title: title || 'Untitled',
      subtitle: 'Featured Shoe block'
    })
  },
  fields: [
    defineField({
      title: 'Internal title',
      name: 'internalTitle',
      type: 'internalTitle',
      validation: (Rule) => Rule.required()
    }),
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
      title: 'Badge (optional)',
      name: 'badge',
      type: 'reference',
      to: [{ type: 'badge' }]
    }),
    defineField({
      title: 'Shoe',
      name: 'shoe',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Links to',
      name: 'link',
      type: 'link',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Content',
      description: 'Add 2-5 images/video/hotspot images',
      name: 'content',
      type: 'array',
      of: [
        { type: 'reference', title: 'Hotspot image', to: [{ type: 'hotspotImage' }] },
        { type: 'media', title: 'Image / Video' }
      ],
      validation: (Rule) => Rule.min(2).max(5)
    })
  ]
});
