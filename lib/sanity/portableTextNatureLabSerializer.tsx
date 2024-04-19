import Video from '@/components/Video';
import { Heading } from '@/components/base/Heading';
import { ListItem } from '@/components/base/ListItem';
import { OL } from '@/components/base/OL';
import { Text } from '@/components/base/Text';
import { UL } from '@/components/base/UL';
import { SanityImage } from '@/components/sanity/SanityImage';
import { getSlug } from '@/lib/sanity/getSlug';
import Link from 'next/link';

export const portableTextNatureLabSerializer = {
  block: {
    normal: ({ children }: any) => (
      <p className="mt-6 font-nature-lab-body text-nature-lab-md text-brand-mid-grey">{children}</p>
    ),
    default: ({ children }: any) => <p className="mt-6 text-nature-lab-md">{children}</p>,
    small: ({ children }: any) => (
      <Text className="mt-6" as="p" size="sm">
        {children}
      </Text>
    ),
    large: ({ children }: any) => (
      <Text className="mt-6" as="p" size="lg">
        {children}
      </Text>
    ),
    h2: ({ children }: any) => (
      <Heading as="h2" size="md" className="mb-4 pt-8 md:pt-12 lg:pt-14">
        {children}
      </Heading>
    ),
    h3: ({ children }: any) => (
      <Heading as="h3" size="sm" className="mb-4 pt-6 md:pt-10 lg:pt-12">
        {children}
      </Heading>
    )
  },
  list: {
    bullet: ({ children, value }: any) => {
      const { level } = value;

      return <UL level={level}>{children}</UL>;
    },
    number: ({ children, value }: any) => {
      const { level } = value;

      return <OL level={level}>{children}</OL>;
    }
  },
  listItem: {
    bullet: ({ children, value }: any) => {
      const { level } = value;
      return <ListItem level={level}>{children}</ListItem>;
    },
    number: ({ children, value }: any) => {
      const { level } = value;
      return <ListItem level={level}>{children}</ListItem>;
    }
  },

  marks: {
    strong: ({ children }: any) => <strong>{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    muted: ({ children }: any) => <Text>{children}</Text>,
    inlineLink: ({ children, value }: any) => {
      const href = getSlug(value.link);

      return (
        <Link href={href} className="underline">
          {children}
        </Link>
      );
    }
  },

  // # Custom types
  types: {
    figure: ({ value }: any) => {
      return (
        <figure className="my-10">
          <SanityImage image={value} />
          {value.caption && (
            <figcaption>
              <Text size="eyebrow" as="p" className="mt-3">
                {value.caption}
              </Text>
            </figcaption>
          )}
        </figure>
      );
    },
    video: ({ value }: any) => {
      return (
        <div className="aspect-h-9 aspect-w-16 relative mt-6 w-full">
          <Video playbackId={value.videoUrl} loading="lazy" resolution="HD" controlled />
        </div>
      );
    }
  }
};
