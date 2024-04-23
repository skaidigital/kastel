import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { Check, Gear } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const productSettings = defineType({
  title: 'Product settings',
  name: 'productSettings',
  type: 'document',
  icon: Gear,
  preview: {
    prepare() {
      return {
        title: 'Product settings',
        subtitle: 'Product settings'
      };
    }
  },
  fields: [
    defineField({
      title: 'FAQs',
      name: 'faqs',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'question' }] }],
      validation: (Rule) => Rule.required().min(1).max(20)
    }),
    defineField({
      title: 'Regular product USPs',
      description:
        "These USPs is showed in the carousel below the add to cart button on the product page alongside the 'Earn x Kastel Club points' text. Add 1-5 items",
      name: 'productUsps',
      type: 'array',
      validation: (Rule) => Rule.required().min(1).max(4),
      of: [
        {
          type: 'object',
          icon: Check,
          preview: {
            select: {
              title: 'usp.en'
            }
          },
          fields: [
            defineField({
              title: 'USP',
              name: 'usp',
              type: 'i18n.string',
              validation: validateAllStringTranslations
            })
          ]
        }
      ]
    }),
    defineField({
      title: 'Nature Lab product USPs',
      description:
        "These USPs is showed in the carousel below the add to cart button on the product page alongside the 'Earn x Kastel Club points' text. Add 1-5 items",
      name: 'natureLabProductUsps',
      type: 'array',
      validation: (Rule) => Rule.required().min(1).max(4),
      of: [
        {
          type: 'object',
          icon: Check,
          preview: {
            select: {
              title: 'usp.en'
            }
          },
          fields: [
            defineField({
              title: 'USP',
              name: 'usp',
              type: 'i18n.string',
              validation: validateAllStringTranslations
            })
          ]
        }
      ]
    })
  ]
});
