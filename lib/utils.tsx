/* eslint-disable no-unused-vars */
import { LangValues, MarketValues, SITE_URLS, SORT_OPTIONS } from '@/data/constants';
import { AspectRatios } from '@/lib/sanity/types';
import { CheckIcon, ClockIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx, { ClassValue } from 'clsx';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const createPageURL = ({
  pageNumber,
  searchParams,
  pathname
}: {
  pageNumber: number | string;
  searchParams: URLSearchParams | ReadonlyURLSearchParams;
  pathname: string;
}) => {
  const params = new URLSearchParams(searchParams);

  if (pageNumber === 1) {
    params.delete('page');
    return `${pathname}?${params.toString()}`;
  }
  params.set('page', pageNumber.toString());
  return `${pathname}?${params.toString()}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString('nb-NO', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  });
}

export function getMarketFlag(market: MarketValues) {
  switch (market) {
    case 'no':
      return '🇳🇴';
    case 'sv':
      return '🇸🇪';
    default:
      throw new Error(`Unknown market: ${market}`);
  }
}

export function getLangFlag(lang: LangValues) {
  switch (lang) {
    case 'no':
      return '🇳🇴';
    case 'en':
      return '🇬🇧';
    default:
      throw new Error(`Unknown lang: ${lang}`);
  }
}

export function getAspectRatioString(ratio: AspectRatios) {
  switch (ratio) {
    case '16:9':
      return 'aspect-w-16 aspect-h-9';
    case '4:3':
      return 'aspect-w-4 aspect-h-3';
    case '21:9':
      return 'aspect-w-[21] aspect-h-9';
    case '9:16':
      return 'aspect-w-9 aspect-h-16';
    case '3:4':
      return 'aspect-w-3 aspect-h-4';
    default:
      return 'aspect-w-16 aspect-h-9';
  }
}

export function getAspectRatioStringDesktop(ratio: AspectRatios) {
  switch (ratio) {
    case '16:9':
      return 'lg:aspect-w-16 lg:aspect-h-9';
    case '4:3':
      return 'lg:aspect-w-4 lg:aspect-h-3';
    case '21:9':
      return 'lg:aspect-w-[21] lg:aspect-h-9';
    case '9:16':
      return 'lg:aspect-w-9 lg:aspect-h-16';
    case '3:4':
      return 'lg:aspect-w-3 lg:aspect-h-4';
    default:
      return 'lg:aspect-w-16 lg:aspect-h-9';
  }
}

export function getMarketAndLang(country: string) {
  switch (country) {
    case 'NO':
      return SITE_URLS.no;
    case 'SV':
      return SITE_URLS.sv;
    default:
      return SITE_URLS.no;
  }
}

export function capitalizeFirstLetter(string: string) {
  const loweCased = string.toLowerCase();
  const firstLetter = loweCased.charAt(0).toUpperCase();
  const rest = loweCased.slice(1);

  return firstLetter + rest;
}

// ! Should probably just be a part of the badge
export function getOrderIcon(variant: string) {
  switch (variant) {
    case 'orderDanger':
      return <XMarkIcon className="h-3 w-3" />;
    case 'orderPending':
      return <ClockIcon className="h-3 w-3" />;
    case 'orderSuccess':
      return <CheckIcon className="h-3 w-3" />;
    default:
      return <ClockIcon className="h-3 w-3" />;
  }
}

export function getSortOptions(lang: LangValues) {
  const sortOptions = SORT_OPTIONS[lang];

  return sortOptions;
}
