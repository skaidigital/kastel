import PageBuilderModal from '@/components/sanity/PageBuilderModal';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const alternativeText = defineType({
  title: 'Descriptive text for screen readers and search engines',
  description: 'Optional but highly reccommended to make the content more accessible',
  name: 'altText',
  type: 'i18n.string'
});

export const internalTitle = defineType({
  title: 'Internal title',
  name: 'internalTitle',
  description: 'This title is only visible in Sanity',
  type: 'string',
  validation: (Rule) => Rule.required()
});

export const title = defineType({
  title: 'Tittel',
  name: 'title',
  type: 'string',
  validation: (Rule) => Rule.required()
});

export const ogImage = defineType({
  title: 'Open Graph Image',
  description: 'Displayed on social cards and search engine results.',
  name: 'ogImage',
  type: 'image',
  options: {
    hotspot: true
  },
  validation: (Rule) => Rule.required()
});

export const figure = defineType({
  title: 'Image',
  name: 'figure',
  type: 'image',
  options: {
    hotspot: true
  },
  fields: [
    defineField({
      title: 'Descriptive text for screen readers and search engines',
      type: 'altText',
      name: 'altText'
    })
  ]
});

export const padding = defineType({
  title: 'Padding',
  name: 'padding',
  type: 'string',
  initialValue: 'lg',
  validation: (Rule) => Rule.required(),
  options: {
    list: [
      { title: 'Small', value: 'sm' },
      { title: 'Medium', value: 'md' },
      { title: 'Large', value: 'lg' }
    ]
  }
});

export const topPadding = defineType({
  title: 'Top padding',
  name: 'hasTopPadding',
  type: 'boolean',
  initialValue: true,
  validation: (Rule) => Rule.required()
});

export const bottomPadding = defineType({
  title: 'Bottom padding',
  name: 'hasBottomPadding',
  type: 'boolean',
  initialValue: true,
  validation: (Rule) => Rule.required()
});

export const bottomBorder = defineType({
  title: 'Bottom border',
  name: 'hasBottomBorder',
  type: 'boolean',
  initialValue: true,
  validation: (Rule) => Rule.required()
});

export const gallery = defineType({
  title: 'Gallery',
  name: 'gallery',
  type: 'array',
  of: [
    {
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        defineField({
          title: 'Descriptive text for screen readers and search engines',
          type: 'altText',
          name: 'altText'
        })
      ]
    }
  ],
  options: {
    layout: 'grid'
  }
});

export const pageBuilder = defineType({
  title: 'Page builder',
  name: 'pageBuilder',
  type: 'array',
  components: {
    input: PageBuilderModal
  },
  of: [
    // Hero
    defineArrayMember({
      title: 'Hero',
      type: 'hero'
    }),
    // Page title
    defineArrayMember({
      title: 'Page title',
      type: 'pageTitle'
    }),
    // Full width media section
    // USP + Shoe
    // Shoe picker
    defineArrayMember({
      title: 'Shoe picker',
      type: 'reference',
      to: [{ type: 'shoePicker' }],
      name: 'shoePicker'
    }),
    // Nature Lab explanation
    defineArrayMember({
      title: 'Nature Lab explainer',
      type: 'reference',
      to: [{ type: 'natureLabExplainer' }],
      name: 'natureLabExplainer'
    }),
    // Shop our models
    defineArrayMember({
      title: 'Shop our models',
      type: 'reference',
      to: [{ type: 'shopOurModels' }],
      name: 'shopOurModels'
    }),
    // UGCs
    defineArrayMember({
      title: 'UGC section',
      type: 'reference',
      to: [{ type: 'UGCSection' }],
      name: 'ugcs'
    }),
    // Featured shoe

    // Featured collection
    defineArrayMember({
      title: 'Featured collection',
      type: 'featuredCollection'
    }),
    // Card section
    defineArrayMember({
      title: 'Card section',
      type: 'reference',
      to: [{ type: 'cardSection' }],
      name: 'cardSection'
    }),
    // Blog posts
    defineArrayMember({
      title: 'Blog posts',
      type: 'blogPosts'
    }),
    // Kastel Club
    defineArrayMember({
      title: 'Kastel Club',
      type: 'reference',
      to: [{ type: 'kastelClub' }],
      name: 'kastelClub'
    }),
    // Timeline
    // FAQ section
    defineArrayMember({
      title: 'FAQ section',
      type: 'reference',
      to: [{ type: 'faqSection' }]
    }),
    // Text section
    defineArrayMember({
      title: 'Text section',
      type: 'textSection'
    }),
    // Contact form
    defineArrayMember({
      title: 'Contact form',
      type: 'contactForm'
    }),
    // Email capture
    defineArrayMember({
      title: 'Email capture',
      type: 'emailCapture'
    })
  ]
});
