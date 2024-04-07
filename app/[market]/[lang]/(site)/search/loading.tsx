import { Container } from '@/components/base/Container';
import { Grid } from '@/components/base/Grid';
import { Section } from '@/components/base/Section';
import { Skeleton } from '@/components/Skeleton';

export default function Loading() {
  return (
    <Container>
      <Section size="sm" label="collection-hero" srHeading="Collection hero">
        <div className="flex flex-col items-center  justify-center space-y-3">
          <Skeleton className="h-[48px] w-[155px]" />
          <Skeleton className="h-[24px] w-[185px]" />
        </div>
      </Section>
      <Section label="search-results" srHeading="Search results" noTopPadding>
        <Grid>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </Grid>
      </Section>
    </Container>
  );
}

function Card() {
  return (
    <div className="flex h-[420px] w-full flex-col space-y-3">
      <Skeleton className="h-[380px] w-full" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-14" />
      </div>
    </div>
  );
}
