import PageBuilderModal from '@/components/sanity/PageBuilderModal';
import { MARKETS } from '@/data/constants';
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

export const blogWidthSettings = defineType({
  title: 'Width',
  name: 'blogWidthSettings',
  type: 'string',
  options: {
    layout: 'radio',
    list: [
      { title: 'Normal', value: 'normal' },
      { title: 'Wide', value: 'wide' }
    ]
  },
  initialValue: 'normal',
  validation: (Rule) => Rule.required()
});

export const videoSettings = defineType({
  title: 'Video settings',
  name: 'videoSettings',
  type: 'object',
  fields: [
    defineField({
      title: 'Autoplay',
      name: 'autoPlay',
      type: 'boolean',
      initialValue: true
    })
  ],
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
      name: 'hero',
      type: 'hero'
    }),
    // USP Explainer
    defineArrayMember({
      title: 'USP Explainer section',
      type: 'uspExplainerSection',
      name: 'uspExplainerSection'
    }),
    // Shoe picker
    defineArrayMember({
      title: 'Shoe picker section',
      type: 'shoePickerSection',
      name: 'shoePicker'
    }),
    // Nature Lab explanation
    defineArrayMember({
      title: 'Nature Lab explainer',
      type: 'natureLabExplainerSection',
      name: 'natureLabExplainerSection'
    }),
    // Shop our models
    defineArrayMember({
      title: 'Shop Our Models section',
      type: 'shopOurModelsSection',
      name: 'shopOurModelsSection'
    }),
    // UGCs
    defineArrayMember({
      title: 'UGC section',
      type: 'ugcSection',
      name: 'ugcSection'
    }),
    // Featured shoe
    defineArrayMember({
      title: 'Featured Shoe section',
      type: 'featuredShoeSection',
      name: 'featuredShoeSection'
    }),
    // Featured collection
    defineArrayMember({
      title: 'Featured collection',
      name: 'featuredCollectionSection',
      type: 'featuredCollectionSection'
    }),
    // Full bleed media section
    defineArrayMember({
      title: 'Full bleed media section',
      type: 'fullBleedMediaSection',
      name: 'fullBleedMediaSection'
    }),
    // Card section
    defineArrayMember({
      title: 'Card section',
      type: 'cardSection',
      name: 'cardSection'
    }),
    // Nature Lab Innovation item (only for productType and product)
    defineArrayMember({
      title: '🚧 Nature Lab Innovations',
      name: 'natureLabInnovationSection',
      type: 'natureLabInnovationSection'
    }),
    // Blog posts
    defineArrayMember({
      title: 'Blog posts',
      type: 'blogPostSection',
      name: 'blogPostSection'
    }),
    // Kastel Club
    defineArrayMember({
      title: 'Kastel Club section',
      type: 'kastelClubSection',
      name: 'kastelClubSection'
    }),
    // Timeline
    defineArrayMember({
      title: '🚧 Timeline',
      type: 'timelineSection',
      name: 'timelineSection'
    }),
    // FAQ section
    defineArrayMember({
      title: 'FAQ section',
      type: 'faqSection',
      name: 'faqSection'
    }),
    // Email capture
    defineArrayMember({
      title: 'Email capture',
      type: 'emailCapture'
    })
  ]
});

export const marketAvailability = defineType({
  title: 'Disable / Hide this block from specific markets (optional)',
  description: 'Select the markets where this section should be hidden',
  name: 'marketAvailability',
  type: 'array',
  of: [
    {
      type: 'string',
      options: {
        list: MARKETS.map((market) => ({
          title: market.name,
          value: market.id
        }))
      }
    }
  ]
});
