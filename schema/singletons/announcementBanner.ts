import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { SpeakerLoudIcon } from '@radix-ui/react-icons';
import { defineField, defineType } from 'sanity';

export const announcementBanner = defineType({
  title: 'Announcement banner',
  name: 'announcementBanner',
  type: 'document',
  icon: SpeakerLoudIcon,
  preview: {
    prepare() {
      return {
        title: 'Announcement banner'
      };
    }
  },
  fields: [
    defineField({
      title: 'Show banner?',
      name: 'isShown',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required()
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
