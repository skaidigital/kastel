import { SANITY_STUDIO_API_VERSION } from '@/data/constants';
import { group, list, listNew, singleton } from '@/lib/sanity/studioUtils';
import {
  ArrowLineUp,
  Article,
  Check,
  Coins,
  Cookie,
  CreditCard,
  File,
  Folders,
  Gavel,
  Gear,
  GoogleLogo,
  GridFour,
  House,
  Info,
  Layout,
  List,
  ListBullets,
  MapPin,
  MegaphoneSimple,
  Package,
  PaintBucket,
  Placeholder,
  Question,
  Recycle,
  Signpost,
  Sneaker,
  Square,
  SquareHalfBottom,
  Tag,
  User,
  VideoCamera
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
      list(S, 'Landing pages', `_type == 'page' && !(_id in $excludedPageIds)`, {
        excludedPageIds: EXCLUDED_PAGE_IDS
      }).icon(File),
      listNew({ S, schemaType: 'blogPost', title: 'Blog posts' }).icon(Article),
      listNew({ S, schemaType: 'legalPage', title: 'Legal pages' }).icon(Gavel),
      singleton(S, 'Account page', 'accountPage', 'accountPage').icon(User),
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
                    icon: Sneaker
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
                    .icon(Sneaker)
                ])
            )
        )
        .icon(Sneaker),
      list(S, 'Collections', `_type == 'collection'`).icon(Package),
      group(S, 'Nature Lab', [
        listNew({ S, title: 'Landing page', schemaType: 'natureLabLandingPage' }).icon(File),
        listNew({ S, title: 'Phase 1 blog posts', schemaType: 'phase1BlogPost' }).icon(File),
        listNew({ S, title: 'Phase 2 products', schemaType: 'phase2Product' }).icon(Sneaker),
        listNew({ S, title: 'Phase 3 blog posts', schemaType: 'phase3BlogPost' }).icon(File),
        listNew({ S, title: 'Settings', schemaType: 'natureLabSettings' }).icon(Gear)
      ]).icon(Recycle),
      singleton(S, 'Store locator', 'storeLocator', 'storeLocator').icon(MapPin),
      singleton(S, 'Help center', 'helpCenter', 'helpCenter').icon(Question),
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
        listNew({ S, title: 'Question', schemaType: 'question' }).icon(List),
        list(S, 'FAQ section', `_type == 'faqSection'`).icon(List),
        listNew({ S, title: 'Card', schemaType: 'card' }).icon(Square),
        listNew({ S, title: 'UGC section', schemaType: 'UGCSection' }).icon(VideoCamera)
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
        listNew({ S, title: 'Badges', schemaType: 'badge' }).icon(Tag),
        listNew({ S, title: 'Product USPs', schemaType: 'usp' }).icon(ListBullets)
      ]).icon(Gear)
    ]);
};
