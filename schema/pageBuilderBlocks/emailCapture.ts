import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { Mailbox } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const emailCapture = defineType({
  title: 'Email capture',
  name: 'emailCapture',
  type: 'object',
  icon: Mailbox,
  preview: {
    prepare() {
      return {
        title: 'Email capture',
        subtitle: 'Email capture'
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
      title: 'Image / Video',
      name: 'media',
      type: 'media',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Description 🇧🇻',
      name: 'descriptionNo',
      type: 'richText',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Description 🇬🇧',
      name: 'descriptionEn',
      type: 'richText',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Button text',
      name: 'buttonText',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    })
  ]
});
