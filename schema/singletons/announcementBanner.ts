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
      type: 'array',
      of: [
        {
          type: 'object',
          preview: {
            select: {
              title: 'content.en'
            }
          },
          fields: [
            defineField({
              title: 'Content',
              name: 'content',
              type: 'i18n.string',
              validation: validateAllStringTranslations
            })
          ]
        }
      ],
      validation: (Rule) =>
        Rule.custom((field: any, context: any) => {
          if (context?.parent?.isShown && (field?.length < 1 || field === undefined)) {
            return 'Please add at least item to the content array';
          }
          if (context?.parent?.isShown && (field?.length > 4 || field === undefined)) {
            return 'Max 4 items allowed';
          }
          return true;
        })
    }),
    defineField({
      title: 'Link to something?',
      name: 'hasLink',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Link',
      name: 'link',
      type: 'linkWithoutText',
      validation: (Rule) =>
        Rule.custom((field, context: any) => {
          if (context?.parent?.hasLink && !field) {
            return 'Link is required';
          }
          return true;
        }),
      hidden: ({ parent }) => !parent?.hasLink
    })
  ]
});
