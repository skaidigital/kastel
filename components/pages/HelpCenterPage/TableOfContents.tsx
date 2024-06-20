'use client';

import { Heading } from '@/components/base/Heading';
import { LangValues } from '@/data/constants';
import { useBaseParams } from '@/lib/hooks/useBaseParams';

export function TableOfContents({ titles }: { titles: string[] }) {
  const { lang } = useBaseParams();
  const contentString = getContentString(lang);

  function handleClick(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      });
    }
  }

  return (
    <nav>
      <Heading as="h3" size="xs" className="mb-4">
        {contentString}
      </Heading>
      <ul className="flex flex-col gap-y-2">
        {titles.map((title) => (
          <li key={title}>
            <button
              onClick={() => handleClick(title)}
              className="transition-color max-w-xs scroll-smooth text-left text-sm font-medium text-brand-mid-grey duration-100 ease-in-out hover:text-brand-dark-grey focus:text-brand-dark-grey"
            >
              {title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function getContentString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Content';
    case 'no':
      return 'Innhold';
    default:
      return 'Innhold';
  }
}
