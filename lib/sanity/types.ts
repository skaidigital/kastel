import { productGalleryValidator, sizeGuideValidator } from '@/components/pages/ProductPage/hooks'
import {
  SEOAndSocialsValidator,
  aspectRatioSettingsValidator,
  aspectRatiosValidator,
  authorValidator,
  blogPostCardValidator,
  conditionalLinkValidator,
  faqBlockValidator,
  galleryValidator,
  headingAndLinksValidator,
  hotspotImageValidator,
  imageValidator,
  linkToValidator,
  linkValidator,
  linkWithoutTextValidator,
  mediaValidator,
  optionalImageValidator,
  productCardValidator,
  quoteValidator,
  richTextValidator,
  videoSettingsValidator
} from '@/lib/sanity/validators'
import { z } from 'zod'

export interface PortableText {
  _key: string
}

export type PortableTextProps = z.infer<typeof richTextValidator>

export type LinkToProps = z.infer<typeof linkToValidator>
export type LinkProps = z.infer<typeof linkValidator>
export type LinkWithoutTextProps = z.infer<typeof linkWithoutTextValidator>
export type SanityImageProps = z.infer<typeof imageValidator>
export type OptionalSanityImageProps = z.infer<typeof optionalImageValidator>
export type HeadingAndLinksProps = z.infer<typeof headingAndLinksValidator>

// Product
export type ProductCardProps = z.infer<typeof productCardValidator>

export type SEOAndSocialsProps = z.infer<typeof SEOAndSocialsValidator>

// Product types
export type ProductType = 'SIMPLE' | 'VARIABLE'

export type MobileImageAspectRatio = '9:16' | '3:4'
export type DesktopImageAspectRatio = '16:9' | '4:3' | '21:9'

export type GalleryProps = z.infer<typeof galleryValidator>
export type ProductGalleryProps = z.infer<typeof productGalleryValidator>

export type MediaProps = z.infer<typeof mediaValidator>
export type AspectRatios = z.infer<typeof aspectRatiosValidator>
export type AspectRatioSettingsProps = z.infer<typeof aspectRatioSettingsValidator>
export type ConditionalLinkProps = z.infer<typeof conditionalLinkValidator>
export type HotspotImageProps = z.infer<typeof hotspotImageValidator>
export type VideoSettings = z.infer<typeof videoSettingsValidator>
export type BlogPostCardProps = z.infer<typeof blogPostCardValidator>
export type AuthorProps = z.infer<typeof authorValidator>
export type FAQBlockProps = z.infer<typeof faqBlockValidator>
export type SizeGuideProps = z.infer<typeof sizeGuideValidator>
export type QuoteProps = z.infer<typeof quoteValidator>
