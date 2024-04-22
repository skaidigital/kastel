import { LangValues, MarketValues } from '@/data/constants';
import { groq } from 'next-sanity';

export const slug = groq`"slug": slug.current`;

export function getSlug(lang: LangValues) {
  return groq`"slug": slug_${lang}.current`;
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

export function getImageBase(lang: LangValues) {
  return groq`
  asset->{
    "_ref": _id,
    metadata{
      lqip
    }
  },
  "altText": altText.${lang},
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

export function getGalleryMale(market: MarketValues) {
  return groq`
  "gallery": galleryMale[]{
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

export function getGalleryFemale(market: MarketValues) {
  return groq`
  "gallery": galleryFemale[]{
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
  lang,
  fieldName = 'richText'
}: {
  lang: LangValues;
  fieldName?: string;
}) {
  return groq`
  ${fieldName}_${lang}[]{
    ...,
    markDefs[]{
      ...,
      _type == "inlineLink" => {
        link{
          ${getLinkWithoutText(lang)}
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

export const getLinkTo = (lang: LangValues) => groq`
  "linkTo": linkTo->{
    "type": _type,
    "slug": slug_${lang}.current,
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

export function getLink(lang: LangValues) {
  return groq`
  "type": _type,
  hasLink,
  "linkType": type,
  "text": text.${lang},
  type == "internal" => {
    ${getLinkTo(lang)}
  },
  type == "external" => {
    href,
    openInNewTab
  }
`;
}

// TODO its own object and expanded with hasLink. See to merge these later. Also uses i18n.string so _ is replaced with . for the text
export function getLinkHero(lang: LangValues) {
  return groq`
  "linkType": type,
  "text": text.${lang},
  hasLink,
  type == "internal" => {
    ${getLinkTo(lang)}
  },
  type == "external" => {
    href,
    openInNewTab
  }
`;
}

export function getLinkWithoutText(lang: LangValues) {
  return groq`
  "type": _type,
  "linkType": type,
  href,
  ${getLinkTo(lang)}
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

export function getProductCard(lang: LangValues) {
  return groq`
  "type": _type,
  "title": title.${lang},
  ${getSlug(lang)},
  mainImage{
    ${getImageBase(lang)}
  },
  lifestyleImage{
    ${getImageBase(lang)}
  },
  "badges": badges[]->.title.${lang}
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

export function getCard(lang: LangValues) {
  return groq`
  "title": title.${lang}, 
  "subtitle": subtitle.${lang}, 
  link{
    ${getLinkHero(lang)}
  },
  textPositionMobile,
  textPositionDesktop,
  type,
  "video": video.asset->.playbackId,
  image{
    ${getImageBase(lang)}
  },
`;
}

export function getMedia(lang: LangValues) {
  return groq`
  type,
  sameAssetForMobileAndDesktop,
  image{
    ${getImageBase(lang)}
  },
  'video': video.asset->.playbackId,
  imageMobile{
    ${getImageBase(lang)}
  },
  imageDesktop{
    ${getImageBase(lang)}
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

export function getConditionalLink(lang: LangValues) {
  return groq`
    type,
    hasLink,
    "text": text.${lang},
    type == "internal" => {
      ${getLinkTo(lang)}
    },
    type == "external" => {
       href
    },
    openInNewTab
`;
}

export function getBlogPostCard(lang: LangValues) {
  return groq`
  "title": title.${lang},
  "description": metadata.metaDescription.${lang},
  "image": imageMobile{
    ${getImageBase(lang)}
  },
  "slug": slug_${lang}.current,
  "readLength": coalesce(round(length(pt::text(content + "_" + market)) / 5 / 180 ), 1)
`;
}

export function getHotspotImage(lang: LangValues) {
  return groq`
  "type": _type,
  image{
    ${getImageBase(lang)}
  },
  hotspots[]{
    ...select(
      type == "text" => {
        type,
        "description": description.${lang},
      },
      type == "productCard" => {
        "type": "product",
        ...product->{
          ${getProductCard(lang)}
        },
      },
    ),
    x,
    y,
  }
  `;
}

export const buttonSettings = groq`
  variant
`;

export function getFAQBlock(lang: LangValues) {
  return groq`
  "title": title.${lang},
  "description": description.${lang},
  "badge": badge->title.${lang},
  "items": items[]->{
    "question": question.${lang},
    "answer": answer_${lang}
  }
  `;
}
