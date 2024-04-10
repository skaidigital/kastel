import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

export const timelineItem = defineType({
  title: 'Timeline item',
  name: 'timelineItem',
  type: 'object',
  preview: {
    select: {
      label: 'label.en',
      title: 'title.en'
    },
    prepare({ label, title }) {
      return {
        title: label || 'Untitled',
        subtitle: title || undefined
      };
    }
  },
  fields: [
    defineField({
      title: 'Label',
      description: "For example '2016'",
      name: 'label',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'i18n.text',
      options: {
        rows: 3
      },
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Image / Video',
      name: 'media',
      type: 'media'
    }),
    defineField({
      title: 'Aspect ratio settings',
      name: 'aspectRatioSettings',
      type: 'aspectRatioSettings'
    })
  ]
});
