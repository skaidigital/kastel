export const MONEY_FRAGMENT = `#graphql
    fragment Money on MoneyV2 {
        amount
        currencyCode
    }
`;

export const ADDRESS_FRAGMENT = `#graphql
    fragment Address on CustomerAddress {
        address1
        address2
        city
        company
        firstName
        lastName
        phoneNumber
        territoryCode
        zip
        zoneCode
    }
`;

export const ERROR_FRAGMENT = `#graphql
    userErrors {
        field
        message
    }
`;

// const API_ALL_PRODUCTS_QUERY = `#graphql
//   query ApiAllProducts(
//     $query: String
//     $count: Int
//     $reverse: Boolean
//     $country: CountryCode
//     $language: LanguageCode
//     $sortKey: ProductSortKeys
//   ) @inContext(country: $country, language: $language) {
//     products(first: $count, sortKey: $sortKey, reverse: $reverse, query: $query) {
//       nodes {
//         ...ProductCard
//       }
//     }
//   }
//   ${PRODUCT_CARD_FRAGMENT}
// ` as const;
