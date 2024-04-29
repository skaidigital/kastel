import { slugIsUniqueForLangAndSchemaType } from '@/lib/sanity/studioUtils';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { defineField, defineType } from 'sanity';

export const page = defineType({
  title: 'Page',
  name: 'page',
  type: 'document',
  icon: Pencil2Icon,
  preview: {
    select: {
      title: 'internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled'
      };
    }
  },
  fieldsets: [
    {
      name: 'settings',
      title: 'Settings'
    }
  ],
  fields: [
    defineField({
      title: 'Internal title',
      name: 'internalTitle',
      type: 'internalTitle',
      validation: (Rule) => Rule.required(),
      hidden: ({ document }: { document: any }) => document._id.endsWith('home')
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
      hidden: ({ document }: { document: any }) => document._id.endsWith('home')
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
      hidden: ({ document }: { document: any }) => document._id.endsWith('home')
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

          if (firstComponent._type !== 'hero' && firstComponent._type !== 'emailCapture') {
            return 'The first section must be a hero or email capture';
          }

          return true;
        })
    }),
    defineField({
      title: 'Announcement banner',
      name: 'showAnnouncementBanner',
      type: 'boolean',
      fieldset: 'settings',
      initialValue: false,
      validation: (Rule) => Rule.required(),
      hidden: ({ document }: { document: any }) => document._id.endsWith('home')
    }),
    defineField({
      title: 'Navbar',
      name: 'showNavbar',
      type: 'boolean',
      fieldset: 'settings',
      initialValue: true,
      validation: (Rule) => Rule.required(),
      hidden: ({ document }: { document: any }) => document._id.endsWith('home')
    }),
    defineField({
      title: 'Footer',
      name: 'showFooter',
      type: 'boolean',
      fieldset: 'settings',
      initialValue: true,
      validation: (Rule) => Rule.required(),
      hidden: ({ document }: { document: any }) => document._id.endsWith('home')
    }),
    defineField({
      title: 'Metadata',
      name: 'metadata',
      type: 'metadata'
    })
  ]
});
