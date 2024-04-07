const moneyFragment = /* GraphQL */ `
  fragment money on Money {
    shopMoney {
      amount
      currencyCode
    }
  }
`;

export default moneyFragment;
