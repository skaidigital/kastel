import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

export const natureLabExplainer = defineType({
  title: 'Nature Lab explainer',
  name: 'natureLabExplainer',
  type: 'document',
  fields: [
    defineField({
      title: 'Internal title',
      name: 'internalTitle',
      type: 'internalTitle'
    }),
    defineField({
      title: 'Title',
      description: "I.e. 'Nature Lab'",
      name: 'title',
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
          fields: [
            defineField({
              title: 'Step title',
              name: 'title',
              type: 'i18n.string',
              validation: validateAllStringTranslations
            }),
            defineField({
              title: 'Content 🇧🇻',
              name: 'contentNo',
              type: 'richText',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              title: 'Content 🇬🇧',
              name: 'contentEn',
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
