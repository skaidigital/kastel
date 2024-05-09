import { MARKETS } from '@/data/constants';
import {
  i18nField,
  i18nNumber,
  i18nString,
  skuIsUniqueForSchemaType
} from '@/lib/sanity/studioUtils';
import { Sneaker } from '@phosphor-icons/react';
import { SanityDocument, groq } from 'next-sanity';
import { defineField, defineType } from 'sanity';

export const productVariant = defineType({
  title: 'Produktvariant',
  name: 'productVariant',
  type: 'document',
  icon: Sneaker,
  fieldsets: [
    {
      name: 'shopify',
      title: 'Shopify info',
      options: {
        collapsible: true,
        collapsed: true,
        columns: 2
      }
    },
    {
      name: 'price',
      title: 'Price',
      options: {
        columns: 2
      }
    }
  ],
  groups: [
    {
      name: 'shared',
      title: 'Shared',
      icon: () => '🙌',
      default: true
    },
    ...MARKETS.map((market) => ({
      name: market.id,
      title: market.name,
      icon: () => market.flag
    }))
  ],
  preview: {
    select: {
      title: 'title',
      option1: 'option1.title.en',
      option2: 'option2.title.en',
      option3: 'option3.title.en',
      parentTitle: 'parentProduct'
    },
    prepare({ option1, option2, option3, parentTitle }) {
      return {
        title: `${option1 ? option1 : ''} ${option2 ? option2 : ''} ${option3 ? option3 : ''}`
        // subtitle: parentTitle ? parentTitle : 'Product not set'
      };
    }
  },
  fields: [
    ...i18nField({
      title: 'Hide in shop',
      name: 'hideInShop',
      type: 'boolean',
      initialValue: false
    }),
    ...i18nNumber({
      title: 'Price',
      name: 'price',
      fieldset: 'price',
      validation: (Rule) => Rule.required()
    }),
    ...i18nNumber({
      title: 'Discounted price',
      name: 'discountedPrice',
      fieldset: 'price'
    }),
    ...i18nString({
      title: 'Gid',
      name: 'gid',
      fieldset: 'shopify'
      // readOnly: true
      // readOnly: readOnlyUnlessDeveloper || true
      // validation: (Rule) => Rule.required() //! Rework validation based on status?
    }),
    defineField({
      title: 'Product',
      name: 'parentProduct',
      type: 'reference',
      to: { type: 'product' },
      group: 'shared',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Option 1',
      name: 'option1',
      type: 'reference',
      to: [{ type: 'productOption' }],
      validation: (Rule) => Rule.required(),
      group: 'shared',
      options: {
        filter: async ({ document, getClient }) => {
          const client = getClient({ apiVersion: '2024-01-08' });

          const newFilter = await getOptionFilter({
            client,
            document,
            optionNumber: 1
          });

          return newFilter;
        }
      }
    }),
    defineField({
      title: 'Option 2',
      name: 'option2',
      type: 'reference',
      to: [{ type: 'productOption' }],
      group: 'shared',
      validation: (Rule) =>
        Rule.custom(async (value, context: any) => {
          const client = context.getClient({ apiVersion: '2024-01-08' });
          const parentId = context.document.parentProduct?._ref;

          const parentHasTwoOptions = await client.fetch(
            `*[_id == "${parentId}"][0].options[1].optionType._ref`
          );

          if (!value && parentHasTwoOptions) {
            return 'This field is required';
          }

          return true;
        }),
      options: {
        filter: async ({ document, getClient }) => {
          const client = getClient({ apiVersion: '2024-01-08' });

          const newFilter = await getOptionFilter({
            client,
            document,
            optionNumber: 2
          });

          return newFilter;
        }
      }
    }),
    defineField({
      title: 'Option 3',
      name: 'option3',
      type: 'reference',
      to: [{ type: 'productOption' }],
      group: 'shared',
      validation: (Rule) =>
        Rule.custom(async (value, context: any) => {
          const client = context.getClient({ apiVersion: '2024-01-08' });
          const parentId = context.document.parentProduct?._ref;

          const parentHasThreeOptions = await client.fetch(
            `*[_id == "${parentId}"][0].options[2].optionType._ref`
          );

          if (!value && parentHasThreeOptions) {
            return 'This field is required';
          }

          return true;
        }),
      options: {
        filter: async ({ document, getClient }) => {
          const client = getClient({ apiVersion: '2024-01-08' });

          const newFilter = await getOptionFilter({
            client,
            document,
            optionNumber: 3
          });

          return newFilter;
        }
      }
    }),
    defineField({
      title: 'SKU',
      name: 'sku',
      type: 'string',
      group: 'shared',
      validation: (Rule) =>
        Rule.custom(async (value, context: any) => {
          if (!value) {
            return 'This field is required';
          }

          const result = await skuIsUniqueForSchemaType({
            sku: value || '',
            schemaType: 'productVariant',
            context
          });

          if (!result) {
            return 'SKU must be unique';
          }

          return result;
        })
    }),
    defineField({
      title: 'Barcode',
      name: 'barcode',
      type: 'string',
      group: 'shared'
    })
  ],
  orderings: [
    {
      name: 'titleAsc',
      title: 'Title (A-Z)',
      by: [{ field: 'option1.title.en', direction: 'asc' }]
    },
    {
      name: 'titleDesc',
      title: 'Title (Z-A)',
      by: [{ field: 'option1.title.en', direction: 'desc' }]
    },
    {
      name: 'priceDesc',
      title: 'Price (Highest first)',
      by: [{ field: 'price_no', direction: 'desc' }]
    },
    {
      name: 'priceAsc',
      title: 'Price (Lowest first)',
      by: [{ field: 'price_no', direction: 'asc' }]
    }
  ]
});

interface ParentProductOption {
  ref: string;
  options?: {
    _ref: string;
  }[];
}

interface ParentProductOptions {
  option1: ParentProductOption;
  option2: ParentProductOption;
  option3: ParentProductOption;
}

interface OptionFilterProps {
  client: any;
  document: SanityDocument;
  optionNumber: number;
}

interface Variant {
  option1?: string;
  option2?: string;
  option3?: string;
}

async function getOptionFilter({ client, document, optionNumber }: OptionFilterProps) {
  // Fetch parent product options
  const parent: ParentProductOptions = await client.fetch(
    groq`*[_id == "${document.parentProduct?._ref}"][0]{
      "option1": {
        "ref": options[0].optionType._ref,
        "options": options[0].options
      },
      "option2": {
        "ref": options[1].optionType._ref,
        "options": options[1].options
      },
      "option3": {
        "ref": options[2].optionType._ref,
        "options": options[2].options
      }
    }`
  );

  const currentVariant: ParentProductOptions = {
    option1: {
      ref: document?.option1?._ref
    },
    option2: {
      ref: document?.option2?._ref
    },
    option3: {
      ref: document?.option3?._ref
    }
  };

  const optionKey = `option${optionNumber}` as keyof ParentProductOptions;

  // Access the option from the parent
  const parentOption = parent[optionKey];

  // Retrieve valid options from the parent option
  const validOptionRefs = parentOption.options?.map((option) => option._ref);

  // Construct the filter
  const filter = `type._ref == "${
    parentOption.ref
  }" && (_id in [${validOptionRefs?.map((o: string) => `"${o}"`)}])`;

  const numSetOptionsInParent = ['option1', 'option2', 'option3'].filter(
    (key) => parent[key as keyof ParentProductOptions]?.ref != null
  ).length;

  const numSelectedOptionsInVariant = ['option1', 'option2', 'option3'].filter(
    (key) => currentVariant[key as keyof ParentProductOptions]?.ref != null
  ).length;

  const isLastChoice = numSetOptionsInParent === numSelectedOptionsInVariant + 1;

  if (isLastChoice) {
    const currentDocumentId = document._id.replace('drafts.', '');
    // Fetch variants with the same options as the current variant
    const allVariants = await client.fetch(
      groq`*[_type == "productVariant" && references("${document.parentProduct?._ref}") && _id != "${currentDocumentId}" && !(_id in path("drafts.**"))]{
        _id,
        "option1": option1._ref,
        "option2": option2._ref,
        "option3": option3._ref
      }`
    );

    // Collect references of already selected options in the current variant
    const uniqueFilter = findUniquePermutation(
      allVariants,
      currentVariant,
      validOptionRefs,
      optionNumber,
      numSetOptionsInParent
    );

    // const filter = `type._ref == "${
    //   parentOption.ref
    // }" && (_id in [${validOptionRefs?.map(
    //   (o: string) => `"${o}"`
    // )}] && !(_id in [${allVariants.map((o: any) => `"${o.option1}"`)}]))`;
    // const filter = `type._ref == "${
    //   parentOption.ref
    // }" && (_id in [${uniqueFilter?.map((o: string) => `"${o}"`)}]`;

    const filter = `type._ref == "${
      parentOption.ref
    }" && (_id in [${uniqueFilter?.map((o: string) => `"${o}"`)}])`;

    return {
      filter
    };
  }
  return { filter };
}

function findUniquePermutation(
  allVariants: Variant[], // Array of all variants
  // TODO bring currentVariant type but make sure it passes TS check
  // currentVariant: ParentProductOptions, // The current variant being edited or created
  currentVariant: any, // The current variant being edited or created
  validOptionRefs: string[] | undefined, // The valid options for the current selection
  optionNumber: number, // The option number being selected (1, 2, or 3)
  numberOfOptions: number // Total number of options available in the parent
) {
  if (!validOptionRefs) {
    return [];
  }

  const filter = validOptionRefs.filter((optionRef) => {
    return !allVariants.some((variant: any) => {
      let matches = 0;

      for (let i = 1; i <= numberOfOptions; i++) {
        if (i !== optionNumber) {
          // Skip the current option
          if (variant[`option${i}`] === currentVariant[`option${i}`]?.ref) {
            matches++;
          }
        }
      }

      return matches === numberOfOptions - 1 && variant[`option${optionNumber}`] === optionRef;
    });
  });

  return filter;
}
