import { SANITY_STUDIO_API_VERSION } from '@/data/constants';
import { group, list, listNew, singleton } from '@/lib/sanity/studioUtils';
import {
  ArrowLineUp,
  Check,
  Coins,
  Cookie,
  CreditCard,
  File,
  Folders,
  Gear,
  GoogleLogo,
  GridFour,
  House,
  Info,
  Layout,
  List,
  MapPin,
  MegaphoneSimple,
  Package,
  PaintBucket,
  Placeholder,
  Recycle,
  ShoppingCartSimple,
  Signpost,
  Square,
  SquareHalfBottom,
  Tag
} from '@phosphor-icons/react';
import type { StructureBuilder, StructureResolver } from 'sanity/structure';

const EXCLUDED_PAGE_IDS = ['home'];

export const structure: StructureResolver = (S: StructureBuilder) => {
  return S.list()
    .title('Kastel')
    .items([
      S.listItem()
        .title('Home')
        .id('home')
        .child(S.document().schemaType('page').documentId('home'))
        .icon(House),
      list(S, 'Pages', `_type == 'page' && !(_id in $excludedPageIds)`, {
        excludedPageIds: EXCLUDED_PAGE_IDS
      }).icon(File),
      listNew({ S, schemaType: 'legalPage', title: 'Legal pages' }).icon(File),
      list(S, 'Models', `_type == 'productType'`).icon(Square),
      S.listItem()
        .title('Products')
        .child(
          S.documentTypeList('product')
            .title('Products')
            .defaultOrdering([{ field: 'title_eu', direction: 'asc' }])
            .apiVersion(SANITY_STUDIO_API_VERSION)
            .filter(`_type == 'product' `)
            .child((_id) =>
              S.list()
                .title('Product')
                .items([
                  S.documentListItem({
                    schemaType: 'product',
                    title: 'Edit product',
                    id: _id,
                    icon: ShoppingCartSimple
                  }),
                  S.listItem()
                    .title('Variants')
                    .child(
                      S.documentTypeList('productVariant')
                        .title('Variants')
                        .filter("_type == 'productVariant' && references($id)")
                        .apiVersion(SANITY_STUDIO_API_VERSION)
                        .params({ id: _id })
                        .defaultOrdering([{ field: 'price_no', direction: 'asc' }])
                        .initialValueTemplates([
                          S.initialValueTemplateItem('product-variant-based-on-product', { _id })
                        ])
                    )
                    .icon(ShoppingCartSimple)
                ])
            )
        )
        .icon(ShoppingCartSimple),
      list(S, 'Collections', `_type == 'collection'`).icon(Package),
      singleton(S, 'Store locator', 'storeLocator', 'storeLocator').icon(MapPin),
      group(S, 'Site', [
        singleton(S, 'Announcement banner', 'announcementBanner', 'announcementBanner').icon(Info),
        singleton(S, 'Navbar', 'navbar', 'navbar').icon(ArrowLineUp),
        singleton(S, 'Footer', 'footer', 'footer').icon(SquareHalfBottom),
        singleton(S, 'Cookie consent', 'cookieConsent', 'cookieConsent').icon(Cookie),
        singleton(S, 'Popup', 'popup', 'popup').icon(MegaphoneSimple),
        singleton(S, 'USPs', 'usps', 'usps').icon(Check),
        singleton(S, '404', 'pageNotFound', 'pageNotFound').icon(Placeholder)
      ]).icon(Layout),
      group(S, 'Reusable content', [
        list(S, 'Text block', `_type == 'textBlock'`).icon(Layout),
        list(S, 'Text and image block', `_type == 'textAndImage'`).icon(Layout),
        listNew({ S, title: 'Accordion', schemaType: 'accordion' }).icon(List),
        list(S, 'Accordion block', `_type == 'accordionBlock'`).icon(List),
        listNew({ S, title: 'Card', schemaType: 'card' }).icon(Square)
      ]).icon(Recycle),
      group(S, 'Settings', [
        // singleton(S, 'General', 'settingsGeneral', 'settingsGeneral').icon(Gear),
        singleton(S, 'SEO & Socials', 'settingsSEOAndSocials', 'settingsSEOAndSocials').icon(
          GoogleLogo
        ),
        list(S, 'Redirects', `_type == 'redirect'`).icon(Signpost),
        singleton(S, 'Merchandising', 'merchandising', 'merchandising').icon(Coins),
        singleton(
          S,
          'Payment providers',
          'settingsPaymentProviders',
          'settingsPaymentProviders'
        ).icon(CreditCard),
        list(S, 'Options', `_type == 'productOption'`).icon(Square),
        list(S, 'Option groups', `_type == 'productOptionType'`).icon(GridFour),
        listNew({ S, title: 'Colors', schemaType: 'colorDocument' }).icon(PaintBucket),
        listNew({ S, title: 'Tags', schemaType: 'tag' }).icon(Tag),
        listNew({ S, title: 'Tag groups', schemaType: 'tagGroup' }).icon(Folders),
        listNew({ S, title: 'Badges', schemaType: 'badge' }).icon(Tag)
      ]).icon(Gear)
    ]);
};
