export type EcommerceItem = {
  item_id: string;
  item_name: string;
  item_brand: string;
  item_category?: string;
  item_variant?: string;
  price: number;
  quantity: number;
};

export type EcommerceObject = {
  event: string;
  ecommerce: {
    currency: string;
    value: number;
    items: EcommerceItem[];
  };
};
