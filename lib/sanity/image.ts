import { client } from '@/lib/sanity/client';
import { SanityImageProps } from '@/lib/sanity/types';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

export function urlForImage(source: SanityImageProps) {
  return builder.image(source);
}
