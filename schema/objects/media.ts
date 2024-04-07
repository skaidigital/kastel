import { defineField, defineType } from 'sanity';

export const media = defineType({
  title: 'Media',
  name: 'media',
  type: 'object',
  fields: [
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: ['image', 'video']
      },
      initialValue: 'image',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Same video / image for mobile and desktop',
      name: 'sameAssetForMobileAndDesktop',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'figure',
      hidden: ({ parent }) =>
        parent?.sameAssetForMobileAndDesktop === false || parent?.type !== 'image',
      validation: (Rule) =>
        Rule.custom((image, context: any) => {
          const sameAssetForMobileAndDesktop = context.parent?.sameAssetForMobileAndDesktop;
          const type = context.parent?.type;

          if (sameAssetForMobileAndDesktop && type === 'image' && !image) {
            return 'Image is required';
          }

          return true;
        })
    }),
    defineField({
      title: 'Video',
      name: 'video',
      type: 'mux.video',
      hidden: ({ parent }) =>
        parent?.sameAssetForMobileAndDesktop === false || parent?.type !== 'video',
      validation: (Rule) =>
        Rule.custom((video, context: any) => {
          const sameAssetForMobileAndDesktop = context.parent?.sameAssetForMobileAndDesktop;
          const type = context.parent?.type;

          if (sameAssetForMobileAndDesktop && type === 'video' && !video) {
            return 'Video is required';
          }

          return true;
        })
    }),
    defineField({
      title: 'Image - Mobile',
      name: 'imageMobile',
      type: 'figure',
      hidden: ({ parent }) =>
        parent?.sameAssetForMobileAndDesktop === true || parent?.type !== 'image',
      validation: (Rule) =>
        Rule.custom((image, context: any) => {
          const sameAssetForMobileAndDesktop = context.parent?.sameAssetForMobileAndDesktop;
          const type = context.parent?.type;

          if (sameAssetForMobileAndDesktop && type === 'image' && !image) {
            return 'Image is required';
          }

          return true;
        })
    }),
    defineField({
      title: 'Image - Desktop',
      name: 'imageDesktop',
      type: 'figure',
      hidden: ({ parent }) =>
        parent?.sameAssetForMobileAndDesktop === true || parent?.type !== 'image',
      validation: (Rule) =>
        Rule.custom((image, context: any) => {
          const sameAssetForMobileAndDesktop = context.parent?.sameAssetForMobileAndDesktop;
          const type = context.parent?.type;

          if (sameAssetForMobileAndDesktop && type === 'image' && !image) {
            return 'Image is required';
          }

          return true;
        })
    }),
    defineField({
      title: 'Video - Mobile',
      name: 'videoMobile',
      type: 'mux.video',
      hidden: ({ parent }) =>
        parent?.sameAssetForMobileAndDesktop === true || parent?.type !== 'video',
      validation: (Rule) =>
        Rule.custom((video, context: any) => {
          const sameAssetForMobileAndDesktop = context.parent?.sameAssetForMobileAndDesktop;
          const type = context.parent?.type;

          if (sameAssetForMobileAndDesktop && type === 'video' && !video) {
            return 'Video is required';
          }

          return true;
        })
    }),
    defineField({
      title: 'Video - Desktop',
      name: 'videoDesktop',
      type: 'mux.video',
      hidden: ({ parent }) =>
        parent?.sameAssetForMobileAndDesktop === true || parent?.type !== 'video',
      validation: (Rule) =>
        Rule.custom((video, context: any) => {
          const sameAssetForMobileAndDesktop = context.parent?.sameAssetForMobileAndDesktop;
          const type = context.parent?.type;

          if (sameAssetForMobileAndDesktop && type === 'video' && !video) {
            return 'Video is required';
          }

          return true;
        })
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
      validation: (Rule) => Rule.required()
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
      validation: (Rule) => Rule.required()
    })
  ]
});
