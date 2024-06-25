import { apiVersion, dataset, projectId, studioUrl } from '@/lib/sanity/api'
import { createClient } from 'next-sanity'

const excludedFields = ['slug_en', 'slug_no', 'slug_sv', 'slug', 'video', 'color', 'hexCode']

const excludedNestedFields = [
  'textPlacementMobile',
  'textPlacementDesktop',
  'slug_no',
  'slug_en',
  'slug_sv',
  'padding',
  'hasTopPadding',
  'firstImage',
  'hasBottomPadding',
  'hasBottomBorder',
  'sameAspectRatio',
  'aspectRatio',
  'aspectRatioMobile',
  'aspectRatioDesktop',
  'textPositionMobile',
  'imageOrVideo',
  'image',
  'imageMobile',
  'imageDesktop',
  'playbackId',
  'video',
  'videoMobile',
  'videoDesktop',
  'videoUrlMobile',
  'videoUrlDesktop',
  'imageLeftOrRight',
  'size',
  'text',
  'textPlacement',
  'currencyCode',
  'type',
  'color',
  'isColor',
  'hexCode',
  'slug',
  'width'
]

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
  stega: {
    studioUrl,
    filter: (props) => {
      const base = props.sourcePath.at(0)
      const key = props.sourcePath.at(-1)

      if (
        (key && typeof key === 'string' && excludedNestedFields.includes(key)) ||
        (base && typeof base === 'string' && excludedFields.includes(base))
      ) {
        return false
      }

      if (props.sourcePath.at(-1) === 'title') {
        return true
      }

      return props.filterDefault(props)
    }
  }
})
