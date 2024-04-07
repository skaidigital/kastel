import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { Slideshow } from '@phosphor-icons/react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const collectionListing = defineType({
  title: 'Collection listing',
  name: 'collectionListing',
  type: 'object',
  icon: Slideshow,
  fieldsets: [
    {
      title: 'Padding settings',
      name: 'paddingSettings',
      options: {
        columns: 2
      }
    }
  ],
  preview: {
    select: {
      title: 'title.no',
      collections: 'collections'
    },
    prepare({ title, collections }) {
      const collectionCount = collections?.length || 0;
      return {
        title: title || 'Untitled',
        subtitle: `${collectionCount} collection${collectionCount === 1 ? '' : 's'}`
      };
    }
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),

    defineField({
      title: 'Collections',
      name: 'collections',
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          preview: {
            select: {
              title: 'collection.title_no',
              image: 'image'
            },
            prepare({ title, image }) {
              return {
                title: title || 'Untitled',
                media: image
              };
            }
          },
          fields: [
            defineField({
              title: 'Image',
              name: 'image',
              type: 'figure',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              title: 'Collection',
              name: 'collection',
              type: 'reference',
              to: [{ type: 'collection' }],
              validation: (Rule) => Rule.required()
            })
          ]
        })
      ]
    }),
    defineField({
      title: 'Padding',
      name: 'padding',
      type: 'padding'
    }),
    defineField({
      title: 'Top padding',
      name: 'hasTopPadding',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required(),
      fieldset: 'paddingSettings'
    }),
    defineField({
      title: 'Bottom padding',
      name: 'hasBottomPadding',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required(),
      fieldset: 'paddingSettings'
    }),
    defineField({
      title: 'Bottom border',
      name: 'hasBottomBorder',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required()
    })
  ]
});
