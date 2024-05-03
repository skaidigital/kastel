import { Square } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const card = defineType({
  title: 'Card',
  name: 'card',
  type: 'object',
  icon: Square,
  preview: {
    select: {
      type: 'media.type',
      image: 'media.image',
      video: 'media.video',
      imageMobile: 'media.imageMobile',
      imageDesktop: 'media.imageDesktop',
      videoMobile: 'media.videoMobile',
      videoDesktop: 'media.videoDesktop'
    },
    prepare({ type, image, video, imageMobile, imageDesktop, videoMobile, videoDesktop }) {
      const mediaPreview =
        image || video || imageMobile || imageDesktop || videoMobile || videoDesktop;

      const typeToTitleCase = (type: string) => {
        return type.charAt(0).toUpperCase() + type.slice(1);
      };
      const formattedType = typeToTitleCase(type);

      return {
        title: formattedType || 'Card',
        media: mediaPreview
      };
    }
  },
  fields: [
    defineField({
      title: 'Media',
      name: 'media',
      type: 'media',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Link',
      name: 'link',
      type: 'conditionalLink',
      validation: (Rule) => Rule.required()
    })
  ]
});
