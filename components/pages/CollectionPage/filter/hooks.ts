import { LangValues, MarketValues } from '@/data/constants'
import { groq } from 'next-sanity'
import { z } from 'zod'

// TODO redo to to use lang and not market
export function getFilterQuery(lang: LangValues) {
  const query = groq`
    *[_type == "filters"][0] {
        "items": items[]->{
            "id": _id,
            "title": title.${lang},
            "slug": slug_${lang}.current,
            type,
        }
    }
    `

  return query
}

const FilterGroupValidator = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  type: z.string()
})

export const filterGroupsValidator = z.array(FilterGroupValidator)

export type FilterGroupSchema = z.infer<typeof FilterGroupValidator>

type filterType = 'text' | 'color' | 'size'

export function getFilterItemQuery(
  market: MarketValues,
  type: filterType,
  collectionSlug?: string,
  searchGids?: string[]
) {
  switch (type) {
    case 'text':
      return getTagTypeText(market, collectionSlug, searchGids)
    case 'color':
      return getTagTypeColor(market, collectionSlug, searchGids)
    case 'size':
      return getTagTypeSize(market, collectionSlug, searchGids)
    default:
      return getTagTypeText(market, collectionSlug, searchGids)
  }
}

const collectionFilterFragment = groq`
      && _id in *[_type == "collection" && slug_no.current == $collectionSlug].products[].product->{
        "allTags": tags[]._ref + productType->tags[]._ref
      }.allTags[]`

function searchFilterFragment(market: MarketValues) {
  return groq`
      && _id in *[_type == "product" && gid_${market} in $searchGids]{
        "allTags": tags[]._ref + productType->tags[]._ref
      }.allTags[]`
}

export function getTagTypeText(
  market: MarketValues,
  collectionSlug?: string,
  searchGids?: string[]
) {
  const query = groq`
    *[_type == "tag" && references($parentId) && defined(slug_${market}.current) 
      ${collectionSlug ? collectionFilterFragment : ''}
      ${collectionSlug ? collectionFilterFragment : ''}
      ${searchGids ? searchFilterFragment(market) : ''}
    ] {
        "id": _id,
        "title": title.${market},
        "slug": slug_${market}.current
    }
    `

  return query
}

export function getTagTypeColor(
  market: MarketValues,
  collectionSlug?: string,
  searchGids?: string[]
) {
  const query = groq`
    *[_type == "tag" && references($parentId) && defined(slug_${market}.current) && defined(color) 
    ${collectionSlug ? collectionFilterFragment : ''}
    ${searchGids ? searchFilterFragment(market) : ''}
    ] {
        "id": _id,
        "title": title.${market},
        "slug": slug_${market}.current,
        "color": color->.color.value
    }
    `

  return query
}

export function getTagTypeSize(
  market: MarketValues,
  collectionSlug?: string,
  searchGids?: string[]
) {
  const query = groq`
    *[_type == "tag" && references($parentId) && defined(slug_${market}.current) && defined(size) 
    ${collectionSlug ? collectionFilterFragment : ''}
    ${searchGids ? searchFilterFragment(market) : ''}
     ] {
        "id": _id,
        "title": title.${market},
        "slug": size->slug_${market}.current,
    } | order(title)
    `

  return query
}

// const ColorValidator = z
//   .object({
//     _ref: z.string(),
//     _type: z.string()
//   })
//   .optional()
//   .nullable()

const SizeValidator = z.object({
  _ref: z.string(),
  _type: z.string()
})

// const FilterItemBaseValidator = z.object({
//   id: z.string(),
//   title: z.string()
// });

const FilterItemTextValidator = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string()
})

const FilterItemColorValidator = z.object({
  id: z.string(),
  title: z.string(),
  color: z.string(),
  slug: z.string()
})

const FilterItemSizeValidator = z.object({
  id: z.string(),
  title: z.string(),
  size: SizeValidator
})

export type FilterTextSchema = z.infer<typeof FilterItemTextValidator>
export type FilterColorSchema = z.infer<typeof FilterItemColorValidator>
export type FilterSizeSchema = z.infer<typeof FilterItemSizeValidator>

// export const FilterItemValidator = z.array(
//   z.union([FilterItemTextValidator, FilterItemColorValidator, FilterItemSizeValidator])
// );

const FilterItemValidator = z.object({
  id: z.string(),
  title: z.string(),
  color: z.string().optional().nullable(),
  slug: z.string()
})

export const FilterItemsValidator = z.array(FilterItemValidator)

export type FilterItemSchema = z.infer<typeof FilterItemValidator>
