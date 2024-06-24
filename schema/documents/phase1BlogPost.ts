import {
  InternationalizedObjectField,
  generateObjectFields
} from '@/components/sanity/InternationalizedObjectField';
import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { Article } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

// TODO Validate everything in the question based on the boolean
// TODO add metadata
// TODO translate callout
// TODO add slug
// TODO add array of content objects (main content)
export const phase1BlogPost = defineType({
  title: 'Nature Lab phase 1 blog post',
  name: 'phase1BlogPost',
  type: 'document',
  icon: Article,
  preview: {
    select: {
      title: 'title.en'
    },
    prepare({ title }) {
      return {
        title: title || 'No title defined',
        subtitle: 'Phase 1 blog post'
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
      title: 'Experiment ID',
      description: "For example '#2' or 'NLE-2'",
      name: 'experimentId',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'settings'
    }),
    defineField({
      title: 'Start date',
      name: 'startDate',
      type: 'date',
      validation: (Rule) => Rule.required(),
      group: 'settings'
    }),
    defineField({
      title: 'Status',
      name: 'status',
      type: 'string',
      options: {
        list: [
          { value: 'open', title: 'OPEN' },
          { value: 'closed', title: 'CLOSED' }
        ]
      },
      initialValue: 'open',
      validation: (Rule) => Rule.required(),
      group: 'settings'
    }),
    defineField({
      title: 'Callout (optional)',
      description:
        'Can be used for directing the user to a phase 2 product that came from this experiment.',
      name: 'callout',
      type: 'richText',
      group: 'settings'
    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{ type: 'updateItem' }],
      validation: (Rule) => Rule.min(1),
      group: 'editorial'
    }),
    defineField({
      title: 'Question for the reader?',
      name: 'hasQuestion',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) => Rule.required(),
      group: 'settings'
    }),
    defineField({
      title: 'Comments',
      name: 'comments',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Comment',
          fields: [
            defineField({
              title: 'Name',
              name: 'name',
              type: 'string',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              title: 'Email',
              name: 'email',
              type: 'email',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              title: 'Text',
              name: 'text',
              type: 'text',
              validation: (Rule) => Rule.required()
            })
          ]
        }
      ],
      group: 'editorial'
    }),
    // defineField({
    //   title: 'Question',
    //   name: 'question',
    //   type: 'object',
    //   fields: [
    //     defineField({
    //       title: 'Title',
    //       name: 'title',
    //       type: 'i18n.string',
    //       validation: validateAllStringTranslations
    //     }),
    //     defineField({
    //       title: 'Description',
    //       name: 'description',
    //       type: 'i18n.text',
    //       options: {
    //         rows: 2
    //       },
    //       validation: validateAllStringTranslations
    //     }),
    //     defineField({
    //       title: 'Questions',
    //       name: 'questions',
    //       type: 'array',
    //       of: [{ type: 'i18n.string', validation: (Rule) => Rule.required() }],
    //       validation: (Rule) => Rule.min(1).max(3)
    //     })
    //   ],
    //   hidden: ({ parent }) => !parent.hasQuestion,
    //   validation: (Rule) =>
    //     Rule.custom((field, context: any) => {
    //       if (context.parent.hasQuestion && !field) {
    //         return 'Title is required when question is enabled';
    //       }
    //       return true;
    //     }),
    //   group: 'settings'
    // }),
    defineField({
      title: 'Image',
      description:
        "The image that is shown in the Nature Lab landing page and the 'blog posts' page for Nature Lab",
      name: 'image',
      type: 'figure',
      validation: (Rule) => Rule.required(),
      group: 'settings'
    }),
    // TODO handle validation and isUnique for each slug
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'object',
      fields: generateObjectFields({ schemaType: 'slug', type: 'lang' }),
      components: {
        field: InternationalizedObjectField
      },
      group: 'settings',
      validation: validateAllStringTranslations
    }),
    // defineField({
    //   title: 'Slug 🇧🇻',
    //   name: 'slug_no',
    //   type: 'slug',
    //   options: {
    //     source: 'title.no',
    //     isUnique: (slug, context) =>
    //       slugIsUniqueForLangAndSchemaType({
    //         slug,
    //         schemaType: 'phase1BlogPost',
    //         lang: 'no',
    //         context
    //       })
    //   },
    //   validation: (Rule: any) =>
    //     Rule.custom((value: any) => {
    //       if (!value?.current) {
    //         return 'Slug is required';
    //       }
    //       if (value?.current?.includes(' ')) {
    //         return 'Slug cannot contain spaces';
    //       }
    //       return true;
    //     }),
    //   group: 'settings'
    // }),
    // defineField({
    //   title: 'Slug 🇬🇧',
    //   name: 'slug_en',
    //   type: 'slug',
    //   options: {
    //     source: 'title.en',
    //     isUnique: (slug, context) =>
    //       slugIsUniqueForLangAndSchemaType({
    //         slug,
    //         schemaType: 'phase1BlogPost',
    //         lang: 'en',
    //         context
    //       })
    //   },
    //   validation: (Rule: any) =>
    //     Rule.custom((value: any) => {
    //       if (!value?.current) {
    //         return 'Slug is required';
    //       }
    //       if (value?.current?.includes(' ')) {
    //         return 'Slug cannot contain spaces';
    //       }
    //       return true;
    //     }),
    //   group: 'settings'
    // }),
    // defineField({
    //   title: 'Slug 🇸🇪',
    //   name: 'slug_sv',
    //   type: 'slug',
    //   options: {
    //     source: 'title.sv',
    //     isUnique: (slug, context) =>
    //       slugIsUniqueForLangAndSchemaType({
    //         slug,
    //         schemaType: 'phase1BlogPost',
    //         lang: 'sv',
    //         context
    //       })
    //   }
    // }),
    defineField({
      title: 'Metadata',
      name: 'metadata',
      type: 'metadata',
      group: 'settings'
    })
  ]
});
