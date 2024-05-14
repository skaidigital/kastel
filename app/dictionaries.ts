import { LangValues } from '@/data/constants';
import { z } from 'zod';

type DictionaryLoader = () => Promise<Dictionary>;

export const reccommendedProductsValidator = z.object({
  we_think_you_will_like: z.string()
});

type ReccommendedProducts = z.infer<typeof reccommendedProductsValidator>;

export interface Dictionary {
  footer: {
    made_with: string;
    by: string;
    about: string;
    sign_up: {
      title: string;
      description: string;
      email: string;
      button_text: string;
      success_message: string;
      success_description: string;
      error_message: string;
      error_description: string;
    };
  };
  collection_page: {
    number_of_products: string;
    no_products: string;
    description: string;
  };
  product_page: {
    discount: string;
    add_to_cart: string;
    show_all_sizes: string;
    choose_size: string;
    color: string;
    close: string;
    reccommended: string;
    description: string;
    expected_back_in_stock: string;
    size_guide: string;
    stock: {
      out_of_stock: string;
      low_stock: string;
      in_stock: string;
    };
    back_in_stock_notification: {
      this_product_is_out_of_stock: string;
      if_you_want_to_be_notified: string;
      email: string;
      notify_me: string;
      you_will_be_notified: string;
    };
  };
  search_page: {
    we_found: string;
    search_results: string;
    products: string;
    no_products_that_match: string;
    showing: string;
    for: string;
    next_page: string;
    previous_page: string;
    result: string;
    results: string;
  };
  account_page: {
    recent_orders: string;
    order: string;
    date: string;
    status_payment: string;
    status_shipping: string;
    total: string;
    no_orders: string;
    order_not_shipped: string;
  };
  account_layout: {
    my_account: string;
    orders: string;
    addresses: string;
    wishlist: string;
    customer_service: string;
    log_out: string;
  };
  order_details_page: {
    order: string;
    order_not_shipped: string;
    product: string;
    quantity: string;
    price: string;
    summary: string;
    subtotal: string;
    shipping: string;
    discounts: string;
    tax: string;
    total: string;
    delivery_address: string;
    track_your_package: string;
    order_overview: string;
  };
  address_page: {
    addresses: string;
    address_info: string;
    no_addresses: string;
    add_address: string;
    primary: string;
    update_address: string;
    form: {
      first_name: string;
      last_name: string;
      address1: string;
      address2: string;
      zip: string;
      city: string;
      country: string;
      phone_number: string;
      default_address: string;
      save_address: string;
    };
    delete_address: string;
    are_you_sure: string;
    cancel: string;
    delete: string;
    orders: string;
  };
  create_address_page: {
    new_address: string;
    first_name: string;
    last_name: string;
    address1: string;
    address2: string;
    zip: string;
    city: string;
    country: string;
    phone_number: string;
    email: string;
    default_address: string;
    create_address: string;
    edit_address: string;
    addresses: string;
  };
  cookie_consent: {
    accept: string;
    learn_more: string;
  };
  cart_drawer: {
    discount: string;
    shipping: string;
    total_incl_vat: string;
    free: string;
    calculated_at_checkout: string;
    you_are_away_from_free_shipping: string;
    you_get_free_shipping: string;
    cart: string;
    close_cart: string;
    checkout: string;
    quantity_short: string;
    cart_is_empty: string;
    start_shopping: string;
    cross_sell: {
      we_think_you_will_like: string;
      add_to_cart: string;
      choose_option: string;
      out_of_stock: string;
    };
  };
  market_selector: {
    select_your_location: string;
  };
  market_suggestion_popup: {
    looks_like_you_are_in: string;
    would_you_like_to_change_location: string;
    more_locations: string;
    confirm_your_location: string;
  };
  reccommended_products: ReccommendedProducts;
  page_builder: {
    contact_form: {
      we_have_received_your_inquiry: string;
      we_will_respond_as_soon_as_possible: string;
      contact_us: string;
      name: string;
      email: string;
      message: string;
      send: string;
    };
  };
  not_found_page: {
    back_to_home: string;
  };
  product_layout: {
    home: string;
    products: string;
  };
}

const dictionaries: Record<string, DictionaryLoader> = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  no: () => import('./dictionaries/no.json').then((module) => module.default)
};

export const getDictionary = async ({ lang }: { lang: LangValues }) => {
  const loader = dictionaries[lang];

  if (!loader) {
    throw new Error(`Error in dictionary`);
  }
  return loader();
};
