import { defineField, defineType } from 'sanity';

export const hotspotImage = defineType({
  title: 'Hotspot image',
  name: 'hotspotImage',
  type: 'object',
  validation: (Rule) => Rule.required(),
  fields: [
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: ['text', 'productCard']
      },
      initialValue: 'text',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'figure'
    }),
    defineField({
      title: 'Hotspots',
      name: `hotspots`,
      type: `array`,
      of: [{ type: 'spot' }],
      options: {
        imageHotspot: {
          imagePath: `image`,
          descriptionPath: `details`,
          tooltip: undefined
        }
      }
    })
  ]
});
