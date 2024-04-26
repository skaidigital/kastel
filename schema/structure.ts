import { SANITY_STUDIO_API_VERSION } from '@/data/constants';
import { group, list, listNew, singleton } from '@/lib/sanity/studioUtils';
import {
  ArrowLineUp,
  Article,
  Calendar,
  Check,
  Coins,
  CreditCard,
  Crosshair,
  Faders,
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
  MegaphoneSimple,
  Package,
  PaintBucket,
  Placeholder,
  Question,
  Quotes,
  Recycle,
  Signpost,
  Slideshow,
  Sneaker,
  Square,
  SquareHalfBottom,
  Star,
  Storefront,
  Tag,
  Trophy,
  User,
  UserCircle,
  VideoCamera
} from '@phosphor-icons/react';
import type { StructureBuilder, StructureResolver } from 'sanity/structure';

const EXCLUDED_PAGE_IDS = ['home', 'drafts.home'];

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
      listNew({ S, schemaType: 'blogPost', title: '🚧  Blog posts' }).icon(Article),
      listNew({ S, schemaType: 'legalPage', title: 'Legal pages' }).icon(Gavel),
      singleton(S, 'Account page', 'accountPage', 'accountPage').icon(User),
      S.divider(),
      list(S, 'Models', `_type == 'productType'`).icon(Square),
      S.listItem()
        .title('Products')
        .child(
          S.documentTypeList('product')
            .title('Products')
            .defaultOrdering([{ field: 'title.en', direction: 'asc' }])
            .apiVersion(SANITY_STUDIO_API_VERSION)
            .filter("_type == 'product'")
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
      S.divider(),
      group(S, '🚧 Nature Lab', [
        listNew({ S, title: 'Landing page', schemaType: 'natureLabLandingPage' }).icon(File),
        listNew({ S, title: 'Phase 1 blog posts', schemaType: 'phase1BlogPost' }).icon(File),
        listNew({ S, title: 'Phase 2 products', schemaType: 'phase2Product' }).icon(Sneaker),
        listNew({ S, title: 'Phase 3 blog posts', schemaType: 'phase3BlogPost' }).icon(File),
        singleton(S, 'Settings', 'natureLabSettings', 'natureLabSettings').icon(Gear)
      ]).icon(Recycle),
      group(S, 'Help Center', [
        listNew({ S, title: 'Q&A', schemaType: 'question' }).icon(List),
        singleton(S, 'Help center', 'helpCenter', 'helpCenter').icon(Question)
      ]).icon(Question),
      group(S, 'Site', [
        singleton(S, 'Announcement banner', 'announcementBanner', 'announcementBanner').icon(Info),
        singleton(S, 'Navbar', 'navbar', 'navbar').icon(ArrowLineUp),
        singleton(S, 'Footer', 'footer', 'footer').icon(SquareHalfBottom),
        singleton(S, 'Popup', 'popup', 'popup').icon(MegaphoneSimple),
        singleton(S, 'USPs', 'usps', 'usps').icon(Check),
        singleton(S, 'USP marquee', 'layoutUSPMarquee', 'layoutUSPMarquee').icon(Check),
        singleton(S, '404 page', 'pageNotFound', 'pageNotFound').icon(Placeholder)
      ]).icon(Layout),
      group(S, 'Reusable content blocks', [
        list(S, '🚧 Text', `_type == 'textBlock'`).icon(Layout),
        listNew({ S, title: 'FAQ', schemaType: 'faqBlock' }).icon(List),
        listNew({ S, title: 'Cards', schemaType: 'cardBlock' }).icon(GridFour),
        listNew({ S, title: 'Shoe picker', schemaType: 'shoePickerBlock' }).icon(Sneaker),
        listNew({ S, title: 'Kastel Club', schemaType: 'kastelClubBlock' }).icon(Trophy),
        listNew({
          S,
          title: 'USP Explainer',
          schemaType: 'uspExplainerBlock'
        }).icon(Star),
        listNew({
          S,
          title: 'Nature Lab Explainer',
          schemaType: 'natureLabExplainerBlock'
        }).icon(Recycle),
        listNew({ S, title: '🚧 Timeline', schemaType: 'timelineBlock' }).icon(Calendar),
        listNew({ S, title: 'Shop Our Models', schemaType: 'shopOurModelsBlock' }).icon(Slideshow),
        listNew({ S, title: 'UGC', schemaType: 'ugcBlock' }).icon(VideoCamera),
        listNew({ S, title: 'Featured Shoe', schemaType: 'featuredShoeBlock' }).icon(Star),
        listNew({ S, title: 'Featured Collection', schemaType: 'featuredCollectionBlock' }).icon(
          Star
        ),
        listNew({ S, title: 'Quotes', schemaType: 'quote' }).icon(Quotes),
        listNew({ S, title: 'Hotspot image', schemaType: 'hotspotImage' }).icon(Crosshair),
        listNew({ S, title: 'Nature Lab Innovation', schemaType: 'natureLabInnovationItem' }).icon(
          Crosshair
        )
      ]).icon(Recycle),
      group(S, 'Retailers', [
        singleton(S, 'Retailers page', 'retailersPage', 'retailersPage').icon(File),
        listNew({ S, title: 'Retailers', schemaType: 'retailer' }).icon(Storefront)
      ]).icon(Storefront),
      group(S, 'Settings', [
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
        singleton(S, 'Filters', 'filters', 'filters').icon(Faders),
        listNew({ S, title: 'Badges', schemaType: 'badge' }).icon(Tag),
        listNew({ S, title: 'Product USPs', schemaType: 'usp' }).icon(ListBullets),
        listNew({ S, title: 'People', schemaType: 'person' }).icon(UserCircle),
        singleton(S, 'Product settings', 'productSettings', 'productSettings').icon(Gear)
      ]).icon(Gear)
    ]);
};
