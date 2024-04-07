'use server';

import { getDictionary } from '@/app/dictionaries';
import { Heading } from '@/components/base/Heading';
import { Text } from '@/components/base/Text';
import { ConfiguratorColorSelect } from '@/components/pages/ConfiguratorPage/ConfiguratorButton';
import { ConfiguratorDrawer } from '@/components/pages/ConfiguratorPage/ConfiguratorDrawer';
import {
  getConfiguratorLastStepQuery,
  getConfiguratorStepQuery,
  getConfiguratorStepsQuery,
  getConfiguratorSuccessStepQuery
} from '@/components/pages/ConfiguratorPage/hooks';
import { MarketValues } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { loadQuery } from '@/lib/sanity/store';
import { isProductVariantInStock } from '@/lib/shopify/queries';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';

interface ConfiguratorStepProps {
  step: string | string[];
}

function loadConfiguratorStep(step: string, market: MarketValues) {
  const query = getConfiguratorStepQuery(step, market);

  return loadQuery<any>(query, {}, { next: { tags: [`configuratorStep:${step},${market}`] } });
}

export async function ConfiguratorStep({ step }: ConfiguratorStepProps) {
  if (!step) return null;
  const configStep = String(Number(step) - 1);
  const market = await getMarket();
  const initial = await loadConfiguratorStep(configStep, market);
  const { configurator } = await getDictionary();

  const { productArray, title, stepSlug } = initial?.data.configurationSteps;

  return (
    <div className="my-12 w-full lg:my-20">
      <Heading as="h2" size="md" className="mb-12 hidden text-center lg:block">
        {configurator.pick} {title}
      </Heading>
      {productArray.map((product: any, index: number) => {
        return (
          <ConfiguratorColorSelect
            key={product.title}
            title={product.title}
            color={product.color}
            slug={product.slug}
            stepNumber={index}
            type={stepSlug}
          />
        );
      })}
    </div>
  );
}

interface LastConfirguratorStepProps {
  params: { [key: string]: string | string[] | undefined };
  title: string;
}

function loadConfiguratorSteps(cacheKey: string, market: MarketValues) {
  const query = getConfiguratorStepsQuery(market);

  return loadQuery<any>(query, {}, { next: { tags: [`configuratorStep:${cacheKey},${market}`] } });
}

export async function LastConfiguratorStep({ params, title }: LastConfirguratorStepProps) {
  if (!params) return null;

  const arrayFromParams = Object.entries(params).map(([key, value]) => ({ key, value }));

  // remove if key is variants or step
  arrayFromParams.forEach((item, index) => {
    if (item.key === 'variants' || item.key === 'step') {
      arrayFromParams.splice(index, 1);
    }
  });
  const market = await getMarket();
  const cacheKey = arrayFromParams.map((item) => item.value).join(',');
  const initial = await loadConfiguratorSteps(cacheKey, market);

  // Order arrayFromParams by initial.data.configurationSteps
  const orderedArray = initial.data.configurationSteps.map((step: any) => {
    return arrayFromParams.find((item: any) => item?.key === step.stepSlug);
  });

  return (
    <div className="my-12 w-full lg:my-20">
      <Heading as="h2" size="md" className="mb-12 hidden text-center lg:block">
        {title || 'backup'}
      </Heading>
      {initial &&
        arrayFromParams.length > 0 &&
        orderedArray.map((nodes: any, index: number) => {
          return (
            <LastConfiguratorStepSelector
              key={nodes.key}
              optionKey={nodes.key}
              optionValue={nodes.value}
              index={index}
            />
          );
        })}
    </div>
  );
}

interface loadConfiguratorLastStepSelectorProps {
  optionKey: string;
  optionValue: string;
  index: number;
}

function loadConfiguratorLastStepSelector(step: string, market: MarketValues, optionValue: string) {
  const query = getConfiguratorLastStepQuery(step, market);

  return loadQuery<any>(
    query,
    {},
    { next: { tags: [`lastConfiguratorStep:${step},${market},${optionValue}`] } }
  );
}

export async function LastConfiguratorStepSelector({
  optionKey,
  optionValue,
  index
}: loadConfiguratorLastStepSelectorProps) {
  if (!optionValue || optionKey === 'step') return null;
  const configStep = String(Number(index));
  const market = await getMarket();

  const initial = await loadConfiguratorLastStepSelector(configStep, market, optionValue);
  const { configurator } = await getDictionary();

  const currentOption = initial.data.configurationSteps.productArray.find(
    (option: any) => option.slug === optionValue
  );

  const variants = currentOption?.variants.map((variant: any) => variant.gid) || [];

  const inStockItems = await Promise.all(
    variants.map(async (variantId: string) => {
      const isInstock = await isProductVariantInStock(variantId);
      return { ...isInstock, variantId };
    })
  );

  const title = configurator.size_picker;

  return (
    <div className="border-1 mb-2  flex h-12 w-full items-center justify-between border">
      <Text size="eyebrow" className="ml-4">
        {currentOption.title}
      </Text>
      <ConfiguratorDrawer
        step={index}
        option={currentOption}
        title={title}
        inStockItems={inStockItems}
      />
    </div>
  );
}

function loadConfiguratorSuccessStep(market: MarketValues) {
  const query = getConfiguratorSuccessStepQuery(market);

  return loadQuery<any>(query, {}, { next: { tags: [`configuratorStep:success,${market}`] } });
}

export async function ConfiguratorSuccessStep() {
  const market = await getMarket();
  const initial = await loadConfiguratorSuccessStep(market);

  const { configurator, not_found_page } = await getDictionary();

  return (
    <div className="flex h-full w-full flex-col justify-center gap-y-3 px-6 text-center">
      <Heading className="">{configurator.success_title}</Heading>
      <Text className="self-center lg:max-w-56">
        <PortableText value={initial.data.content} />
      </Text>
      {/* Add button back to frontpage */}
      <Link
        href="/"
        className="border-1 rounded-brand focus-visible:ring-ring transition-brand inline-flex h-[42px] w-full items-center justify-center bg-brand-dark-grey text-[12px] font-medium uppercase leading-[12px] tracking-[2.4px] text-white transition-all focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
      >
        {not_found_page.back_to_home}
      </Link>
    </div>
  );
}
