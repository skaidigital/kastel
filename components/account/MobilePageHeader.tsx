import { CustomLink } from '@/components/CustomLink';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Text } from '@/components/base/Text';
import { ROUTES } from '@/data/constants';
import { ChevronLeftIcon } from '@radix-ui/react-icons';

interface Props {
  pageTitle: string;
}

export function MobilePageHeader({ pageTitle }: Props) {
  return (
    <Container className="mb-8 flex flex-col gap-y-2 lg:hidden">
      <CustomLink href={ROUTES.ACCOUNT} className="flex items-center gap-x-2">
        <ChevronLeftIcon className="size-4" />
        <Text size="sm" className="text-brand-mid-grey">
          Account
        </Text>
      </CustomLink>
      <Heading as="h1" size="md">
        {pageTitle}
      </Heading>
    </Container>
  );
}
