import { InstagramLogo } from '@phosphor-icons/react';
import { defineField, defineType } from 'sanity';

export const instagramFeed = defineType({
  title: 'Instagram feed',
  name: 'instagramFeed',
  type: 'object',
  icon: InstagramLogo,
  preview: {
    prepare() {
      return {
        title: 'Instagram feed',
        subtitle: 'Instagram feed',
        icon: InstagramLogo
      };
    }
  },
  fields: [
    defineField({
      title: 'Show feed?',
      name: 'isShown',
      type: 'boolean',
      initialValue: true,
      hidden: true
    })
  ]
});
