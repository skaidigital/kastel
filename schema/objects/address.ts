import { defineField, defineType } from 'sanity';

export const address = defineType({
  title: 'Address',
  name: 'address',
  type: 'object',
  fieldsets: [
    {
      title: 'Address',
      name: 'address',
      options: {
        columns: 2
      }
    }
  ],
  fields: [
    defineField({
      title: 'Address 1',
      name: 'address1',
      type: 'string',
      fieldset: 'address',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.document.differentInvoiceAddress && !value) {
            return 'Gateadresse er påkrevd';
          }
          return true;
        })
    }),
    defineField({
      title: 'Address 2',
      name: 'address2',
      type: 'string',
      fieldset: 'address'
    }),
    defineField({
      title: 'Zip',
      name: 'zip',
      type: 'string',
      fieldset: 'address',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.document.differentInvoiceAddress && !value) {
            return 'Postnummer er påkrevd';
          }
          return true;
        })
    }),
    defineField({
      title: 'City',
      name: 'city',
      type: 'string',
      fieldset: 'address',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.document.differentInvoiceAddress && !value) {
            return 'By / Sted er påkrevd';
          }
          return true;
        })
    }),
    defineField({
      title: 'Country',
      name: 'country',
      type: 'string',
      fieldset: 'address',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.document.differentInvoiceAddress && !value) {
            return 'Land er påkrevd';
          }
          return true;
        })
    }),
    defineField({
      title: 'Phone number',
      name: 'phoneNumber',
      type: 'string',
      fieldset: 'address',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.document.differentInvoiceAddress && !value) {
            return 'Telefonnummer er påkrevd';
          }
          return true;
        })
    })
  ]
});
