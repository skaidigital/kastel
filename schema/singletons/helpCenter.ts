import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { Question } from '@phosphor-icons/react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const helpCenter = defineType({
  title: 'Help center',
  name: 'helpCenter',
  type: 'document',
  icon: Question,
  preview: {
    select: {
      title: 'internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'No title defined',
        subtitle: 'Help center'
      };
    }
  },
  fields: [
    defineField({
      title: 'Internal title',
      name: 'internalTitle',
      type: 'internalTitle'
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
      description: "The accompanying text next to the brand tagline 'Raised by Weather'",
      options: {
        rows: 3
      },
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'FAQ blocks',
      name: 'faqBlocks',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'faqBlock' }]
        })
      ],
      validation: (Rule) => Rule.min(1)
    })
  ]
});
