import { Heading } from '@/components/base/Heading';
import { cn } from '@/lib/utils';
import { PortableTextBlock } from 'next-sanity';

interface Props {
  name: string;
  welcomeBackString: string;
  content: PortableTextBlock[];
  className?: string;
}

export function WelcomeMessage({ name, welcomeBackString, content, className }: Props) {
  return (
    <div
      className={cn(
        'flex h-fit flex-col gap-y-4 bg-brand-primary p-4 text-white lg:gap-y-6 lg:p-6',
        className
      )}
    >
      <Heading size="xs" className="flex items-center normal-case">
        {welcomeBackString}
        {name ? `, ${name}` : ''}!
      </Heading>
      {/* <PortableTextRenderer value={content} type="normal" /> */}
    </div>
  );
}
