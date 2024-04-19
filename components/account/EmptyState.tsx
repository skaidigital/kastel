import { Button } from '@/components/Button';
import { CustomLink } from '@/components/CustomLink';
import { Container } from '@/components/base/Container';

interface Props {
  icon: React.ReactNode;
  heading: string;
  text: string;
  href: string;
}

export function EmptyState({ icon, heading, text, href }: Props) {
  return (
    <Container>
      <div className="flex w-full flex-col items-center justify-center bg-brand-light-grey py-10">
        <div className="mb-2 rounded-full bg-white p-4">{icon}</div>
        <h2 className="mb-8 max-w-xs text-balance text-center text-heading-xs font-bold">
          {heading}
        </h2>
        <Button asChild>
          <CustomLink href={href}>{text}</CustomLink>
        </Button>
      </div>
    </Container>
  );
}
