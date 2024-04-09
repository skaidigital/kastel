import { defineField, defineType } from 'sanity';

export const aspectRatioSettings = defineType({
  title: 'aspectRatioSettings',
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
        list: [
          { title: '16:9', value: '16:9' },
          { title: '4:3', value: '4:3' },
          { title: '21:9', value: '21:9' },
          { title: '9:16', value: '9:16' },
          { title: '3:4', value: '3:4' }
        ]
      },
      validation: (Rule) =>
        Rule.custom((aspectRatio, context: any) => {
          const sameAspectRatio = context.parent?.sameAspectRatio;

          if (sameAspectRatio && !aspectRatio) {
            return 'Aspect ratio is required';
          }

          return true;
        }),
      hidden: ({ parent }) => parent?.sameAspectRatio === true
    }),
    defineField({
      title: 'Desktop aspect ratio',
      name: 'aspectRatioDesktop',
      type: 'string',
      initialValue: '16:9',
      options: {
        list: [
          { title: '16:9', value: '16:9' },
          { title: '4:3', value: '4:3' },
          { title: '21:9', value: '21:9' }
        ]
      },
      validation: (Rule) =>
        Rule.custom((aspectRatioDesktop, context: any) => {
          const sameAspectRatio = context.parent?.sameAspectRatio;

          if (sameAspectRatio && !aspectRatioDesktop) {
            return 'Aspect ratio is required';
          }

          return true;
        }),
      hidden: ({ parent }) => parent?.sameAspectRatio === true
    }),
    defineField({
      title: 'Mobile aspect ratio',
      name: 'aspectRatioMobile',
      type: 'string',
      initialValue: '9:16',
      options: {
        list: [
          { title: '9:16', value: '9:16' },
          { title: '3:4', value: '3:4' }
        ]
      },
      validation: (Rule) =>
        Rule.custom((aspectRatioDesktop, context: any) => {
          const sameAspectRatio = context.parent?.sameAspectRatio;

          if (sameAspectRatio && !aspectRatioDesktop) {
            return 'Aspect ratio is required';
          }

          return true;
        }),
      hidden: ({ parent }) => parent?.sameAspectRatio === true
    })
  ]
});
