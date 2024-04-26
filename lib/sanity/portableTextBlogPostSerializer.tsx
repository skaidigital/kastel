import { AspectRatio } from '@/components/AspectRatio';
import VideoWithSettings from '@/components/VideoWithSettings';
import { ListItem } from '@/components/base/ListItem';
import { OL } from '@/components/base/OL';
import { Text } from '@/components/base/Text';
import { UL } from '@/components/base/UL';
import { BlogWidthContainer } from '@/components/pages/BlogPost/BlogWidthContainer';
import { SanityImage } from '@/components/sanity/SanityImage';
import { getSlug } from '@/lib/sanity/getSlug';
import Link from 'next/link';

export const portableTextBlogPostSerializer = {
  block: {
    'text-sm': ({ children }: any) => (
      <Text
        className="mx-auto mt-6 max-w-[--blog-post-container-md] text-brand-mid-grey"
        as="p"
        size="sm"
      >
        {children}
      </Text>
    ),
    normal: ({ children }: any) => (
      <Text className="mx-auto mt-6 max-w-[--blog-post-container-md] text-brand-mid-grey" as="p">
        {children}
      </Text>
    ),
    'text-lg': ({ children }: any) => (
      <Text
        className="mx-auto mt-6 max-w-[--blog-post-container-md] text-brand-mid-grey"
        as="p"
        size="lg"
      >
        {children}
      </Text>
    ),
    h2: ({ children }: any) => (
      <h2 className="mx-auto mt-12 max-w-[--blog-post-container-md] text-heading-sm font-bold">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mx-auto mt-8 max-w-[--blog-post-container-md] text-heading-xs font-bold">
        {children}
      </h3>
    )
  },
  list: {
    bullet: ({ children, value }: any) => {
      const { level } = value;

      return (
        <UL
          level={level}
          className="mx-auto mt-5 flex max-w-[--blog-post-container-md] flex-col gap-y-2"
        >
          {children}
        </UL>
      );
    },
    number: ({ children, value }: any) => {
      const { level } = value;

      return (
        <OL
          level={level}
          className="mx-auto mt-5 flex max-w-[--blog-post-container-md] flex-col gap-y-2"
        >
          {children}
        </OL>
      );
    }
  },
  listItem: {
    bullet: ({ children, value }: any) => {
      const { level } = value;
      return (
        <ListItem level={level} className="pt-0 text-md text-brand-mid-grey md:text-md lg:text-md">
          <Text>{children}</Text>
        </ListItem>
      );
    },
    number: ({ children, value }: any) => {
      const { level } = value;
      return (
        <ListItem level={level} className="pt-0 text-md text-brand-mid-grey md:text-md lg:text-md">
          <Text>{children}</Text>
        </ListItem>
      );
    }
  },

  marks: {
    strong: ({ children }: any) => <strong>{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    muted: ({ children }: any) => <Text>{children}</Text>,
    inlineLink: ({ children, value }: any) => {
      console.log('inside inlineLink', value);

      const href = getSlug(value.link);

      return (
        <Link href={href} className="underline">
          {children}
        </Link>
      );
    },
    productLink: ({ children, value }: any) => {
      console.log('inside productLink', value);

      return <div>prodc link</div>;
      // return (
      //   <HoverCard>
      //     <HoverCardTrigger className="cursor-pointer bg-brand-primary px-1 text-md font-medium text-white">
      //       {children}
      //     </HoverCardTrigger>
      //     <HoverCardContent side="top" className="relative w-[320px] border-none p-0">
      //       {value.product && (
      //         <ProductCard
      //           gid={value.product.gid}
      //           sku={value.product.sku}
      //           minVariantPrice={value.product.minVariantPrice}
      //           maxVariantPrice={value.product.maxVariantPrice}
      //           highestSize={value.product.highestSize}
      //           lowestSize={value.product.lowestSize}
      //           sizes={value.product.sizes}
      //           title={value.product.title}
      //           mainImage={value.product.image}
      //           lifestyleImage={value.product.image}
      //           badges={value.product.badges}
      //           slug={value.product.slug}
      //           type="product"
      //         />
      //       )}
      //     </HoverCardContent>
      //   </HoverCard>
      // );
    }
  },

  // # Custom types
  types: {
    image: ({ value }: any) => {
      console.log(value);

      return (
        <BlogWidthContainer width={value.width} className="relative">
          <figure className="my-10">
            {value?.asset?._ref && <SanityImage image={value} />}
            {value.caption && (
              <figcaption>
                <Text size="eyebrow" as="p" className="mt-3">
                  {value.caption}
                </Text>
              </figcaption>
            )}
          </figure>
        </BlogWidthContainer>
      );
    },
    // TODO add caption and alt text
    imageGrid: ({ value }: any) => {
      return (
        <BlogWidthContainer
          width={value.width}
          className="relative mt-12 flex flex-col gap-10 lg:flex-row"
        >
          {value?.images?.map((image: any, index: number) => (
            <AspectRatio
              key={index}
              settings={image?.aspectRatioSettings}
              className="relative flex flex-col justify-start"
            >
              {image?.asset?._ref && <SanityImage image={image} fill className="absolute" />}
            </AspectRatio>
          ))}
        </BlogWidthContainer>
      );
    },
    video: ({ value }: any) => {
      return (
        <BlogWidthContainer width={value.width}>
          <div className="aspect-h-9 aspect-w-16 relative mx-auto mt-6 w-full">
            {value.videoUrl && (
              <VideoWithSettings
                playbackId={value.videoUrl}
                settings={value.videoSettings}
                aspectRatio={value.aspectRatio}
                loading="lazy"
              />
            )}
          </div>
        </BlogWidthContainer>
      );
    }
    // hotspotImage: ({ value }: any) => {
    //   console.log('value for htospot image', value);

    //   return (
    //     <BlogWidthContainer width={value.width} className="mt-6">
    //       {value.aspectRatioSettings && (
    //         <AspectRatio settings={value.aspectRatioSettings} className="relative">
    //           {value.image?.image?.asset?._ref && (
    //             <HotspotImage
    //               image={value.image.image}
    //               hotspots={value.image.hotspots}
    //               type="hotspotImage"
    //             />
    //           )}
    //         </AspectRatio>
    //       )}
    //     </BlogWidthContainer>
    //   );
    // },
    // TODO figure out how to remove mt only for the first child
    // standout: ({ value }: any) => {
    //   return (
    //     <div className="my-6 bg-blue-50 py-10 lg:my-10 lg:py-20">
    //       <BlogWidthContainer width="wide" className="flex flex-col gap-x-10 lg:flex-row">
    //         <div className="flex-1">
    //           {value.content && <PortableTextRenderer value={value.content} type="blogPost" />}
    //         </div>
    //         <div className="flex-1">
    //           {value.type === 'media' && value.media && value.aspectRatioSettings && (
    //             <AspectRatio settings={value.aspectRatioSettings} className="relative">
    //               <Media media={value.media} loading="lazy" />
    //             </AspectRatio>
    //           )}
    //           {value.type === 'product' && value.product && (
    //             <ProductCard
    //               gid={value.product.gid}
    //               sku={value.product.sku}
    //               minVariantPrice={value.product.minVariantPrice}
    //               maxVariantPrice={value.product.maxVariantPrice}
    //               highestSize={value.product.highestSize}
    //               lowestSize={value.product.lowestSize}
    //               sizes={value.product.sizes}
    //               title={value.product.title}
    //               mainImage={value.product.mainImage}
    //               lifestyleImage={value.product.lifestyleImage}
    //               badges={value.product.badges}
    //               slug={value.product.slug}
    //               type="product"
    //             />
    //           )}
    //         </div>
    //       </BlogWidthContainer>
    //     </div>
    //   );
    // }
  }
};
