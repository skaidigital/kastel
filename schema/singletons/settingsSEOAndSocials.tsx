import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { defineField, defineType } from 'sanity';

// TODO figure out what more to put here
export const settingsSEOAndSocials = defineType({
  title: 'SEO & Socials',
  name: 'settingsSEOAndSocials',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'Default settings for SEO and Social Sharing'
      };
    }
  },
  fields: [
    defineField({
      title: 'What is this?',
      description:
        'Here you can set the default SEO and social sharing settings for the site. These settings will be used as default values for all pages, unless they are overridden on the page itself.',
      name: 'myCustomNote',
      type: 'note',
      options: {
        tone: 'positive'
      }
    }),
    defineField({
      title: 'Meta title',
      name: 'metaTitle',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      title: 'Meta description',
      name: 'metaDescription',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    }),
    defineField({
      type: 'ogImage',
      name: 'ogImage'
    })
  ]
});
