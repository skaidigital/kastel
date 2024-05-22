import { resolveHref } from '@/lib/sanity/studioUtils';
import { Observable, map } from 'rxjs';
import { DocumentLocationResolver, DocumentLocationsState } from 'sanity/presentation';

const documentTypesWithPreview = [
  'page',
  'product',
  'collection',
  'legalPage',
  'blogPost',
  'blogLandingPage',
  'helpCenter',
  'retailersPage',
  'aboutPage',
  'kastelClubPage'
];

export const locate: DocumentLocationResolver = (params, context) => {
  if (documentTypesWithPreview.includes(params.type)) {
    const doc$ = context.documentStore.listenQuery(
      `*[_id==$id || references($id)]{_type,"slug": slug_no, "slug_en": slug_en,"title": title_en, internalTitle, "id": _id}`,
      params,
      { perspective: 'previewDrafts' }
    ) as Observable<
      | {
          _type: string;
          slug: { current: string };
          slug_en: { current: string };
          title: string | null;
          internalTitle: string | null;
          id: string;
        }[]
      | null
    >;
    return doc$.pipe(
      map((docs) => {
        const thisDocument = docs?.find((doc) => doc.id === params.id);

        switch (params.type) {
          case 'page':
            if (thisDocument?.slug?.current === 'home') {
              return {
                locations: [
                  {
                    title: 'Home page',
                    href: '/no/no/'
                  }
                ],
                tone: 'positive',
                message: 'Open preview'
              } satisfies DocumentLocationsState;
            }
            return {
              locations: thisDocument
                ? [
                    {
                      title: thisDocument?.internalTitle || thisDocument?.title || 'Untitled',
                      href: `${resolveHref(thisDocument._type, thisDocument?.slug?.current)!}`
                    },
                    {
                      title: thisDocument?.internalTitle || thisDocument?.title || 'Untitled',
                      href: `${resolveHref(thisDocument._type, thisDocument?.slug_en?.current, 'en')!}`
                    }
                  ]
                : [],
              tone: 'positive',
              message: 'Open preview'
            } satisfies DocumentLocationsState;
          case 'product':
            return {
              locations: thisDocument
                ? [
                    {
                      title: thisDocument?.internalTitle || thisDocument?.title || 'Untitled',
                      href: `${resolveHref(thisDocument._type, thisDocument?.slug?.current)!}`
                    }
                  ]
                : [],
              tone: 'positive',
              message: 'Open preview'
            } satisfies DocumentLocationsState;
          case 'collection':
            return {
              locations: thisDocument
                ? [
                    {
                      title: thisDocument?.internalTitle || thisDocument?.title || 'Untitled',
                      href: `${resolveHref(thisDocument._type, thisDocument?.slug?.current)!}`
                    }
                  ]
                : [],
              tone: 'positive',
              message: 'Open preview'
            } satisfies DocumentLocationsState;
          case 'legalPage':
            return {
              locations: thisDocument
                ? [
                    {
                      title: thisDocument?.internalTitle || thisDocument?.title || 'Untitled',
                      href: `${resolveHref(thisDocument._type, thisDocument?.slug?.current)!}`
                    }
                  ]
                : [],
              tone: 'positive',
              message: 'Open preview'
            } satisfies DocumentLocationsState;
          case 'blogPost':
            return {
              locations: thisDocument
                ? [
                    {
                      title: thisDocument?.internalTitle || thisDocument?.title || 'Untitled',
                      href: `${resolveHref(thisDocument._type, thisDocument?.slug?.current)!}`
                    },
                    {
                      title: thisDocument?.internalTitle || thisDocument?.title || 'Untitled',
                      href: `${resolveHref(thisDocument._type, thisDocument?.slug_en?.current, 'en')!}`
                    }
                  ]
                : [],
              tone: 'positive',
              message: 'Open preview'
            } satisfies DocumentLocationsState;
          case 'blogLandingPage':
            return {
              locations: [
                {
                  title: 'Blog Landing Page',
                  href: '/no/no/blog'
                }
              ],
              tone: 'positive',
              message: 'Open preview'
            } satisfies DocumentLocationsState;
          case 'helpCenter':
            return {
              locations: [
                {
                  title: 'Help Center',
                  href: '/no/no/help-center'
                }
              ],
              tone: 'positive',
              message: 'Open preview'
            } satisfies DocumentLocationsState;
          case 'retailersPage':
            return {
              locations: [
                {
                  title: 'Retailers Page',
                  href: '/no/no/stores'
                }
              ],
              tone: 'positive',
              message: 'Open preview'
            } satisfies DocumentLocationsState;
          case 'aboutPage':
            return {
              locations: [
                {
                  title: 'About Page',
                  href: '/no/no/about'
                }
              ],
              tone: 'positive',
              message: 'Open preview'
            } satisfies DocumentLocationsState;
          case 'kastelClubPage':
            return {
              locations: [
                {
                  title: 'Kastel Club page',
                  href: '/no/no/kastel-club'
                }
              ],
              tone: 'positive',
              message: 'Open preview'
            } satisfies DocumentLocationsState;
          default:
            return {
              message: 'Unable to map document type to locations',
              tone: 'critical'
            } satisfies DocumentLocationsState;
        }
      })
    );
  }

  return null;
};
