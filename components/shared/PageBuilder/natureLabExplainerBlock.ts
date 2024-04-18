import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { Recycle } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const natureLabExplainerBlock = defineType({
  title: 'Nature Lab Explainer block',
  name: 'natureLabExplainerBlock',
  type: 'document',
  icon: Recycle,
  preview: {
    select: {
      title: 'internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Nature Lab Explainer block'
      };
    }
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
      description: "I.e. 'Nature Lab'",
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Title title',
      name: 'titleTitle',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Content title',
      description: "I.e. 'Content' or 'Innhold'",
      name: 'titleContent',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Steps',
      name: 'steps',
      type: 'array',
      of: [
        {
          type: 'object',
          icon: Recycle,
          preview: {
            select: {
              title: 'title.en'
            },
            prepare({ title }) {
              return {
                title: title || 'Untitled'
              };
            }
          },
          fields: [
            defineField({
              title: 'Step title',
              name: 'title',
              type: 'i18n.string',
              validation: validateAllStringTranslations
            }),
            defineField({
              title: 'Content 🇧🇻',
              name: 'content_no',
              type: 'richText',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              title: 'Content 🇬🇧',
              name: 'content_en',
              type: 'richText',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              title: 'Image',
              description: 'Image to the right on desktop and below the text on mobile',
              name: 'image',
              type: 'figure',
              validation: (Rule) => Rule.required()
            })
          ]
        }
      ]
    })
  ]
});
