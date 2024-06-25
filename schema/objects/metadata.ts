import { defineField, defineType } from 'sanity'

export const metadata = defineType({
  title: 'SEO & Social',
  name: 'metadata',
  type: 'object',
  fields: [
    defineField({
      title: 'Title for SEO & social sharing (meta title)',
      name: 'metaTitle',
      type: 'i18n.string',
      description:
        'Will use the page title if left empty. Make it as enticing as possible convert users in social feeds and Google searches. Ideally between 15 and 70 characters'
    }),
    defineField({
      title: 'Short paragraph for SEO & social sharing (meta description)',
      name: 'metaDescription',
      type: 'i18n.text',
      options: {
        rows: 3
      },
      description:
        'Optional, but highly encouraged as it will help you converet more visitors from Google & social. Ideally between 70 and 160 characters'
    }),
    defineField({
      title: 'Hide this page from Google',
      name: 'noIndex',
      type: 'boolean',
      description: 'If you want to hide this page from Google, uncheck this box',
      initialValue: false
    }),
    defineField({
      title: 'Prevent Google from following links on this page',
      name: 'noFollow',
      type: 'boolean',
      description:
        'If you want to prevent Google from following links on this page, uncheck this box',
      initialValue: false
    }),
    defineField({
      type: 'ogImage',
      name: 'ogImage',
      description: 'Will use the default image from settings if not set here.',
      validation: undefined
    })
  ]
})
