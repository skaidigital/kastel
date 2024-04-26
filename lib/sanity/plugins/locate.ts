import { resolveHref } from '@/lib/sanity/studioUtils';
import { Observable, map } from 'rxjs';
import { DocumentLocationResolver, DocumentLocationsState } from 'sanity/presentation';

const documentTypesWithPreview = ['page', 'product', 'collection', 'legalPage', 'blogPost'];

export const locate: DocumentLocationResolver = (params, context) => {
  const documentTypesUsedOnAllPages = ['footer', 'navbar'];

  if (documentTypesUsedOnAllPages.includes(params.type)) {
    return {
      message: 'This document is used on all pages',
      tone: 'caution'
    } satisfies DocumentLocationsState;
  }

  if (documentTypesWithPreview.includes(params.type)) {
    const doc$ = context.documentStore.listenQuery(
      `*[_id==$id || references($id)]{_type,"slug": slug_no,"title": title_no, internalTitle}`,
      params,
      { perspective: 'previewDrafts' }
    ) as Observable<
      | {
          _type: string;
          slug: { current: string };
          title: string | null;
          internalTitle: string | null;
        }[]
      | null
    >;
    return doc$.pipe(
      map((docs) => {
        switch (params.type) {
          case 'page':
            return {
              locations: docs
                ?.map((doc) => {
                  if (doc.slug?.current === 'home') {
                    return {
                      title: 'Home page',
                      href: '/no/no/'
                    };
                  }

                  const href = resolveHref(doc._type, doc?.slug?.current);

                  return {
                    title: doc?.internalTitle || doc?.title || 'Untitled',
                    // href: `/no/no/${href!}`
                    href: '/no/no/eksempel'
                  };
                })
                .filter((doc) => doc.href !== undefined),
              tone: 'positive',
              message: 'Open preview'
            } satisfies DocumentLocationsState;
          case 'product':
            return {
              locations: docs
                ?.map((doc) => {
                  const href = resolveHref(doc._type, doc?.slug?.current);
                  return {
                    title: doc?.title || 'Untitled',
                    href: href!
                  };
                })
                .filter((doc) => doc.href !== undefined),
              tone: 'positive',
              message: 'Open preview'
            } satisfies DocumentLocationsState;
          case 'collection':
            return {
              locations: docs
                ?.map((doc) => {
                  const href = resolveHref(doc._type, doc?.slug?.current);

                  return {
                    title: doc?.internalTitle || doc?.title || 'Untitled',
                    href: href!
                  };
                })
                .filter((doc) => doc.href !== undefined),
              tone: 'positive',
              message: 'Open preview'
            } satisfies DocumentLocationsState;
          case 'legalPage':
            return {
              locations: docs
                ?.map((doc) => {
                  const href = resolveHref(doc._type, doc?.slug?.current);
                  return {
                    title: doc?.title || 'Untitled',
                    href: href!
                  };
                })
                .filter((doc) => doc.href !== undefined),
              tone: 'positive',
              message: 'Open preview'
            } satisfies DocumentLocationsState;
          case 'blogPost':
            return {
              locations: docs
                ?.map((doc) => {
                  const href = resolveHref(doc._type, doc?.slug?.current);
                  return {
                    title: doc?.title || 'Untitled',
                    href: href!
                  };
                })
                .filter((doc) => doc.href !== undefined),
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
