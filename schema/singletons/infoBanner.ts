import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { SpeakerLoudIcon } from '@radix-ui/react-icons';
import { defineField, defineType } from 'sanity';

export const infoBanner = defineType({
  title: 'Info-fane',
  name: 'infoBanner',
  type: 'document',
  icon: SpeakerLoudIcon,
  preview: {
    prepare() {
      return {
        title: 'Info-fane'
      };
    }
  },
  fields: [
    defineField({
      title: 'Show banner?',
      name: 'isShown',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'i18n.text',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Link',
      name: 'linkWithoutText',
      type: 'linkWithoutText'
    })
  ]
});
