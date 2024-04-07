import { ChatText } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const contactForm = defineType({
  title: 'Contact form',
  name: 'contactForm',
  type: 'object',
  icon: ChatText,
  fieldsets: [
    {
      title: 'Padding settings',
      name: 'paddingSettings',
      options: {
        columns: 2
      }
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact form',
        subtitle: 'Contact form',
        icon: ChatText
      };
    }
  },
  fields: [
    defineField({
      title: 'Show form?',
      name: 'showForm',
      type: 'boolean',
      initialValue: true,
      hidden: true
    }),
    defineField({
      title: 'Padding',
      name: 'padding',
      type: 'padding'
    }),
    defineField({
      title: 'Top padding',
      name: 'hasTopPadding',
      type: 'hasTopPadding',
      fieldset: 'paddingSettings'
    }),
    defineField({
      title: 'Bottom padding',
      name: 'hasBottomPadding',
      type: 'hasBottomPadding',
      fieldset: 'paddingSettings'
    }),
    defineField({
      title: 'Bottom border',
      name: 'hasBottomBorder',
      type: 'hasBottomBorder'
    })
  ]
});
