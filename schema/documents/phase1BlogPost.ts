import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
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
  preview: {
    select: {
      title: 'internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'No title defined',
        subtitle: 'Phase 1 blog post'
      };
    }
  },
  fields: [
    defineField({
      title: 'Internal title',
      name: 'internalTitle',
      type: 'internalTitle'
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Experiment ID',
      name: 'experimentId',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Start date',
      name: 'startDate',
      type: 'date',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Status',
      name: 'status',
      type: 'string',
      options: {
        list: ['open', 'closed']
      },
      initialValue: 'open',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Callout (optional)',
      description:
        'Can be used for directing the user to a phase 2 product that came from this experiment.',
      name: 'callout',
      type: 'richText'
    }),
    defineField({
      title: 'Question for the reader?',
      name: 'hasQuestion',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Question',
      name: 'question',
      type: 'object',
      fields: [
        defineField({
          title: 'Title',
          name: 'title',
          type: 'i18n.string'
          // validation: validateAllStringTranslations
        }),
        defineField({
          title: 'Description',
          name: 'description',
          type: 'i18n.string'
          // validation: validateAllStringTranslations
        }),
        defineField({
          title: 'Questions',
          name: 'questions',
          type: 'array',
          of: [{ type: 'i18n.string', validation: (Rule) => Rule.required() }],
          validation: (Rule) => Rule.min(1).max(3)
        })
      ],
      hidden: ({ parent }) => !parent.hasQuestion,
      validation: (Rule) =>
        Rule.custom((field, context: any) => {
          if (context.parent.hasQuestion && !field) {
            return 'Title is required when question is enabled';
          }
          return true;
        })
    }),
    defineField({
      title: 'Image',
      description: 'The image that will be shown in the landing page with all the blog posts',
      name: 'image',
      type: 'figure',
      validation: (Rule) => Rule.required()
    })
  ]
});
