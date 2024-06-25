import { ASPECT_RATIOS } from '@/data/constants'
import { defineField, defineType } from 'sanity'

export const aspectRatioSettings = defineType({
  title: 'Aspect Ratio Settings',
  name: 'aspectRatioSettings',
  type: 'object',
  fields: [
    defineField({
      title: 'Same aspect ratio for mobile and desktop?',
      name: 'sameAspectRatio',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Aspect ratio',
      name: 'aspectRatio',
      type: 'string',
      initialValue: '16:9',
      options: {
        list: ASPECT_RATIOS
      },
      validation: (Rule) =>
        Rule.custom((aspectRatio, context: any) => {
          const sameAspectRatio = context.parent?.sameAspectRatio

          if (sameAspectRatio && !aspectRatio) {
            return 'Aspect ratio is required'
          }

          return true
        }),
      hidden: ({ parent }) => parent?.sameAspectRatio === false
    }),
    defineField({
      title: 'Desktop aspect ratio',
      name: 'aspectRatioDesktop',
      type: 'string',
      initialValue: '16:9',
      options: {
        list: ASPECT_RATIOS
      },
      validation: (Rule) =>
        Rule.custom((aspectRatioDesktop, context: any) => {
          const sameAspectRatio = context.parent?.sameAspectRatio

          if (!sameAspectRatio && !aspectRatioDesktop) {
            return 'Aspect ratio is required'
          }

          return true
        }),
      hidden: ({ parent }) => parent?.sameAspectRatio === true
    }),
    defineField({
      title: 'Mobile aspect ratio',
      name: 'aspectRatioMobile',
      type: 'string',
      initialValue: '9:16',
      options: {
        list: ASPECT_RATIOS
      },
      validation: (Rule) =>
        Rule.custom((aspectRatioDesktop, context: any) => {
          const sameAspectRatio = context.parent?.sameAspectRatio

          if (!sameAspectRatio && !aspectRatioDesktop) {
            return 'Aspect ratio is required'
          }

          return true
        }),
      hidden: ({ parent }) => parent?.sameAspectRatio === true
    })
  ]
})
