import { apiVersion, dataset, projectId, studioUrl } from '@/lib/sanity/api';
import { createClient } from '@sanity/client/stega';

const excludedFields = ['slug_eu', 'slug_no', 'slug_dk', 'slug_sv', 'video'];

const excludedNestedFields = [
  'padding',
  'hasTopPadding',
  'hasBottomPadding',
  'hasBottomBorder',
  'aspectRatioDesktop',
  'aspectRatioMobile',
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
  'currencyCode'
];

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
  stega: {
    studioUrl,
    filter: (props) => {
      const base = props.sourcePath.at(0);
      const key = props.sourcePath.at(-1);

      if (
        (key && typeof key === 'string' && excludedNestedFields.includes(key)) ||
        (base && typeof base === 'string' && excludedFields.includes(base))
      ) {
        return false;
      }

      if (props.sourcePath.at(-1) === 'title') {
        return true;
      }

      return props.filterDefault(props);
    }
  }
});
