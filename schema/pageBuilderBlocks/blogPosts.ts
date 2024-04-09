import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { Article } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const blogPosts = defineType({
  title: 'Blog posts',
  name: 'blogPosts',
  type: 'object',
  icon: Article,
  preview: {
    prepare() {
      return {
        title: 'Blog posts',
        subtitle: 'Blog posts'
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
      title: 'Button text',
      name: 'buttonText',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
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
      initialValue: 'mostRecent'
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
          const { type } = context.parent;
          if (type === 'selected' && !posts.length) {
            return 'Please select at least one blog post';
          }
          return true;
        }),
      hidden: ({ parent }) => parent.type === 'mostRecent'
    })
  ]
});
