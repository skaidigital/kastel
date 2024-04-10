import {
  slugIsUniqueForLangAndSchemaType,
  validateAllStringTranslations
} from '@/lib/sanity/studioUtils';
import { Article } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const phase3BlogPost = defineType({
  title: 'Nature Lab phase 3 blog post',
  name: 'phase3BlogPost',
  type: 'document',
  icon: Article,
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'innovationId.no'
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Phase 3 blog post'
      };
    }
  },
  groups: [
    { name: 'settings', title: 'Settings', icon: () => '⚙️', default: true },
    { name: 'editorial', title: 'Editorial', icon: () => '📝' }
  ],
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations,
      group: 'settings'
    }),
    defineField({
      title: 'Innovation ID',
      description: "For example '#23' or 'NL-23'",
      name: 'innovationId',
      type: 'i18n.string',
      validation: validateAllStringTranslations,
      group: 'settings'
    }),
    defineField({
      title: 'Completion date',
      name: 'completionDate',
      type: 'date',
      validation: (Rule) => Rule.required(),
      group: 'settings'
    }),
    defineField({
      title: 'Image',
      description:
        "The image that is shown in the Nature Lab landing page and the 'blog posts' page for Nature Lab",
      name: 'image',
      type: 'figure',
      validation: (Rule) => Rule.required(),
      group: 'settings'
    }),
    defineField({
      title: 'Content 🇧🇻',
      name: 'contentNo',
      type: 'richTextNatureLab',
      validation: (Rule) => Rule.required(),
      group: 'editorial'
    }),
    defineField({
      title: 'Content 🇬🇧',
      name: 'contentEn',
      type: 'richTextNatureLab',
      validation: (Rule) => Rule.required(),
      group: 'editorial'
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
            schemaType: 'phase3BlogPost',
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
            schemaType: 'phase3BlogPost',
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
