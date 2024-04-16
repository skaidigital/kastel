import { MarketValues } from '@/data/constants';
import { groq } from 'next-sanity';

export const slug = groq`"slug": slug.current`;

export function getSlug(market: MarketValues) {
  return groq`"slug": slug_${market}.current`;
}

export const base = groq`
  "type": _type,
  "key": _key
`;

export const image = groq`
  image{
    asset->{
      ...,
      metadata
    }
  }
`;

export const video = 'videoMobile.asset->.playbackId';

export function getImageBase(market: MarketValues) {
  return groq`
  asset->{
    "_ref": _id,
    metadata{
      lqip
    }
  },
  "altText": altText.${market},
  crop,
  hotspot
`;
}

export function getGallery(market: MarketValues) {
  return groq`
  "gallery": gallery[]{
    asset->{
      "_ref": _id,
      crop,
      hotspot,
      metadata{
        lqip
      },
    },
    "altText": altText.${market},
    crop,
    hotspot,
    width
  }
`;
}

export function getRichText({
  market,
  fieldName = 'richText'
}: {
  market: MarketValues;
  fieldName?: string;
}) {
  return groq`
  ${fieldName}_${market}[]{
    ...,
    markDefs[]{
      ...,
      _type == "inlineLink" => {
        link{
          ${getLinkWithoutText(market)}
        }
      }
    },
    _type == "figure" => {
      ...,
      asset->{
        ...,
        metadata
      },
    },
    _type == "video" => {
      "videoUrl": asset->.playbackId,
    }
  }
`;
}

export const linkTo = groq`
  "linkTo": linkTo->{
    "type": _type,
    "slug": slug.current,
  }
`;

export const getLinkTo = (market: MarketValues) => groq`
  "linkTo": linkTo->{
    "type": _type,
    "slug": slug_${market}.current,
  }
`;

export const simpleLink = groq`
  "type": _type,
  "linkType": type,
  text,
  type == "internal" => {
    ${linkTo}
  },
  type == "external" => {
    href,
    openInNewTab
  }
`;

export function getLink(market: MarketValues) {
  return groq`
  "type": _type,
  hasLink,
  "linkType": type,
  "text": text.${market},
  type == "internal" => {
    ${getLinkTo(market)}
  },
  type == "external" => {
    href,
    openInNewTab
  }
`;
}

// TODO its own object and expanded with hasLink. See to merge these later. Also uses i18n.string so _ is replaced with . for the text
export function getLinkHero(market: MarketValues) {
  return groq`
  "linkType": type,
  "text": text.${market},
  hasLink,
  type == "internal" => {
    ${getLinkTo(market)}
  },
  type == "external" => {
    href,
    openInNewTab
  }
`;
}

export function getLinkWithoutText(market: MarketValues) {
  return groq`
  "type": _type,
  "linkType": type,
  href,
  ${getLinkTo(market)}
`;
}

export const metadata = groq`
  metadata {
    metaTitle,
    metaDescription,
    noIndex,
    noFollow
  }
`;

export function getMetadata(market: MarketValues) {
  return groq`
  metadata_${market} {
    metaTitle,
    metaDescription,
    noIndex,
    noFollow
  }
`;
}

export const productLimited = groq`
  "type": _type,
  title,
  ${slug},
  "image": gallery[0]{
    asset->{
    ...,
    }, 
}
`;

export function getProductCard(market: MarketValues) {
  return groq`
  "type": _type,
  "title": title.${market},
  ${getSlug(market)},
  mainImage{
    ${getImageBase(market)}
  },
  lifestyleImage{
    ${getImageBase(market)}
  },
  "badges": badges[]->.title.${market}
`;
}

export const collectionProduct = groq`
  "type": _type,
  "product": product->{
    ${productLimited}
  },
  "replacementImage": replacementImage{
    asset->{
      ...,
    }
  }
`;

export const collectionImage = groq`
  "type": _type,
  "image": ${image},
`;

export function getCard(market: MarketValues) {
  return groq`
  "title": title.${market}, 
  "subtitle": subtitle.${market}, 
  link{
    ${getLinkHero(market)}
  },
  textPositionMobile,
  textPositionDesktop,
  type,
  "video": video.asset->.playbackId,
  image{
    ${getImageBase(market)}
  },
`;
}

export function getMedia(market: MarketValues) {
  return groq`
  type,
  sameAssetForMobileAndDesktop,
  image{
    ${getImageBase(market)}
  },
  'video': video.asset->.playbackId,
  imageMobile{
    ${getImageBase(market)}
  },
  imageDesktop{
    ${getImageBase(market)}
  },
  'videoMobile': videoMobile.asset->.playbackId,
  'videoDesktop': videoDesktop.asset->.playbackId
`;
}

export const sectionSettings = groq`
  padding,
  hasTopPadding,
  hasBottomPadding,
  hasBottomBorder
`;

export const aspectRatioSettings = groq`
  sameAspectRatio,
  aspectRatio,
  aspectRatioMobile,
  aspectRatioDesktop
`;

export function getConditionalLink(market: MarketValues) {
  return groq`
    type,
    hasLink,
    "text": text.${market},
    type == "internal" => {
      ${getLinkTo(market)}
    },
    type == "external" => {
       href
    },
    openInNewTab
`;
}

export function getBlogPostCard(market: MarketValues) {
  return groq`
  "title": title.${market},
  "description": metadata.metaDescription.${market},
  "image": imageMobile{
    ${getImageBase(market)}
  },
  "slug": slug_${market}.current,
  "readLength": coalesce(round(length(pt::text(content + "_" + market)) / 5 / 180 ), 1)
`;
}
