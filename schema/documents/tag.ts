import {
  slugIsUniqueForLangAndSchemaType,
  validateAllStringTranslations
} from '@/lib/sanity/studioUtils';
import { Tag } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const tag = defineType({
  title: 'Tag',
  name: 'tag',
  type: 'document',
  icon: Tag,
  preview: {
    select: {
      title: 'title.en',
      group: 'group.title.en'
    },
    prepare: ({ title, group }) => {
      return {
        title: `${title} (${group})`
      };
    }
  },
  fields: [
    defineField({
      title: 'What is a tag?',
      description:
        'A tag is any kind of label that a product can surface for in the filter on a collection page. They are similar but not always the same as product option. Se separate them so we can surface a product based on a tag that does not neccessarily have a product option.',
      name: 'myCustomNote',
      type: 'note',
      options: {
        tone: 'positive'
      }
    }),
    defineField({
      title: 'Belongs to tag group',
      name: 'group',
      type: 'reference',
      to: { type: 'tagGroup' },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Color',
      description: 'Will be hidden unless the referenced tag group is of type "color"',
      name: 'color',
      type: 'reference',
      to: { type: 'colorDocument' },
      // hidden: ({ parent }) => parent?.type !== 'color',
      validation: (Rule) =>
        Rule.custom(async (value, context: any) => {
          const client = context.getClient({ apiVersion: '2024-01-08' });
          const parentId = context.document.group?._ref;

          const parentType = await client.fetch(`*[_id == "${parentId}"][0].type`);

          if (!value && parentType === 'color') {
            return 'Color is required for tags that belong to a color group';
          }

          return true;
        })
    }),
    defineField({
      title: 'Size',
      description: 'Will be hidden unless the referenced tag group is of type "size"',
      name: 'size',
      type: 'reference',
      to: { type: 'productOption' },
      // hidden: ({ parent }) => parent?.type !== 'color',
      validation: (Rule) =>
        Rule.custom(async (value, context: any) => {
          const client = context.getClient({ apiVersion: '2024-01-08' });
          const parentId = context.document.group?._ref;

          const parentType = await client.fetch(`*[_id == "${parentId}"][0].type`);

          if (!value && parentType === 'size') {
            return 'Size is required for tags that belong to a color group';
          }

          return true;
        })
    }),
    defineField({
      title: 'Slug 🇧🇻',
      description: 'Will be hidden unless the referenced tag group is of type "text"',
      name: 'slug_no',
      type: 'slug',
      options: {
        source: 'title.no',
        isUnique: (slug, context) =>
          slugIsUniqueForLangAndSchemaType({
            slug,
            schemaType: 'tag',
            lang: 'no',
            context
          })
      },
      validation: (Rule) =>
        Rule.custom(async (value, context: any) => {
          const client = context.getClient({ apiVersion: '2024-01-08' });
          const parentId = context.document.group?._ref;

          const parentType = await client.fetch(`*[_id == "${parentId}"][0].type`);

          if (!value && parentType === 'text') {
            return 'Color is required for tags that belong to a color group';
          }

          return true;
        })
    }),
    defineField({
      title: 'Slug 🇬🇧',
      description: 'Will be hidden unless the referenced tag group is of type "text"',
      name: 'slug_en',
      type: 'slug',
      options: {
        source: 'title.en',
        isUnique: (slug, context) =>
          slugIsUniqueForLangAndSchemaType({
            slug,
            schemaType: 'tag',
            lang: 'en',
            context
          })
      },
      validation: (Rule) =>
        Rule.custom(async (value, context: any) => {
          const client = context.getClient({ apiVersion: '2024-01-08' });
          const parentId = context.document.group?._ref;

          const parentType = await client.fetch(`*[_id == "${parentId}"][0].type`);

          if (!value && parentType === 'text') {
            return 'Color is required for tags that belong to a color group';
          }

          return true;
        })
    })
  ]
});
