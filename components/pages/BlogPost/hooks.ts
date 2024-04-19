import { LangValues } from '@/data/constants';
import {
  aspectRatioSettings,
  getAuthor,
  getBlogPostCard,
  getHotspotImage,
  getImageBase,
  getLinkWithoutText,
  getMedia,
  getProductCard,
  videoSettings
} from '@/lib/sanity/fragments';
import {
  authorValidator,
  blogPostCardValidator,
  portableTextValidator
} from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

const blogWidthValidator = z.union([z.literal('normal'), z.literal('wide')]);
const blogPostsValidator = z.object({
  title: z.string(),
  buttonText: z.string(),
  posts: z.array(blogPostCardValidator)
});

export const blogPostValidator = z.object({
  id: z.string(),
  type: z.literal('blogPost'),
  blogPosts: blogPostsValidator,
  author: authorValidator,
  content: portableTextValidator
});

export type BlogWidth = z.infer<typeof blogWidthValidator>;
export type BlogPostsProps = z.infer<typeof blogPostsValidator>;
export type BlogPostPayload = z.infer<typeof blogPostValidator>;

export function getBlogPostQuery({ lang }: { lang: LangValues }) {
  const query = groq`
    *[_type == "blogPost" && slug_${lang}.current == $slug][0] {
      "id": _id,
      "type": _type,
      "author": author->{
        ${getAuthor(lang)}
      },
      "blogPosts": reccommendedBlogPosts{
        "title": title.${lang},
        "buttonText": buttonText.${lang},
        "posts": select(
          type == "mostRecent" => *[_type == "blogPost" && defined(slug_${lang}.current)][0..2] | order(publishedAt desc){
            ${getBlogPostCard(lang)}
          },
          type == "selected" => posts[]->{
            ${getBlogPostCard(lang)}
          }
        ),
      },
      "content": content_${lang}[]{
          ...,
          markDefs[]{
            _type == "inlineLink" => {
              link{
                ${getLinkWithoutText(lang)}
              }
            },
            _type == "productLink" => {
              product->{
                ${getProductCard(lang)}
              }
            }
          },
          _type == "image" => {
            ${getImageBase(lang)},
            width
          },
          _type == "imageGrid" => {
            images[]{
              ${getImageBase(lang)},
              "caption": caption.${lang},
              aspectRatioSettings{
                ${aspectRatioSettings}
              },
              width
            }
          },
          _type == "video" => {
            "videoUrl": video.asset->.playbackId,
            "aspectRatio": video.asset->.data.aspect_ratio,
            videoSettings{
              ${videoSettings},
            },
            width
          },
          _type == "hotspotImage" => {
            ...@->{
              ${getHotspotImage(lang)}
            }
          },
          _type == "standout" => {
            type,
            content,
            type == "media" => {
              media{
                ${getMedia(lang)},
              },
              aspectRatioSettings{
                ${aspectRatioSettings}
              },
            },
            type == "product" => {
              product->{
                ${getProductCard(lang)}
              }
            }
          }
        }
      }
  `;

  return query;
}
