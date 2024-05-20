import { LangValues, MarketValues } from '@/data/constants';
import {
  aspectRatioSettings,
  getAuthor,
  getBlogPostCard,
  getHotspotImage,
  getImageBase,
  getLinkWithoutText,
  getMedia,
  getProductCard,
  getQuote
} from '@/lib/sanity/fragments';
import {
  aspectRatiosValidator,
  authorValidator,
  blogPostCardValidator,
  imageValidator,
  portableTextValidator
} from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

const blogWidthValidator = z.union([z.literal('normal'), z.literal('wide')]);

const mostRecentBlogPosts = z.object({
  type: z.literal('mostRecent'),
  posts: z.array(blogPostCardValidator)
});

const selectedBlogPosts = z.object({
  type: z.literal('selected'),
  title: z.string(),
  buttonText: z.string(),
  posts: z.array(blogPostCardValidator)
});

const blogPostsValidator = z.discriminatedUnion('type', [mostRecentBlogPosts, selectedBlogPosts]);

export const blogPostValidator = z.object({
  id: z.string(),
  type: z.literal('blogPost'),
  title: z.string(),
  readTime: z.string(),
  author: authorValidator,
  aspectRatioMobile: aspectRatiosValidator,
  aspectRatioDesktop: aspectRatiosValidator,
  imageMobile: imageValidator,
  imageDesktop: imageValidator,
  blogPosts: blogPostsValidator,
  content: portableTextValidator
});

export type BlogWidth = z.infer<typeof blogWidthValidator>;
export type BlogPostsProps = z.infer<typeof blogPostsValidator>;
export type BlogPostPayload = z.infer<typeof blogPostValidator>;

export function getBlogPostQuery({ lang, market }: { lang: LangValues; market: MarketValues }) {
  const query = groq`
    *[_type == "blogPost" && slug_${lang}.current == $slug][0] {
      "id": _id,
      "type": _type,
      "title": title.${lang},
      "readTime": coalesce(round(length(pt::text(content + "_" + market)) / 5 / 180 ), 1),
      "author": author->{
        ${getAuthor(lang)}
      },
      aspectRatioMobile,
      aspectRatioDesktop,
      imageMobile{
        ${getImageBase(lang)}
      },
      imageDesktop{
        ${getImageBase(lang)}
      },
      "blogPosts": blogPostReccommendedBlogPosts{
        type,
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
            ...,
            _type == "inlineLink" => {
              link{
                ${getLinkWithoutText(lang)}
              }
            },
            _type == "productLink" => {
              product->{
                ${getProductCard(lang, market)}
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
            aspectRatioSettings{
              ${aspectRatioSettings}
            },
            width
          },
          _type == "hotspotImage" => {
            "image": image->{
              ${getHotspotImage(lang, market)}
            },
            aspectRatioSettings{
              ${aspectRatioSettings}
            },
          },
          _type == "products" => {
            "title": title.${lang},
            "products": products[]->{
              ${getProductCard(lang, market)}
            },
          },
          _type == "quote" => {
            ...@->{
              ${getQuote(lang)}
            },
          },
          _type == "standout" => {
            type,
            content,
            "backgroundColor": backgroundColor->color.value,
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
                ${getProductCard(lang, market)}
              }
            }
          }
        }
      }
  `;

  return query;
}
