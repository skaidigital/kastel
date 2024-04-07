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
  title: 'Bilde',
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

// TODO add warning if alt text is not set
// TODO make i18n for alt text
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
        }),
        defineField({
          title: 'Width',
          name: 'width',
          type: 'string',
          initialValue: '1-COL',
          options: {
            list: [
              { title: '1 column on desktop', value: '1-COL' },
              { title: '2 columns on desktop', value: '2-COL' }
            ]
          }
        })
      ]
    }
  ],
  options: {
    layout: 'grid'
  }
});

export const pageBuilder = defineType({
  title: 'Sidebygger',
  name: 'pageBuilder',
  type: 'array',
  components: {
    input: PageBuilderModal
  },
  of: [
    defineArrayMember({
      title: 'Page title',
      type: 'pageTitle'
    }),
    defineArrayMember({
      title: 'Hero',
      type: 'hero'
    }),
    defineArrayMember({
      title: 'Featured product',
      type: 'featuredProduct'
    }),
    defineArrayMember({
      title: 'Accordion section',
      type: 'accordionSection'
    }),
    defineArrayMember({
      title: 'Text + Image',
      type: 'reference',
      name: 'textAndImage',
      to: [{ type: 'textAndImage' }]
    }),
    defineArrayMember({
      title: 'Text section',
      type: 'textSection'
    }),
    defineArrayMember({
      title: 'Product listing',
      type: 'productListing'
    }),
    defineArrayMember({
      title: 'Collection listing',
      type: 'collectionListing'
    }),
    defineArrayMember({
      title: 'Card grid',
      type: 'cardGrid'
    }),
    defineArrayMember({
      title: 'Contact form',
      type: 'contactForm'
    }),
    defineArrayMember({
      title: 'Instagram feed',
      type: 'instagramFeed'
    })
  ]
});
