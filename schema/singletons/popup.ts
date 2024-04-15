import { validateAllStringsIfTypeIs } from '@/lib/sanity/studioUtils';
import { MegaphoneSimple } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const popup = defineType({
  title: 'Popup',
  name: 'popup',
  type: 'document',
  icon: MegaphoneSimple,
  preview: {
    prepare() {
      return {
        title: 'Popup'
      };
    }
  },
  groups: [
    { title: 'Settings', name: 'settings', default: true },
    { title: 'Info popup', name: 'info' },
    { title: 'Newsletter popup', name: 'newsletter' }
  ],
  fields: [
    defineField({
      title: 'Show popup?',
      name: 'isShown',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required(),
      group: 'settings'
    }),
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Info', value: 'info' },
          { title: 'Newsletter Signup', value: 'newsletter' }
        ]
      },
      initialValue: 'info',
      validation: (Rule) => Rule.required(),
      group: 'settings'
    }),
    defineField({
      title: 'Badge (optional)',
      name: 'badgeInfo',
      type: 'reference',
      to: [{ type: 'badge' }],
      group: 'info'
    }),
    defineField({
      title: 'Title',
      name: 'titleInfo',
      type: 'i18n.string',
      validation: validateAllStringsIfTypeIs('info'),
      group: 'info'
    }),
    defineField({
      title: 'Badge (optional)',
      name: 'badgeNewsletter',
      type: 'reference',
      to: [{ type: 'badge' }],
      group: 'newsletter'
    }),
    defineField({
      title: 'Title',
      name: 'titleNewsletter',
      type: 'i18n.string',
      validation: validateAllStringsIfTypeIs('newsletter'),
      group: 'newsletter'
    }),
    defineField({
      title: 'Image',
      name: 'imageInfo',
      type: 'figure',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent.type === 'info' && !value) {
            return 'Required';
          }

          return true;
        }),
      group: 'info'
    }),
    defineField({
      title: 'Content 🇧🇻',
      name: 'contentInfo_no',
      type: 'richText',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent.type === 'info' && !value) {
            return 'Required';
          }

          return true;
        }),
      group: 'info'
    }),
    defineField({
      title: 'Content 🇬🇧',
      name: 'contentInfo_en',
      type: 'richText',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent.type === 'info' && !value) {
            return 'Required';
          }

          return true;
        }),
      group: 'info'
    }),
    defineField({
      title: 'Link',
      name: 'linkInfo',
      type: 'link',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent.type === 'info' && !value) {
            return 'Required';
          }

          return true;
        }),
      group: 'info'
    }),
    defineField({
      title: 'Image',
      name: 'imageNewsletter',
      type: 'figure',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent.type === 'newsletter' && !value) {
            return 'Required';
          }

          return true;
        }),
      group: 'newsletter'
    }),
    defineField({
      title: 'CTA button text',
      name: 'buttonTextNewsletter',
      type: 'i18n.string',
      validation: validateAllStringsIfTypeIs('newsletter'),
      group: 'newsletter'
    })
  ]
});
