import { defineField, defineType } from 'sanity'

export const settingsGeneral = defineType({
  title: 'General settings',
  name: 'settingsGeneral',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'General settings'
      }
    }
  },
  fields: [
    // defineField({
    //   title: 'Site title',
    //   name: 'siteTitle',
    //   type: 'string'
    // }),
    defineField({
      title: 'Google Tag Manager ID',
      name: 'gtmId',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Klayvio site Id (API key)',
      name: 'klayvioId',
      type: 'string',
      validation: (Rule) => Rule.required()
    })
    // defineField({
    //   title: 'Company name',
    //   name: 'name',
    //   type: 'string'
    // }),
    // defineField({
    //   title: 'Phone number',
    //   name: 'phoneNumber',
    //   type: 'string'
    // }),
    // defineField({
    //   title: 'Email',
    //   name: 'email',
    //   type: 'string'
    // }),
    // defineField({
    //   title: 'Logo',
    //   name: 'logo',
    //   type: 'image'
    // }),
    // defineField({
    //   title: 'Do you have a phyiscal location?',
    //   name: 'hasPhysicalLocation',
    //   type: 'boolean',
    //   initialValue: false
    // }),
    // defineField({
    //   title: 'Visit address',
    //   name: 'visitAddress',
    //   type: 'address',
    //   hidden: ({ document }) => document?.hasPhysicalLocation !== true
    // })
  ]
})
