import { defineField, defineType } from 'sanity'

export const accountPage = defineType({
  title: 'Account page',
  name: 'accountPage',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'Account page',
        subtitle: 'Account page'
      }
    }
  },
  fields: [
    defineField({
      title: 'Message from the team 🇧🇻',
      name: 'messageFromTheTeam_no',
      type: 'richText',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Message from the team 🇬🇧',
      name: 'messageFromTheTeam_en',
      type: 'richText',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Message from the team 🇸🇪',
      name: 'messageFromTheTeam_sv',
      type: 'richText'
    }),
    defineField({
      title: 'Products display (optional)',
      name: 'productDisplay',
      type: 'productDisplay'
    }),
    defineField({
      title: 'Image',
      description: 'Image displayed for all users on the account page.',
      name: 'image',
      type: 'figure',
      validation: (Rule) => Rule.required()
    })
  ]
})
