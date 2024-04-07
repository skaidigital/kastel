'use client';

import { Container } from '@/components/base/Container';
import { Grid } from '@/components/base/Grid';
import { Section } from '@/components/base/Section';
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer';
import { SanityImage } from '@/components/sanity/SanityImage';
import { TextAndImageProps } from '@/components/shared/PageBuilder/hooks';
import { leftFadeAnimation, rightFadeAnimation } from '@/lib/animations';
import { cn } from '@/lib/utils';
import clsx from 'clsx';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useInView } from 'react-intersection-observer';
import { checkIfDraftMode } from './ContactForm/actions';

interface Props {
  data: TextAndImageProps;
}

// TODO make animation only work on desktop
export const TextAndImage = ({ data }: Props) => {
  const {
    richText,
    image,
    imageLeftOrRight,
    size,
    textPlacement,
    hasBottomBorder,
    padding,
    hasTopPadding,
    hasBottomPadding
  } = data;

  const borderClasses =
    hasBottomBorder && size === 'fullWidth' ? 'border-b border-brand-border' : '';

  if (size === 'contained') {
    return (
      // TODO set the correct ARIA labels
      <Section
        size={padding}
        noBottomPadding={!hasBottomPadding}
        noTopPadding={!hasTopPadding}
        srHeading="Text and image section"
        label="Text and image section"
      >
        <Container>
          <Content
            richText={richText}
            image={image}
            imageLeftOrRight={imageLeftOrRight}
            textPlacement={textPlacement}
          />
        </Container>
      </Section>
    );
  }

  return (
    <Section
      size={padding}
      noBottomPadding={!hasBottomPadding}
      noTopPadding={!hasTopPadding}
      srHeading="Text and image section"
      label="Text and image section"
    >
      <Content
        richText={richText}
        image={image}
        imageLeftOrRight={imageLeftOrRight}
        textPlacement={textPlacement}
        className={borderClasses}
      />
    </Section>
  );
};

interface ContentProps {
  richText: TextAndImageProps['richText'];
  image: TextAndImageProps['image'];
  imageLeftOrRight: TextAndImageProps['imageLeftOrRight'];
  textPlacement: TextAndImageProps['textPlacement'];
  className?: string;
}

function Content({ richText, image, imageLeftOrRight, textPlacement, className }: ContentProps) {
  const [isDraftMode, setIsDraftMode] = useState(false);
  const controls = useAnimation();

  const { ref, inView } = useInView();

  useEffect(() => {
    checkIfDraftMode().then((res) => {
      setIsDraftMode(res);
    });
  }, []);

  useEffect(() => {
    if (inView && !isDraftMode) {
      controls.start('show');
    }

    if (inView && isDraftMode) {
      controls.start('show');
    }
  }, [inView, controls, isDraftMode]);

  return (
    <Grid
      className={cn(
        'gap-y-10 overflow-hidden overflow-x-hidden py-10 lg:gap-y-0 lg:py-0',
        className
      )}
    >
      <div
        className={clsx('col-span-2 px-4 lg:row-start-1 lg:px-0', {
          'lg:col-start-3 lg:ml-14': imageLeftOrRight === 'left',
          'lg:col-start-1 lg:ml-14 xl:ml-0': imageLeftOrRight === 'right'
        })}
      >
        <div
          className={cn(
            'flex h-full w-full justify-center',
            textPlacement === 'top' && 'items-start',
            textPlacement === 'center' && 'items-center',
            textPlacement === 'bottom' && 'items-end'
          )}
        >
          {richText && (
            <div className="max-w-md [&>*:first-child]:pt-0">
              <PortableTextRenderer value={richText} />
            </div>
          )}
        </div>
      </div>
      {!isDraftMode && (
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={imageLeftOrRight === 'left' ? leftFadeAnimation : rightFadeAnimation}
          className={clsx('relative col-span-2 lg:row-start-1', {
            'lg:col-start-1': imageLeftOrRight === 'left',
            'lg:col-start-3': imageLeftOrRight === 'right'
          })}
        >
          {image && (
            <SanityImage
              image={image}
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          )}
        </motion.div>
      )}
      {isDraftMode && (
        <div
          className={clsx(' relative col-span-2 lg:row-start-1', {
            'lg:col-start-1': imageLeftOrRight === 'left',
            'lg:col-start-3': imageLeftOrRight === 'right'
          })}
        >
          {image && (
            <SanityImage
              image={image}
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          )}
        </div>
      )}
    </Grid>
  );
}
