import { defineType } from 'sanity';

export const settingsCompany = defineType({
  title: 'Company',
  name: 'settingsCompany',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'Company'
      };
    }
  },
  fields: [
    // defineField({
    //   title: 'Company name',
    //   name: 'name',
    //   type: 'string',
    // }),
    // defineField({
    //   title: 'Phone number',
    //   name: 'phoneNumber',
    //   type: 'string',
    // }),
    // defineField({
    //   title: 'Email',
    //   name: 'email',
    //   type: 'string',
    // }),
    // defineField({
    //   title: 'Logo',
    //   name: 'logo',
    //   type: 'image',
    // }),
    // defineField({
    //   title: 'Do you have a phyiscal location?',
    //   name: 'hasPhysicalLocation',
    //   type: 'boolean',
    //   initialValue: false,
    // }),
    // defineField({
    //   title: 'Visit address',
    //   name: 'visitAddress',
    //   type: 'address',
    // TODO find out what the type is for the document
    // hidden: (document: SanityDocument) =>
    //   document.hasPhysicalLocation !== true,
    // }),
  ]
});
