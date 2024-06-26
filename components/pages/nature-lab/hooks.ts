import { LangValues, MarketValues } from '@/data/constants'
import { getImageBase, getLinkWithoutText, getProductCard, getQuote } from '@/lib/sanity/fragments'
import { groq } from 'next-sanity'

export function getNatureLabPortableText({
  lang,
  market
}: { lang: LangValues; market: MarketValues }) {
  return groq`
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
        _type == "video" => {
            "videoUrl": asset->.playbackId,
            "aspectRatio": asset->.data.aspect_ratio,
        },
        _type == "products" => {
        "title": titleProducts.${lang},
        "products": products[]->{
            ${getProductCard(lang, market)}
        },
        },
        _type == "products" => {
        "title": title,
        "products": products[]->{
            ${getProductCard(lang, market)}
        },
        },
        _type == "quote" => {
        ...@->{
            ${getQuote(lang)}
        }
        }
    `
}
