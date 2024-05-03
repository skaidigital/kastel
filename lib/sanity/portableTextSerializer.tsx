import Video from '@/components/Video';
import { Heading } from '@/components/base/Heading';
import { ListItem } from '@/components/base/ListItem';
import { OL } from '@/components/base/OL';
import { Text } from '@/components/base/Text';
import { UL } from '@/components/base/UL';
import { SanityImage } from '@/components/sanity/SanityImage';
import { SanityLink } from '@/components/sanity/SanityLink';

export const portableTextSerializer = {
  block: {
    normal: ({ children }: any) => (
      <Text className="mt-6" as="p" size="md">
        {children}
      </Text>
    ),
    default: ({ children }: any) => (
      <Text className="mt-8" as="p">
        {children}
      </Text>
    ),
    'text-sm': ({ children }: any) => (
      <Text className="mt-4" as="p" size="sm">
        {children}
      </Text>
    ),
    large: ({ children }: any) => (
      <Text className="mt-8" as="p" size="lg">
        {children}
      </Text>
    ),
    h2: ({ children }: any) => (
      <Heading as="h2" size="md" className="mt-7 pt-8 md:pt-12 lg:pt-14">
        {children}
      </Heading>
    ),
    h3: ({ children }: any) => (
      <Heading as="h3" size="sm" className="mt-12">
        {children}
      </Heading>
    )
  },
  list: {
    bullet: ({ children, value }: any) => {
      const { level } = value;

      return (
        <UL level={level} className="mt-4">
          {children}
        </UL>
      );
    },
    number: ({ children, value }: any) => {
      const { level } = value;

      return (
        <OL level={level} className="mt-4">
          {children}
        </OL>
      );
    }
  },
  listItem: {
    bullet: ({ children, value }: any) => {
      const { level } = value;
      return (
        <ListItem level={level} className="mt-0 pt-0">
          {children}
        </ListItem>
      );
    },
    number: ({ children, value }: any) => {
      const { level } = value;
      return (
        <ListItem level={level} className="mt-0 pt-0">
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
    figure: ({ value }: any) => {
      return (
        <figure className="my-10">
          <SanityImage image={value} />
          {value.caption && (
            <figcaption>
              <Text size="eyebrow" as="span" className="mt-3">
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
