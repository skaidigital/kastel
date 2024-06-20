'use client';

import { Text } from '@/components/base/Text';
import { useState } from 'react';

export function ExpandableText({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);

  const toggleText = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`relative ${expanded ? 'line-clamp-none' : 'line-clamp-3 lg:line-clamp-none'} overflow-hidden`}
    >
      <Text as="p" className="max-w-sm text-brand-mid-grey">
        {children}
      </Text>
      {!expanded && (
        <div className="absolute bottom-0 left-0 h-6 w-full bg-gradient-to-t from-white lg:hidden lg:h-10" />
      )}
      {!expanded && (
        <Text as="span" asChild>
          <button onClick={toggleText} className="absolute bottom-0 right-0 underline lg:hidden">
            Show more
          </button>
        </Text>
      )}
    </div>
  );
}
