'use client';

import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';

export const InstagramFeed = () => {
  return (
    <Section size="sm" label="page-title" srHeading="Page title">
      <Container size="sm" className="flex flex-col items-center justify-center space-y-10">
        <Heading as="h2" size="md" className="text-center">
          Instagram feed
        </Heading>
      </Container>
    </Section>
  );
};
