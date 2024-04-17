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
        "color": color->.color.value
    }
    `;

  return query;
}

export function getTagTypeSize(market: MarketValues) {
  const query = groq`
    *[_type == "tag" && references($parentId)] {
        "id": _id,
        "title": title.${market},
        "slug": size->slug_${market}.current,
    }
    `;

  return query;
}

// _updatedAt: '2024-04-08T17:15:24Z',
// _createdAt: '2024-04-08T07:45:37Z',
// _rev: 'E87k6YxnDWNgIf2QmMFA4j',
// slug_no: { _type: 'slug', current: '36' },
// title: { no: '36', _type: 'i18n.string', en: '36' },
// internalUsedFor: 'Sizes',
// slug_en: { current: '36', _type: 'slug' }

const ColorValidator = z
  .object({
    _ref: z.string(),
    _type: z.string()
  })
  .optional()
  .nullable();

const SizeValidator = z.object({
  _ref: z.string(),
  _type: z.string()
});

// const FilterItemBaseValidator = z.object({
//   id: z.string(),
//   title: z.string()
// });

const FilterItemTextValidator = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string()
});

const FilterItemColorValidator = z.object({
  id: z.string(),
  title: z.string(),
  color: z.string(),
  slug: z.string()
});

const FilterItemSizeValidator = z.object({
  id: z.string(),
  title: z.string(),
  size: SizeValidator
});

export type FilterTextSchema = z.infer<typeof FilterItemTextValidator>;
export type FilterColorSchema = z.infer<typeof FilterItemColorValidator>;
export type FilterSizeSchema = z.infer<typeof FilterItemSizeValidator>;

// export const FilterItemValidator = z.array(
//   z.union([FilterItemTextValidator, FilterItemColorValidator, FilterItemSizeValidator])
// );

const FilterItemValidator = z.object({
  id: z.string(),
  title: z.string(),
  color: z.string().optional().nullable(),
  slug: z.string()
});

export const FilterItemsValidator = z.array(FilterItemValidator);

export type FilterItemSchema = z.infer<typeof FilterItemValidator>;
