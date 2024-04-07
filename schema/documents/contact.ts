import { defineField, defineType } from 'sanity';

export const contact = defineType({
  title: 'Ansatt',
  name: 'contact',
  type: 'document',
  // icon: () => '🧑',
  fieldsets: [
    {
      title: 'Navn',
      name: 'name',
      options: {
        columns: 2
      }
    },
    {
      title: 'Kontaktinfo',
      name: 'contactInfo',
      options: {
        columns: 2
      }
    }
  ],
  fields: [
    defineField({
      title: 'Selskap',
      name: 'company',
      type: 'reference',
      to: [{ type: 'company' }],
      validation: (Rule) => Rule.required().error('Selskap er påkrevd')
    }),
    defineField({
      title: 'Fornavn',
      name: 'firstName',
      type: 'string',
      validation: (Rule) => Rule.required().error('Fornavn er påkrevd'),
      fieldset: 'name'
    }),
    defineField({
      title: 'Etternavn',
      name: 'lastName',
      type: 'string',
      validation: (Rule) => Rule.required().error('Etternavn er påkrevd'),
      fieldset: 'name'
    }),
    defineField({
      title: 'Rolle',
      name: 'role',
      type: 'string',
      options: {
        list: [
          { title: 'Admin', value: 'admin' },
          { title: 'Bruker', value: 'user' }
        ]
      },
      validation: (Rule) => Rule.required().error('Rolle er påkrevd'),
      initialValue: 'user'
    }),
    defineField({
      title: 'E-post',
      name: 'email',
      type: 'string',
      validation: (Rule) => Rule.required().error('E-post er påkrevd'),
      fieldset: 'contactInfo'
    }),
    defineField({
      title: 'Telefonnummer',
      name: 'phoneNumber',
      type: 'string',
      validation: (Rule) => Rule.required().error('Telefonnummer er påkrevd'),
      fieldset: 'contactInfo'
    }),
    defineField({
      title: 'Shopify ID',
      name: 'shopifyId',
      type: 'string'
    }),
    defineField({
      title: 'Shopify Status',
      name: 'shopifyStatus',
      type: 'string'
    }),
    defineField({
      title: 'Godkjenning',
      name: 'status',
      type: 'string',
      description: '',
      options: {
        list: [
          { title: 'Godkjenn kunde', value: 'confirm' },
          { title: 'Avslå kunde', value: 'no_status' }
        ],
        layout: 'radio'
      },
      hidden: ({ parent }) => parent.shopifyId !== undefined
    })
  ]
});
