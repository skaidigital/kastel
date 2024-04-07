import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
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
  fields: [
    defineField({
      title: 'Show popup?',
      name: 'isShown',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    // TODO replace with a custom component that can render the content in different languages
    defineField({
      title: 'Content 🇧🇻',
      name: 'content_no',
      type: 'richText',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Content 🇪🇺',
      name: 'content_eu',
      type: 'richText',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'figure',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Link',
      name: 'link',
      type: 'link',
      validation: (Rule) => Rule.required()
    })
  ]
});
