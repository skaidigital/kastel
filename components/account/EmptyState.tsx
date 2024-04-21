import { Button } from '@/components/Button';
import { CustomLink } from '@/components/CustomLink';

interface Props {
  icon: React.ReactNode;
  heading: string;
  text: string;
  href: string;
}

export function EmptyState({ icon, heading, text, href }: Props) {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center rounded-[4px] border border-brand-light-grey bg-brand-sand py-10 lg:py-20">
        <div className="mb-2 rounded-full bg-white p-4">{icon}</div>
        <h2 className="mb-8 max-w-xs text-balance text-center text-heading-xs font-bold">
          {heading}
        </h2>
        <Button asChild size="sm">
          <CustomLink href={href}>{text}</CustomLink>
        </Button>
      </div>
    </>
  );
}
