import { SpeakerLoudIcon } from '@radix-ui/react-icons';
import { defineField, defineType } from 'sanity';

export const configurator = defineType({
  title: 'Konfigurator',
  name: 'configurator',
  type: 'document',
  icon: SpeakerLoudIcon,
  preview: {
    prepare() {
      return {
        title: 'Konfigurator'
      };
    }
  },
  fields: [
    defineField({
      title: 'Configurator step',
      name: 'configurationSteps',
      type: 'array',
      description: 'A list of the products in the different steps',
      of: [
        {
          type: 'configurationStep'
        }
      ],
      validation: (Rule) => Rule.min(3).max(3)
    }),
    defineField({
      title: 'Images to the steps',
      name: 'configurationStepsImages',
      type: 'array',
      description:
        'A list of images matching the various steps. These images are placed subsequent to the images of the products chosen at each step, but are replaced by the selected product image. So, at step 2, the first image may no longer be visible.',
      of: [
        {
          type: 'configurationStepImages'
        }
      ],
      validation: (Rule) => Rule.min(4).max(4)
    }),
    defineField({
      title: 'Content 🇧🇻',
      name: 'content_no',
      type: 'richText',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Content 🇸🇪',
      name: 'content_sv',
      type: 'richText',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Content 🇩🇰',
      name: 'content_dk',
      type: 'richText',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Content 🇪🇺',
      name: 'content_eu',
      type: 'richText',
      validation: (Rule) => Rule.required()
    }),
    //! Add logic for adding moods to steps
    defineField({
      title: 'Page builder',
      name: 'pageBuilder',
      type: 'pageBuilder'
    })
  ]
});
