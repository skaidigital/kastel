/* eslint-disable no-unused-vars */
import { FeaturedOptionField } from '@/components/sanity/CustomField';
import { LangValues, MARKETS, MarketValues, SANITY_STUDIO_API_VERSION } from '@/data/constants';
import { groq } from 'next-sanity';
import {
  CurrentUser,
  defineField,
  type BooleanRule,
  type RuleBuilder,
  type SlugValidationContext,
  type StringRule
} from 'sanity';
import type { StructureBuilder } from 'sanity/structure';

export const group = (S: StructureBuilder, title: string, list: any[]) =>
  S.listItem().title(title).child(S.list().title(title).items(list));

export const list = (S: StructureBuilder, title: string, filter: any, params?: any) =>
  S.listItem()
    .title(title)
    .child(
      S.documentList()
        .title(title)
        .apiVersion(SANITY_STUDIO_API_VERSION)
        .filter(filter)
        .params(params)
    );

interface ListNewProps {
  S: StructureBuilder;
  title: string;
  schemaType: string;
}
export const listNew = ({ S, title, schemaType }: ListNewProps) =>
  S.listItem().title(title).child(S.documentTypeList({ schemaType }).title(title));

export const singleton = (S: StructureBuilder, title: string, type: string, id: string) =>
  S.listItem().title(title).id(id).child(S.document().schemaType(type).documentId(id));

export function resolveHref(documentType?: string, slug?: string): string | undefined {
  switch (documentType) {
    case 'page':
      return slug ? `/no/no/${slug}` : undefined;
    case 'product':
      return slug ? `/no/no/products/${slug}` : undefined;
    case 'collection':
      return slug ? `/no/no/collections/${slug}` : undefined;
    case 'legalPage':
      return slug ? `/no/no/legal/${slug}` : undefined;
    case 'blogPost':
      return slug ? `/no/no/blog/${slug}` : undefined;
    default:
      console.warn('Invalid document type:', documentType);
      return undefined;
  }
}

export function filterAlreadyAddedReferences(filter: any) {
  const thisObject = filter.parent;
  const parentRefs = thisObject?.map((item: any) => item._ref);
  const parentRefsWithoutUndefined = parentRefs.filter((item: any) => item !== undefined);

  return {
    filter: '!(_id in $selectedItems)',
    params: {
      selectedItems: parentRefsWithoutUndefined
    }
  };
}

export const validateAllStringTranslations = (Rule: any) =>
  Rule.custom((value: any) => {
    const hasNo = value?.no;
    const hasEn = value?.en;

    if (!hasNo || !hasEn) {
      return [
        !hasNo && { message: 'You must provide a Norwegian translation', paths: ['no'] },
        !hasEn && { message: 'You must provide an English translation', paths: ['en'] }
      ].filter(Boolean);
    }
    return true;
  });

export const readOnlyUnlessDeveloper = ({ currentUser }: any) =>
  !currentUser?.roles.some((role: any) => role.name === 'developer');

export const hiddenUnlessDeveloper = ({ currentUser }: any) =>
  !currentUser?.roles.some((role: any) => role.name === 'developer');

interface Props {
  title: string;
  name: string;
  type: string;
  validation?: any;
  hidden?: any;
  initialValue?: any;
  fieldset?: string;
  options?: any;
  description?: string;
  readOnly?: boolean;
  rows?: number;
}

// TODO hent options fra Sanity field i stedet
// TODO expand validation to make sure it hits the right field. For example with content in announcementBanner where we have a boolean we check
// TODO Make i18nStirng, i18n, etc? instead
export function i18nField({
  title,
  name,
  type,
  hidden,
  options,
  fieldset,
  initialValue,
  description,
  validation,
  readOnly,
  rows
}: Props) {
  return MARKETS.map((market) =>
    defineField({
      title,
      name: `${name}_${market.id}`,
      type,
      group: market.id,
      options,
      fieldset,
      description,
      hidden,
      ...(type === 'text' && { rows }),
      initialValue,
      validation,
      readOnly: ({ currentUser }) =>
        readOnly && readOnlyUnlessDeveloper(currentUser) ? true : false
    })
  );
}

interface i18nStringProps {
  title: string;
  name: string;
  // eslint-disable-next-line no-unused-vars
  validation?: (rule: StringRule) => RuleBuilder<StringRule, string>;
  hidden?: any;
  initialValue?: any;
  fieldset?: string;
  options?: any;
  description?: string;
  activeValidation?: boolean;
  readOnly?: boolean;
}

export function i18nString({
  title,
  name,
  hidden,
  options,
  fieldset,
  initialValue,
  description,
  validation,
  readOnly
}: i18nStringProps) {
  return MARKETS.map((market) =>
    defineField({
      title,
      name: `${name}_${market.id}`,
      type: 'string',
      group: market.id,
      options,
      fieldset,
      description,
      hidden,
      initialValue,
      validation,
      readOnly: ({ currentUser }) =>
        readOnly && readOnlyUnlessDeveloper(currentUser) ? true : false
    })
  );
}

interface i18nNumberProps {
  title: string;
  name: string;
  validation?: (Rule: BooleanRule) => RuleBuilder<BooleanRule, boolean> | any;
  hidden?: any;
  initialValue?: any;
  fieldset?: string;
  options?: any;
  description?: string;
  activeValidation?: boolean;
  readOnly?: boolean;
}

export function i18nNumber({
  title,
  name,
  hidden,
  options,
  fieldset,
  initialValue,
  description,
  validation,
  readOnly
}: i18nNumberProps) {
  return MARKETS.map((market) =>
    defineField({
      title,
      name: `${name}_${market.id}`,
      type: 'number',
      group: market.id,
      options,
      fieldset,
      description,
      hidden,
      initialValue,
      validation,
      readOnly: ({ currentUser }) =>
        readOnly && readOnlyUnlessDeveloper(currentUser) ? true : false
    })
  );
}

export function i18nSlug({ schemaType, validation }: { schemaType: string; validation?: any }) {
  return MARKETS.map((market) =>
    defineField({
      type: 'slug',
      name: `slug_${market.id}`,
      group: market.id,
      validation,
      title: 'Slug',
      hidden: (context: any) => {
        const thisSlug = context.document[`slug_${market.id}`]?.current;

        if (thisSlug === 'home') {
          return true;
        }

        return false;
      },
      options: {
        source: `title_${market.id}`,
        isUnique: (slug, context) =>
          slugIsUniqueForMarketAndSchemaType({
            slug,
            schemaType,
            market: market.id,
            context
          })
      }
    })
  );
}

export function i18nfeaturedOptions() {
  return MARKETS.map((market) =>
    defineField({
      title: 'Featured options',
      name: `featuredOptions_${market.id}`,
      type: 'array',
      group: market.id,
      components: {
        field: FeaturedOptionField
      },
      of: [
        defineField({
          title: 'Featured option',
          name: 'featuredOption',
          type: 'reference',
          to: [{ type: 'productOption' }],
          options: {
            filter: ({ document, parentPath }: any) => {
              const availableOptions = document.options
                ?.map((option: any) => option.options.map((o: any) => o._ref))
                .flat();

              const exsistingOptions = document[parentPath[0]].map((o: any) => o._ref);

              const filteredid = availableOptions.filter(
                (id: any) => !exsistingOptions.includes(id)
              );

              const filter = `_id in $ids`;
              const params = {
                ids: filteredid
              };

              return {
                filter,
                params
              };
            }
          }
        })
      ]
    })
  );
}

interface SlugIsUniqueForMarketAndSchemaTypeProps {
  slug: string;
  schemaType: string;
  market: MarketValues;
  context: SlugValidationContext;
}

export async function slugIsUniqueForMarketAndSchemaType({
  slug,
  schemaType,
  market,
  context
}: SlugIsUniqueForMarketAndSchemaTypeProps) {
  const { document, getClient } = context;

  const client = getClient({ apiVersion: '2022-12-07' });
  const id = document?._id?.replace(/^drafts\./, '');
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
    type: schemaType
  };
  const query = groq`!defined(*[!(_id in [$draft, $published]) && slug_${market}.current == $slug && _type == $type][0]._id)`;
  const result = await client.fetch(query, params);

  return result;
}

interface SlugIsUniqueForLangAndSchemaTypeProps {
  slug: string;
  schemaType: string;
  lang: LangValues;
  context: SlugValidationContext;
}

export async function slugIsUniqueForLangAndSchemaType({
  slug,
  schemaType,
  lang,
  context
}: SlugIsUniqueForLangAndSchemaTypeProps) {
  const { document, getClient } = context;

  const client = getClient({ apiVersion: '2022-12-07' });
  const id = document?._id?.replace(/^drafts\./, '');
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
    type: schemaType
  };
  const query = groq`!defined(*[!(_id in [$draft, $published]) && slug_${lang}.current == $slug && _type == $type][0]._id)`;
  const result = await client.fetch(query, params);

  return result;
}

interface SlugIsUniqueForSchemaTypeProps {
  slug: string;
  schemaType: string;
  context: SlugValidationContext;
}

export async function slugIsUniqueForSchemaType({
  slug,
  schemaType,
  context
}: SlugIsUniqueForSchemaTypeProps) {
  const { document, getClient } = context;

  const client = getClient({ apiVersion: '2022-12-07' });
  const id = document?._id?.replace(/^drafts\./, '');
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
    type: schemaType
  };
  const query = groq`!defined(*[!(_id in [$draft, $published]) && slug.current == $slug && _type == $type][0]._id)`;
  const result = await client.fetch(query, params);

  return result;
}

interface SkuIsUniqueForSchemaTypeProps {
  sku: string;
  schemaType: string;
  context: any;
}

export async function skuIsUniqueForSchemaType({
  sku,
  schemaType,
  context
}: SkuIsUniqueForSchemaTypeProps) {
  const { document, getClient } = context;

  const client = getClient({ apiVersion: '2022-12-07' });
  const id = document?._id?.replace(/^drafts\./, '');
  const params = {
    draft: `drafts.${id}`,
    published: id,
    sku,
    type: schemaType
  };
  const query = groq`!defined(*[!(_id in [$draft, $published]) && sku == $sku && _type == $type][0]._id)`;
  const result = await client.fetch(query, params);

  return result;
}

export function checkActiveMarket(market: MarketValues, activeMarkets: MarketValues[]) {
  return activeMarkets.includes(market);
}

export function randomKey(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function onlyEditableByAdmin(currentUser: CurrentUser) {
  const isAdmin = currentUser?.roles?.some((role) => role.name === 'administrator');

  return !isAdmin;
}

export const isActiveProductValidation = (Rule: any) =>
  Rule.custom((value: any, context: any) => {
    const { parent, path } = context;

    const marketId = path[0].split('_')[1]; // Assuming the first part of the path denotes the market ID
    const statusField = `status_${marketId}`;
    const isProductActive = parent[statusField] === 'ACTIVE';

    if (!isProductActive) {
      return true;
    }

    if ((!value || value.length === 0) && isProductActive) {
      return 'Market ' + marketId + ' is active, this field is required.';
    }
    return true;
  });

export const hiddenBasedOnLink = ({ parent }: { parent: any }) => !parent?.hasLink;

export const validateLinkType = (Rule: any) =>
  Rule.custom((field: any, context: any) => {
    const hasLink = context.parent?.hasLink;

    if (hasLink && !field) {
      return 'This field is required';
    }

    return true;
  });
