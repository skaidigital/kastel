import { MarketValues } from '@/data/constants';
import { groq } from 'next-sanity';
import { z } from 'zod';

export function getFilterQuery(market: MarketValues) {
  const query = groq`
    *[_type == "filters"][0] {
        "items": items[]->{
            "id": _id,
            "title": title.${market},
            "slug": slug_${market}.current,
            type,
        }
    }
    `;

  return query;
}

const FilterGroupValidator = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  type: z.string()
});

export const FilterGroupsValidator = z.array(FilterGroupValidator);
export type FilterGroupSchema = z.infer<typeof FilterGroupValidator>;

type filterType = 'text' | 'color' | 'size';

export function getFilterItemQuery(market: MarketValues, type: filterType) {
  switch (type) {
    case 'text':
      return getTagTypeText(market);
    case 'color':
      return getTagTypeColor(market);
    case 'size':
      return getTagTypeSize(market);
    default:
      return getTagTypeText(market);
  }
}

export function getTagTypeText(market: MarketValues) {
  const query = groq`
    *[_type == "tag" && references($parentId)] {
        "id": _id,
        "title": title.${market},
        "slug": slug_${market}.current
    }
    `;

  return query;
}

export function getTagTypeColor(market: MarketValues) {
  const query = groq`
    *[_type == "tag" && references($parentId)] {
        "id": _id,
        "title": title.${market},
        "slug": slug_${market}.current,
        color
    }
    `;

  return query;
}

export function getTagTypeSize(market: MarketValues) {
  const query = groq`
    *[_type == "tag" && references($parentId)] {
        "id": _id,
        "title": title.${market},
        "slug": slug_${market}.current,
        size
    }
    `;

  return query;
}

const ColorValidator = z
  .object({
    _ref: z.string(),
    _type: z.string()
  })
  .optional()
  .nullable();

const SizeValidator = z
  .object({
    _ref: z.string(),
    _type: z.string()
  })
  .optional()
  .nullable();

const FilterItemBaseValidator = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string().optional().nullable()
});

const FilterItemColorValidator = FilterItemBaseValidator.extend({
  color: ColorValidator
});

const FilterItemSizeValidator = FilterItemBaseValidator.extend({
  size: SizeValidator
});

export type FilterTextSchema = z.infer<typeof FilterItemBaseValidator>;
export type FilterColorSchema = z.infer<typeof FilterItemColorValidator>;
export type FilterSizeSchema = z.infer<typeof FilterItemSizeValidator>;

export const FilterItemValidator = z.union([
  z.array(FilterItemBaseValidator),
  z.array(FilterItemColorValidator),
  z.array(FilterItemSizeValidator)
]);
