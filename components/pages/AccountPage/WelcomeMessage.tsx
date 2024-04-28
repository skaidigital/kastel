import { Heading } from '@/components/base/Heading';
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer';
import { cn } from '@/lib/utils';
import { PortableTextBlock } from 'next-sanity';

interface Props {
  name: string;
  welcomeBackString: string;
  content: PortableTextBlock[];
  className?: string;
}

export function WelcomeMessage({ name, welcomeBackString, content, className }: Props) {
  console.log('name:', name);

  return (
    <div
      className={cn(
        'flex h-fit flex-col gap-y-4 rounded-[4px] bg-brand-primary p-4 text-white lg:p-6',
        className
      )}
    >
      <Heading size="xs" className="flex items-center normal-case">
        {welcomeBackString}
        {name ? `, ${name}` : ''}!
      </Heading>
      <div className="*:mt-0">
        <PortableTextRenderer value={content} type="normal" />
      </div>
    </div>
  );
}
