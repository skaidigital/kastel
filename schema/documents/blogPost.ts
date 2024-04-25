import { ASPECT_RATIOS } from '@/data/constants';
import {
  slugIsUniqueForLangAndSchemaType,
  validateAllStringTranslations
} from '@/lib/sanity/studioUtils';
import { Article, Gear, PaintBrush } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const blogPost = defineType({
  title: 'Blog post',
  name: 'blogPost',
  type: 'document',
  icon: Article,
  groups: [
    {
      icon: PaintBrush,
      name: 'editorial',
      title: 'Editorial',
      default: true
    },
    {
      icon: Gear,
      name: 'settings',
      title: 'Settings'
    }
  ],
  fieldsets: [
    {
      name: 'aspectRatio',
      title: 'Aspect ratio',
      options: { columns: 2 }
    }
  ],
  preview: {
    select: {
      title: 'internalTitle',
      media: 'imageDesktop'
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: 'Blog post',
        media: selection.media
      };
    }
  },
  fields: [
    defineField({
      title: 'Internal title',
      name: 'internalTitle',
      type: 'internalTitle',
      group: 'settings'
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations,
      group: 'editorial'
    }),
    defineField({
      title: 'Content 🇧🇻',
      name: 'content_no',
      type: 'blogPostText',
      validation: (Rule) => Rule.required(),
      group: 'editorial'
    }),
    defineField({
      title: 'Content 🇬🇧',
      name: 'content_en',
      type: 'blogPostText',
      validation: (Rule) => Rule.required(),
      group: 'editorial'
    }),
    defineField({
      title: 'Desktop image',
      name: 'imageDesktop',
      type: 'figure',
      validation: (Rule) => Rule.required(),
      group: 'editorial'
    }),
    defineField({
      title: 'Mobile image',
      name: 'imageMobile',
      type: 'figure',
      validation: (Rule) => Rule.required(),
      group: 'editorial'
    }),
    defineField({
      title: 'Mobile',
      name: 'aspectRatioMobile',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: ASPECT_RATIOS
      },
      initialValue: '9:16',
      fieldset: 'aspectRatio',
      group: 'editorial'
    }),
    defineField({
      title: 'Desktop',
      name: 'aspectRatioDesktop',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: ASPECT_RATIOS
      },
      initialValue: '16:9',
      fieldset: 'aspectRatio',
      group: 'editorial'
    }),
    defineField({
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{ type: 'person' }],
      validation: (Rule) => Rule.required(),
      group: 'editorial'
    }),
    defineField({
      title: 'Reccommendeded blog posts',
      name: 'reccommendedBlogPosts',
      type: 'reccommendedBlogPosts',
      group: 'settings',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Slug 🇧🇻',
      name: 'slug_no',
      type: 'slug',
      options: {
        source: 'title.no',
        isUnique: (slug, context) =>
          slugIsUniqueForLangAndSchemaType({
            slug,
            schemaType: 'blogPost',
            lang: 'no',
            context
          })
      },
      validation: (Rule) => Rule.required(),
      group: 'settings'
    }),
    defineField({
      title: 'Slug 🇬🇧',
      name: 'slug_en',
      type: 'slug',
      options: {
        source: 'title.en',
        isUnique: (slug, context) =>
          slugIsUniqueForLangAndSchemaType({
            slug,
            schemaType: 'blogPost',
            lang: 'en',
            context
          })
      },
      validation: (Rule) => Rule.required(),
      group: 'settings'
    }),
    defineField({
      title: 'Metadata',
      name: 'metadata',
      type: 'metadata',
      group: 'settings'
    })
  ]
});
