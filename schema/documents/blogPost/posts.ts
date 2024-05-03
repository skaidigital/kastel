import { defineField, defineType } from 'sanity';

export const blogPostReccommendedBlogPosts = defineType({
  title: 'Reccommended blog posts',
  name: 'blogPostReccommendedBlogPosts',
  type: 'object',
  fields: [
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: '3 most recent', value: 'mostRecent' },
          { title: 'Selected', value: 'selected' }
        ],
        layout: 'radio'
      },
      initialValue: 'mostRecent',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: (Rule: any) =>
        Rule.custom((value: any, context: any) => {
          if (context?.parent?.type === 'mostRecent') {
            return true;
          }

          const hasNo = value?.no;
          const hasEn = value?.en;

          if (!hasNo || !hasEn) {
            return [
              !hasNo && { message: 'You must provide a Norwegian translation', paths: ['no'] },
              !hasEn && { message: 'You must provide an English translation', paths: ['en'] }
            ].filter(Boolean);
          }
          return true;
        }),
      hidden: ({ parent }) => parent?.type === 'mostRecent'
    }),
    defineField({
      title: 'Button text',
      name: 'buttonText',
      type: 'i18n.string',
      validation: (Rule: any) =>
        Rule.custom((value: any, context: any) => {
          if (context?.parent?.type === 'mostRecent') {
            return true;
          }

          const hasNo = value?.no;
          const hasEn = value?.en;

          if (!hasNo || !hasEn) {
            return [
              !hasNo && { message: 'You must provide a Norwegian translation', paths: ['no'] },
              !hasEn && { message: 'You must provide an English translation', paths: ['en'] }
            ].filter(Boolean);
          }
          return true;
        }),
      hidden: ({ parent }) => parent?.type === 'mostRecent'
    }),
    defineField({
      title: 'Blog posts',
      name: 'posts',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'blogPost' }]
        }
      ],
      validation: (Rule) =>
        Rule.custom((posts: any, context: any) => {
          if (context?.parent?.type === 'selected' && !posts.length) {
            return 'Please select at least one blog post';
          }
          return true;
        }),
      hidden: ({ parent }) => parent?.type === 'mostRecent'
    })
  ]
});
