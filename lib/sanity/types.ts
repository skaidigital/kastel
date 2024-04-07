import {
  SEOAndSocialsValidator,
  galleryValidator,
  headingAndLinksValidator,
  imageValidator,
  linkToValidator,
  linkValidator,
  linkWithoutTextValidator,
  loginFormValidator,
  productCardValidator,
  richTextValidator
} from '@/lib/sanity/validators';
import { z } from 'zod';

export interface PortableText {
  _key: string;
}

export type PortableTextProps = z.infer<typeof richTextValidator>;

export type LinkToProps = z.infer<typeof linkToValidator>;
export type LinkProps = z.infer<typeof linkValidator>;
export type LinkWithoutTextProps = z.infer<typeof linkWithoutTextValidator>;
export type SanityImageProps = z.infer<typeof imageValidator>;
export type HeadingAndLinksProps = z.infer<typeof headingAndLinksValidator>;

// Product
export type ProductCardProps = z.infer<typeof productCardValidator>;

export type SEOAndSocialsProps = z.infer<typeof SEOAndSocialsValidator>;

// # Pages
export type LoginFormProps = z.infer<typeof loginFormValidator>;

// Product types
export type ProductType = 'SIMPLE' | 'VARIABLE';

export type MobileImageAspectRatio = '9:16' | '3:4';
export type DesktopImageAspectRatio = '16:9' | '4:3' | '21:9';

export type GalleryProps = z.infer<typeof galleryValidator>;
