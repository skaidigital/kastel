import {
  ThrottleStatusSchema,
  customerAccessTokenCreateValidator,
  customerActivateValidator,
  customerCreateValidator
} from '@/lib/shopify/validators';
import { z } from 'zod';

export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type Cart = Omit<ShopifyCart, 'lines'> & {
  lines: CartItem[];
};

export type CustomerAccessToken = {
  accessToken: string;
  expiresAt: string;
};

export type CartItem = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: Product;
  };
};

export type Collection = ShopifyCollection & {
  path: string;
};

export type ShopifyImage = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Menu = {
  title: string;
  path: string;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Address = {
  id: string;
  address1: string;
  address2: string;
  city: string;
  company: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  territoryCode: string;
  zip: string;
  zoneCode: string;
  formatted: string[];
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type Product = Omit<ShopifyProduct, 'variants' | 'images'> & {
  variants: ProductVariant[];
  images: ShopifyImage[];
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
  type: 'SIZE' | 'COLOR' | 'STRING';
  featuredValues?: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type SEO = {
  title: string;
  description: string;
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
  discountCodes: { code: string }[];
};

export type ShopifyCollection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
};

export type ShopifyOrder = {
  id: string;
  name: string;
  currencyCode: string;
  currentTotalPriceSet: {
    shopMoney: Money;
  };
  displayFulfillmentStatus: string;
  displyFinancialStatus: string;
  createdAt: string;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage: ShopifyImage;
  images: Connection<ShopifyImage>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
};

export type ShopifyCartOperation = {
  data: {
    cart: ShopifyCart;
  };
  variables: {
    cartId: string;
  };
};

export type ShopifyCartAttributesOperation = {
  data: {
    cart: {
      id: string;
      attributes: {
        key: string;
        value: string;
      }[];
    };
  };
  variables: {
    cartId: string;
  };
};

export type ShopifyCustomerAccessTokenCreateProps = z.infer<
  typeof customerAccessTokenCreateValidator
>;

export type ShopifyCustomerAccessTokenOperation = {
  data: {
    customerAccessTokenCreate: {
      customerAccessToken: CustomerAccessToken;
      userErrors: {
        field: string[];
        message: string;
      }[];
    };
  };
  variables: {
    email: string;
    password: string;
  };
};

export type ShopifyCreateCartOperation = {
  data: { cartCreate: { cart: ShopifyCart } };
};

export type ShopifyAddToCartOperation = {
  data: {
    cartLinesAdd: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyAddDiscountCodeOperation = {
  data: {
    cart: ShopifyCart;
  };
  variables: {
    cartId: string;
    discountCodes: string[];
  };
};

type CustomerErrorCode =
  | 'ALREADY_ENABLED'
  | 'BAD_DOMAIN'
  | 'BLANK'
  | 'CONTAINS_HTML_TAGS'
  | 'CONTAINS_URL'
  | 'CUSTOMER_DISABLED'
  | 'INVALID'
  | 'INVALID_MULTIPASS_REQUEST'
  | 'NOT_FOUND'
  | 'PASSWORD_STARTS_OR_ENDS_WITH_WHITESPACE'
  | 'TAKEN'
  | 'TOKEN_INVALID'
  | 'TOO_LONG'
  | 'TOO_SHORT'
  | 'UNIDENTIFIED_CUSTOMER';

export type ShopifyCustomerAccessTokenCreateOperation = {
  data: {
    customerAccessTokenCreate: {
      customerAccessToken: {
        accessToken: string;
      };
      userErrors: {
        code: CustomerErrorCode;
        field: string[];
        message: string;
      }[];
    };
  };
  variables: {
    email: string;
    password: string;
  };
};

export type ShopifyCustomerRecoversOperation = {
  data: {
    customerRecover: {
      customerUserErrors: {
        code: CustomerErrorCode;
        field: string;
        message: string;
      }[];
    };
  };
  variables: {
    email: string;
  };
};

export type ShopifyCustomerActivateProps = z.infer<typeof customerActivateValidator>;

export type ShopifyCustomerActivateOperation = {
  data: {
    customerActivate: {
      customer: {
        id: string;
      };
      customerAccessToken: CustomerAccessToken;
      customerUserErrors: {
        code: string;
        field: string;
        message: string;
      }[];
    };
  };
  variables: {
    id: string;
    input: {
      activationToken: string;
      password: string;
    };
  };
};

export type ShopifyRemoveFromCartOperation = {
  data: {
    cartLinesRemove: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type ShopifyUpdateCartOperation = {
  data: {
    cartLinesUpdate: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyUpdateCartAttributesOperation = {
  data: {
    cartAttributesUpdate: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    attributes: {
      key: string;
      value: string;
    }[];
  };
};

export type ShopifyOrderOperation = {
  data: {
    order: ShopifyOrder;
  };
  variables: {
    id: string;
  };
};

export type ShopifyCollectionOperation = {
  data: {
    collection: ShopifyCollection;
  };
  variables: {
    handle: string;
  };
};

export type ShopifyCollectionProductsOperation = {
  data: {
    collection: {
      products: Connection<ShopifyProduct>;
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type ShopifyCollectionsOperation = {
  data: {
    collections: Connection<ShopifyCollection>;
  };
};

export type ShopifyMenuOperation = {
  data: {
    menu?: {
      items: {
        title: string;
        url: string;
      }[];
    };
  };
  variables: {
    handle: string;
  };
};

export type ShopifyPageOperation = {
  data: { pageByHandle: Page };
  variables: { handle: string };
};

export type ShopifyPagesOperation = {
  data: {
    pages: Connection<Page>;
  };
};

export type ShopifyProductOperation = {
  data: { product: ShopifyProduct };
  variables: {
    handle: string;
  };
};

export type ShopifyProductRecommendationsOperation = {
  data: {
    productRecommendations: ShopifyProduct[];
  };
  variables: {
    productId: string;
  };
};

export type ShopifyProductsOperation = {
  data: {
    products: Connection<ShopifyProduct>;
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type ShopifyCustomerCreateProps = z.infer<typeof customerCreateValidator>;

export type ShopifyCustomerCreateOperation = {
  data: {
    customerCreate: {
      customer: {
        id: string;
      };
      customerUserErrors: {
        code: CustomerErrorCode;
        field: string;
        message: string;
      }[];
    };
  };
  variables: {
    input: ShopifyCustomerCreateProps;
  };
};

export interface ShopifyResponse {
  data: {
    [key: string]: {
      [key: string]: any;
      userErrors?: {
        field: string[];
        message: string;
      }[];
    }; // Adjust this to represent specific fields you expect in the data
  };
  errors?: { message: string }[];
  extensions?: {
    cost: {
      requestedQueryCost: number;
      actualQueryCost: number;
      throttleStatus: ThrottleStatusSchema;
    };
  };
}

export type ShopifyProductStatus = 'ACTIVE' | 'ARCHIVED' | 'DRAFT';

export interface ProductInputCreate {
  input: {
    title: string;
    status: ShopifyProductStatus;
    options?: string[] | null;
    variants?: VariantInput[];
    metafields: {
      namespace: string;
      key: string;
      type: string;
      value: string;
    }[];
  };
  media: {
    originalSource: string;
    mediaContentType: string;
  }[];
}

export interface ProductInputUpdate {
  input: {
    id: string;
    title: string;
    status: ShopifyProductStatus;
    options?: string[] | null;
    variants?: VariantInput[];
  };
}

interface VariantInput {
  sku: string | null;
  price: string;
  options: string[];
  inventoryItem: {
    tracked: boolean;
  };
}

export type SelectedOption = {
  name: string;
  value: string;
};

export type ProductCompareAtPriceRange = {
  maxVariantPrice: Money;
  minVariantPrice: Money;
};

export type PublicationInput = {
  id: string;
  input: {
    publicationId: string;
  }[];
};

export type CustomerMetadata = {
  data: {
    customer: {
      metafield: {
        id: string;
        key: string;
        value: string;
      };
    };
  };
  variables: {
    token: string;
    key: string;
    namespace: string;
  };
};

export type MetafieldDelete = {
  data: {
    metafieldDelete: {
      deletedId: string;
    };
  };
  variables: {
    id: string;
  };
};

type Input = {
  firstName: string;
  lastName: string;
};

export type CustomerUpdateData = {
  data: {
    customerUpdate: {
      customer: {
        id: string;
        firstName: string;
        lastName: string;
      };
      customerUserErrors: {
        code: string;
        field: string;
        message: string;
      };
    };
  };
  variables: {
    customer: {
      firstName: string;
      lastName: string;
    };
    customerAccessToken: string;
  };
};
