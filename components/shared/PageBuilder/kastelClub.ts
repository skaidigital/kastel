import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { Trophy } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const kastelClub = defineType({
  title: 'Kastel Club',
  name: 'kastelClub',
  type: 'document',
  icon: Trophy,
  preview: {
    select: {
      title: 'internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'Kastel Club',
        subtitle: 'Kastel Club'
      };
    }
  },
  fields: [
    defineField({
      title: 'Interal title',
      name: 'internalTitle',
      type: 'internalTitle'
    }),
    defineField({
      title: 'Background image',
      name: 'backgroundImage',
      type: 'figure',
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
      title: 'Button text',
      name: 'buttonText',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Steps',
      name: 'steps',
      type: 'array',
      validation: (Rule) => Rule.min(3).max(3),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              title: 'Title front (before you click on desktop)',
              name: 'titleFront',
              type: 'i18n.string',
              validation: validateAllStringTranslations
            }),
            defineField({
              title: 'Description front (before you click on desktop)',
              name: 'descriptionFront',
              type: 'i18n.string',
              validation: validateAllStringTranslations
            }),
            defineField({
              title: 'Link text front ("Click to read more" in the design)',
              name: 'linkText',
              type: 'i18n.string',
              validation: validateAllStringTranslations
            }),
            defineField({
              title: 'Title back (before you click on desktop)',
              name: 'titleBack',
              type: 'i18n.string',
              validation: validateAllStringTranslations
            }),
            defineField({
              title: 'Description back (before you click on desktop)',
              name: 'descriptionBack',
              type: 'i18n.string',
              validation: validateAllStringTranslations
            })
          ]
        }
      ]
    }),
    defineField({
      title: 'Image/video for the last square/slide',
      name: 'lastSlide',
      type: 'media',
      validation: (Rule) => Rule.required()
    })
  ]
});
