import { Badge } from '@/components/Badge';
import { LegalPagePayload } from '@/components/pages/LegalPage/hooks';
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer';
import { LangValues } from '@/data/constants';
import { formatDate } from '@/lib/utils';
import { createDataAttribute } from 'next-sanity';

interface Props {
  data: LegalPagePayload;
  lang: LangValues;
}

// TODO fix not being able to click portable text
export function LegalPage({ data, lang }: Props) {
  const { id, title, subtitle, updatedAt, content } = data;

  const dataAttribute = createDataAttribute({
    id: id,
    type: 'legalPage'
  });

  return (
    <>
      <div className="mx-4 mb-20 mt-10 lg:mx-0 lg:mb-40 lg:mt-20">
        <div className="flex flex-col lg:mx-auto lg:max-w-[680px]">
          <div className="mb-10 flex flex-col lg:mb-20">
            {updatedAt && (
              <Badge className="mb-2">
                {getLastUpdatedString(lang)} {formatDate(updatedAt)}
              </Badge>
            )}
            {title && (
              <h1 className="text-heading-md font-bold uppercase lg:text-heading-lg">{title}</h1>
            )}
            {subtitle && <p className="mt-4 text-md text-brand-mid-grey lg:text-lg">{subtitle}</p>}
          </div>
          {content && (
            <PortableTextRenderer
              data-sanity={dataAttribute?.(`content_no`)}
              value={content}
              type="legalPage"
            />
          )}
          {/* <Script
            id="CookieDeclaration"
            src="https://consent.cookiebot.com/4a61496c-631f-41e9-bf0e-88ecf2de8ad3/cd.js"
            type="text/javascript"
            strategy="afterInteractive"
          /> */}
        </div>
      </div>
    </>
  );
}

function getLastUpdatedString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Last updated at';
    case 'no':
      return 'Sist oppdatert';
    default:
      return 'Last updated at';
  }
}
