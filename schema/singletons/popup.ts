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
      initialValue: true,
      validation: (Rule) => Rule.required()
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
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Badge (optional)',
      name: 'badge',
      type: 'reference',
      to: [{ type: 'badge' }]
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
      title: 'CTA button text',
      name: 'buttonText',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    })

    // defineField({
    //   title: 'Link',
    //   name: 'link',
    //   type: 'link',
    //   validation: (Rule) =>
    //     Rule.custom((value, context) => {
    //       if (context.parent.type === 'newsletter' && !value) {
    //         return 'Required';
    //       }

    //       return true;
    //     })
    // })
  ]
});
