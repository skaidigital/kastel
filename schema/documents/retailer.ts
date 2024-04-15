import { Storefront } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const retailer = defineType({
  title: 'Retailer',
  name: 'retailer',
  type: 'document',
  icon: Storefront,
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Address',
      name: 'address',
      type: 'address',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Website URL (optional)',
      name: 'websiteUrl',
      type: 'url'
    })
  ]
});
