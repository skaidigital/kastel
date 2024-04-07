import { validateAllStringTranslations } from '@/lib/sanity/studioUtils';
import { MapPin } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const storeLocator = defineType({
  title: 'Store locator',
  name: 'storeLocator',
  type: 'document',
  icon: MapPin,
  preview: {
    prepare() {
      return {
        title: 'Store locator',
        subtitle: 'Singleton'
      };
    }
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'i18n.string',
      validation: validateAllStringTranslations
    })
  ]
});
