/* eslint-disable no-unused-vars */
import { MarketValues, SITE_URLS } from '@/data/constants';
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
