import { MARKETS } from '@/data/constants';
import { i18nField, i18nSlug } from '@/lib/sanity/studioUtils';
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
  groups: [
    {
      icon: () => '🙌',
      name: 'shared',
      title: 'Shared',
      default: true
    },
    ...MARKETS.map((market) => ({
      name: market.id,
      title: market.name,
      icon: () => market.flag
    }))
  ],
  fields: [
    defineField({
      title: 'Internal title',
      name: 'internalTitle',
      type: 'internalTitle',
      group: 'shared',
      validation: (Rule) => Rule.required()
    }),
    ...i18nSlug({ schemaType: 'page', validation: (Rule: any) => Rule.required() }),
    defineField({
      title: 'Page builder',
      name: 'pageBuilder',
      type: 'pageBuilder',
      group: 'shared',
      validation: (Rule) => Rule.required().min(1)
    }),
    ...i18nField({
      title: 'Metadata',
      name: 'metadata',
      type: 'metadata'
    })
  ]
});
