import { AspectRatios } from '@/lib/sanity/types';

// Routes
export const ROUTES = {
  HOME: '/',
  ACCOUNT: '/account',
  WISHLIST: '/account/wishlist',
  ACCOUNT_CUSTOMER_SERVICE: '/account/customer-service',
  HELP_CENTER: '/help-center',
  LEGAL: '/legal',
  ADDRESSES: '/account/addresses',
  CREATE_ADDRESS: '/account/addresses/create',
  EDIT_ADDRESS: '/account/addresses/:id/edit',
  PRODUCTS: '/products',
  COLLECTIONS: '/collections',
  ORDERS: '/account/orders',
  ORDER_DETAILS: '/account/orders',
  BLOG: '/blog',
  SHOP_ALL: '/shop/all',
  KASTEL_CLUB: '/kastel-club',
  REGISTER_ACCOUNT: '/register-account',
  RESET_PASSWORD: '/reset-password',
  SHOP: '/shop',
  STORE_LOCATOR: '/stores'
};

export const CACHE_TAGS = {
  CART: 'cart',
  WISHLIST_PRODUCTS: 'wishlist-products',
  HELP_CENTER: 'help-center',
  CUSTOMER_ADDRESS: 'customer-address',
  ANNOUNCEMENT_BANNER: 'announcement-banner',
  USPS: 'unique-selling-points',
  MERCHANDISING: 'merchandising',
  NOT_FOUND_PAGE: 'pageNotFound',
  PRODUCT: 'product:',
  BLOG_LANDING_PAGE: 'blogLandingPage',
  BLOG_POST: 'blogPost:',
  PAYMENT_PROVIDERS: 'paymentProviders',
  NAVBAR: 'navbar',
  FOOTER: 'footer',
  POPUP: 'popup',
  LAYOUT_USP_MARUQEE: 'layoutUSPMarquee',
  METADATA: 'settingsSEOAndSocials',
  COOKIE_CONSENT: 'cookieConsent',
  PRODUCT_SETTINGS: 'productSettings'
};

export const SCHEMA_NAMES = {
  PAGE: 'page',
  PRODUCT: 'product',
  COLLECTION: 'collection'
};

export const EMAILS = {
  CONTACT: 'support@kastelshoes.com'
};

export const ANALTYICS_EVENT_NAME = {
  ADD_TO_CART: 'add_to_cart',
  GO_TO_CHECKOUT: 'go_to_checkout',
  CONSENT: 'consent'
};

export const COOKIE_NAMES = {
  SHOPIFY: {
    ACCESS_TOKEN: 'shopify_access_token',
    REFRESH_TOKEN: 'shopify_refresh_token',
    EXPIRES_IN: 'shopify_expires_in',
    ID_TOKEN: 'shopify_id_token',
    EMAIL: 'shopify_email'
  },
  COOKIE_CONSENT: 'CookieConsent',
  POPUP: 'has_seen_popup',
  REQUEST_COUNTRY: 'request_country',
  RECCOMMENDED_MARKET: 'reccommended_market',
  HAS_CHOSEN_MARKET: 'has_chosen_market',
  MARKET: 'market',
  PREVIEW_MARKET: 'previewMarket',
  PREVIEW_LANG: 'previewLang',
  SHOE_PICKER_ACTIVE_TYPE_NAME: 'shoe_picker_active_type_name',
  CUSTOMER_EMAIL: 'customer_email'
};

export const TEMPLATES = {
  SHOPIFY: {
    ORDER: 'gid://shopify/Order'
  }
};

export const API_ROUTES = {
  base: {
    LOGIN: '/api/login'
  },
  shopify: {
    RESET_PASSWORD: '/api/shopify/reset-password',
    ACTIVATE_CUSTOMER: '/api/shopify/customerActivate'
  }
};

export const LOGIN = {
  error_codes: {
    multiple_users: 'multiple_users',
    no_users: 'no_users'
  }
};

export const SANITY_SINGLETON_DOCUMENT_IDS = {
  GENERAL_SETTINGS: 'settingsGeneral',
  USPS: 'usps',
  NOT_FOUND_PAGE: 'pageNotFound'
};

export const HOME_ROUTE = '/';
export const ACCOUNT_ROUTE = '/account';

export const IGNORED_PAGE_IDS = ['homePage'];

// Slugs
export const HOME_SLUG = 'home';

export const FALLBACK_LOCALE = 'eu';

export type Market = {
  id: MarketValues;
  name: string;
  flag: string;
};
export type Lang = {
  id: LangValues;
  name: string;
  flag: string;
};

export type MarketValues = 'no' | 'sv';
export type LangValues = 'en' | 'no';

export const FALLBACK_MARKET: MarketValues = 'no';
export const FALLBACK_LANG: LangValues = 'no';

export const MARKET: Record<MarketValues, Market> = {
  no: { id: 'no', name: 'Norway', flag: '🇧🇻' },
  sv: { id: 'sv', name: 'Sweden', flag: '🇸🇪' }
};
export const MARKETS = Object.values(MARKET);

export const LANG: Record<LangValues, Lang> = {
  en: { id: 'en', name: 'English', flag: '🇬🇧' },
  no: { id: 'no', name: 'Norsk', flag: '🇧🇻' }
};
export const LANGS = Object.values(LANG);

export const DEFAULT_CURRENCY_CODE = 'NOK';

export const SITE_URLS: Record<MarketValues, string> = {
  no: '/no/no/',
  sv: '/sv/en/'
};

// type ProductType = Record<'SIMPLE', 'simple'> | Record<'VARIABLE', 'variable'>;

// export const PRODUCT_TYPES: ProductTypeValues[] = [
//   {
//     name: 'Simple',
//     id: 'SIMPLE',
//   },
//   {
//     name: 'Variable',
//     id: 'VARIABLE',
//   },
// ];

// Product type

export const COLLECTION_PAGE_SIZE = 20;

export const ACCOUNT_PAGE_ORDERS_PAGE_SIZE = 10;

type ProductTypeName = 'simple' | 'variable';

type ProductTypeValues = {
  name: string;
  id: string;
};

export const PRODUCT_TYPE: Record<ProductTypeName, ProductTypeValues> = {
  simple: { name: 'Simple', id: 'SIMPLE' },
  variable: { name: 'Variable', id: 'VARIABLE' }
};

export const PRODUCT_TYPES = Object.values(PRODUCT_TYPE);

// Product options

// export type ProductOptionName = 'color' | 'size' | 'text';
export type ProductOptionName = 'size' | 'text';

type ProductOptionValues = {
  name: string;
  id: ProductOptionName;
};

export const PRODUCT_OPTION: Record<ProductOptionName, ProductOptionValues> = {
  size: { name: 'Size', id: 'size' },
  text: { name: 'Text', id: 'text' }
};

export const PRODUCT_OPTIONS = Object.values(PRODUCT_OPTION);

export type TagTypeName = 'size' | 'color' | 'text';

type TagValues = {
  name: string;
  id: TagTypeName;
};

export const TAG_TYPE: Record<TagTypeName, TagValues> = {
  size: { name: 'Size', id: 'size' },
  color: { name: 'Color', id: 'color' },
  text: { name: 'Text', id: 'text' }
};

export const TAG_OPTIONS = Object.values(TAG_TYPE);

export const SKAI_URL = 'https://skaidigital.com';

export const METAFIELDS = {
  product: {
    sanityId: {
      namespace: 'skai',
      key: 'sanityId'
    }
  },
  customer: {
    wishlist: {
      namespace: 'skai',
      key: 'wishlist',
      type: 'list.product_reference'
    },
    customer_data: {
      namespace: 'skai',
      key: 'customer_data',
      type: 'json'
    }
  }
};

export const SANITY_STUDIO_API_VERSION = 'v2023-08-01';

export const HEADLESS_PUBLICATION_ID = 'gid://shopify/Publication/211462553912';

export const SMILE_DEEP_LINKS = {
  home: 'home',
  points_activity_rules: 'points_activity_rules',
  points_products: 'points_products',
  referral_program_details: 'referral_program_details'
} as const;

export type SmileDeepLinks = (typeof SMILE_DEEP_LINKS)[keyof typeof SMILE_DEEP_LINKS];

export const URL_STATE_KEYS = {
  sort: 'sort',
  view: 'view',
  page: 'page',
  search: 'q',
  onSale: 'on_sale'
};
export const ASPECT_RATIOS: { title: AspectRatios; value: AspectRatios }[] = [
  { title: '16:9', value: '16:9' },
  { title: '4:3', value: '4:3' },
  { title: '21:9', value: '21:9' },
  { title: '9:16', value: '9:16' },
  { title: '3:4', value: '3:4' }
];

export const SORT_OPTIONS = [
  {
    label: 'Recommended',
    value: 'recommended'
  },
  {
    label: 'Price (Low)',
    value: 'price_lowest'
  },
  {
    label: 'Price (High)',
    value: 'price_highest'
  },
  {
    label: 'Newest',
    value: 'newest'
  }
];

// ? The different types of links that can be created in Sanity.
export const LINK_TYPES = [
  { title: 'To a page made in Sanity', value: 'internal' },
  { title: 'To an external page', value: 'external' },
  { title: 'Smile deep link', value: 'smile' }
];

// ? The different types of pages that can be linked to in Sanity.
export const INTERNAL_LINK_OPTIONS = [
  { type: 'page', title: 'Page' },
  { type: 'product', title: 'Product' },
  { type: 'collection', title: 'Collection' },
  { type: 'legalPage', title: 'Legal page' },
  { type: 'blogPost', title: 'Blog post' },
  { type: 'blogLandingPage', title: 'Blog landing page' },
  { type: 'helpCenter', title: 'Help center' },
  { type: 'retailersPage', title: 'Retailers page' }
];

// ? The different types of pages that can be linked to in Sanity.
export const SMILE_DEEP_LINK_OPTIONS = [
  {
    title: 'Home',
    value: SMILE_DEEP_LINKS.home
  },
  {
    title: 'Points activity rules',
    value: SMILE_DEEP_LINKS.points_activity_rules
  },
  {
    title: 'Points products',
    value: SMILE_DEEP_LINKS.points_products
  },
  {
    title: 'Referral program details',
    value: SMILE_DEEP_LINKS.referral_program_details
  }
];

// TODO add tel, email, and social media
