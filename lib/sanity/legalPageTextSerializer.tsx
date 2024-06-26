import { ListItem } from '@/components/base/ListItem';
import { OL } from '@/components/base/OL';
import { Text } from '@/components/base/Text';
import { UL } from '@/components/base/UL';
import { SanityLink } from '@/components/sanity/SanityLink';

export const legalPageTextSerializer = {
  block: {
    normal: ({ children }: any) => <p className="mt-8 text-sm text-brand-mid-grey">{children}</p>,
    default: ({ children }: any) => <p className="mt-8 text-sm text-brand-mid-grey">{children}</p>,
    h2: ({ children }: any) => (
      <h2 style={{ marginBottom: '-16px' }} className="mt-12 text-heading-sm font-bold uppercase">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 style={{ marginBottom: '-16px' }} className="mt-12 text-heading-xs font-bold uppercase">
        {children}
      </h3>
    )
  },
  list: {
    bullet: ({ children, value }: any) => {
      const { level } = value;

      return (
        <UL level={level} className="mt-4 flex flex-col gap-y-2">
          {children}
        </UL>
      );
    },
    number: ({ children, value }: any) => {
      const { level } = value;

      return (
        <OL level={level} className="mt-4 flex flex-col gap-y-2">
          {children}
        </OL>
      );
    }
  },
  listItem: {
    bullet: ({ children, value }: any) => {
      const { level } = value;
      return (
        <ListItem level={level} className="pt-0 text-sm text-brand-mid-grey md:text-sm lg:text-sm">
          {children}
        </ListItem>
      );
    },
    number: ({ children, value }: any) => {
      const { level } = value;
      return (
        <ListItem level={level} className="pt-0 text-sm text-brand-mid-grey md:text-sm lg:text-sm">
          {children}
        </ListItem>
      );
    }
  },

  marks: {
    strong: ({ children }: any) => <strong>{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    muted: ({ children }: any) => <Text>{children}</Text>,
    inlineLink: ({ children, value }: any) => (
      <SanityLink link={value.link} className="underline">
        {children}
      </SanityLink>
    )
  },

  // # Custom types
  types: {
    // Add image
  }
};
