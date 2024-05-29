import { Crosshair } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const hotspotImage = defineType({
  title: 'Hotspot image',
  name: 'hotspotImage',
  type: 'document',
  icon: Crosshair,
  preview: {
    select: {
      title: 'internalTitle',
      media: 'image'
    },
    prepare: ({ title, media }) => ({
      title: title || 'Untitled',
      subtitle: 'Hotspot image',
      media: media || undefined
    })
  },
  validation: (Rule) => Rule.required(),
  fields: [
    defineField({
      title: 'Internal title',
      name: 'internalTitle',
      type: 'internalTitle'
    }),
    defineField({
      title: 'Image',
      description: 'Add an image and then click on the image blow to place your hotspot(s)',
      name: 'image',
      type: 'image',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Hotspots for detail image (optional)',
      name: `hotspots`,
      type: `array`,
      of: [{ type: 'spot' }],
      options: {
        // @ts-expect-error - this is a bug in the types
        imageHotspot: {
          imagePath: 'image',
          descriptionPath: `type`,
          tooltip: undefined
        }
      },
      validation: (Rule) => Rule.min(1)
    })
  ]
});
