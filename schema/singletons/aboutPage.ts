import { slugIsUniqueForLangAndSchemaType } from '@/lib/sanity/studioUtils';
import { BookOpenText } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

// TODO make the internal title hidden once it's set in both datasets
export const aboutPage = defineType({
  title: 'About Page',
  name: 'aboutPage',
  type: 'document',
  icon: BookOpenText,
  preview: {
    prepare() {
      return {
        title: 'About page',
        subtitle: 'About page'
      };
    }
  },
  fields: [
    defineField({
      title: 'Internal title',
      name: 'internalTitle',
      type: 'internalTitle',
      validation: (Rule) => Rule.required(),
      hidden: true
    }),
    defineField({
      title: 'Page builder',
      name: 'pageBuilder',
      type: 'pageBuilder',
      validation: (Rule) =>
        Rule.custom((value: any, context: any) => {
          if (!value?.length) {
            return 'You need to add at least one section';
          }

          const firstComponent = value[0];

          if (
            firstComponent._type !== 'hero' &&
            firstComponent._type !== 'emailCapture' &&
            firstComponent._type !== 'pageTitle'
          ) {
            return 'The first section must be a hero, email capture or page title';
          }

          return true;
        })
    }),
    defineField({
      title: 'Slug 🇧🇻',
      name: 'slug_no',
      type: 'slug',
      options: {
        isUnique: (slug, context) =>
          slugIsUniqueForLangAndSchemaType({
            slug,
            schemaType: 'page',
            lang: 'no',
            context
          })
      },
      validation: (Rule) => Rule.required(),
      // hidden: ({ document }: { document: any }) => document._id.endsWith('home')
      hidden: true
    }),
    defineField({
      title: 'Slug 🇬🇧',
      name: 'slug_en',
      type: 'slug',
      options: {
        isUnique: (slug, context) =>
          slugIsUniqueForLangAndSchemaType({
            slug,
            schemaType: 'page',
            lang: 'en',
            context
          })
      },
      validation: (Rule) => Rule.required(),
      // hidden: ({ document }: { document: any }) => document._id.endsWith('home')
      hidden: true
    }),
    defineField({
      title: 'Metadata',
      name: 'metadata',
      type: 'metadata'
    })
  ]
});
