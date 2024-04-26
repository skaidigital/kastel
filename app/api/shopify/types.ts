export interface ShopifyErrorLike {
  status: number;
  message: Error;
  cause?: Error;
}

export type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

export type UserError = {
  field: string | null;
  message: string;
};

export type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
};
