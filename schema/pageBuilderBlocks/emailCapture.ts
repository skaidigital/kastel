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
      title: 'Klaviyo List ID',
      name: 'klaviyoListId',
      description: "I.e. 'SB4wxx'",
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Image / Video',
      name: 'media',
      type: 'media',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Badge (optional)',
      name: 'badge',
      type: 'reference',
      to: [{ type: 'badge' }]
    }),
    defineField({
      title: 'Description 🇧🇻',
      name: 'description_no',
      type: 'richText',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Description 🇬🇧',
      name: 'description_en',
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
