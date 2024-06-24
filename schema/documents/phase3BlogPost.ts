import {
  InternationalizedObjectField,
  generateObjectFields
} from '@/components/sanity/InternationalizedObjectField';
import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { Article } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const phase3BlogPost = defineType({
  title: 'Nature Lab phase 3 blog post',
  name: 'phase3BlogPost',
  type: 'document',
  icon: Article,
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'innovationId.no'
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Phase 3 blog post'
      };
    }
  },
  groups: [
    { name: 'settings', title: 'Settings', icon: () => '⚙️', default: true },
    { name: 'editorial', title: 'Editorial', icon: () => '📝' }
  ],
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations,
      group: 'settings'
    }),
    defineField({
      title: 'Innovation ID',
      description: "For example '#23' or 'NL-23'",
      name: 'innovationId',
      type: 'i18n.string',
      validation: validateAllStringTranslations,
      group: 'settings'
    }),
    defineField({
      title: 'Completion date',
      name: 'completionDate',
      type: 'date',
      validation: (Rule) => Rule.required(),
      group: 'settings'
    }),
    defineField({
      title: 'Desktop image',
      name: 'imageDesktop',
      type: 'figure',
      validation: (Rule) => Rule.required(),
      group: 'editorial'
    }),
    defineField({
      title: 'Mobile image',
      name: 'imageMobile',
      type: 'figure',
      validation: (Rule) => Rule.required(),
      group: 'editorial'
    }),
    defineField({
      title: 'Content 🇧🇻',
      name: 'contentNo',
      type: 'richTextNatureLab',
      validation: (Rule) => Rule.required(),
      group: 'editorial'
    }),
    defineField({
      title: 'Content 🇬🇧',
      name: 'contentEn',
      type: 'richTextNatureLab',
      validation: (Rule) => Rule.required(),
      group: 'editorial'
    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'object',
      fields: generateObjectFields({ schemaType: 'richText', type: 'lang' }),
      components: {
        field: InternationalizedObjectField
      },
      group: 'editorial',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'object',
      fields: generateObjectFields({ schemaType: 'slug', type: 'lang' }),
      components: {
        field: InternationalizedObjectField
      },
      group: 'settings',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Metadata',
      name: 'metadata',
      type: 'metadata',
      group: 'settings'
    })
  ]
});
