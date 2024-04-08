import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { List } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const question = defineType({
  title: 'Question',
  name: 'question',
  type: 'document',
  icon: List,
  preview: {
    select: {
      title: 'question.no'
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled'
      };
    }
  },
  fields: [
    defineField({
      title: 'Question',
      name: 'question',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Answer 🇧🇻',
      name: 'answerNo',
      type: 'richText',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Answer 🇬🇧',
      name: 'answerEn',
      type: 'richText',
      validation: (Rule) => Rule.required()
    })
  ]
});
