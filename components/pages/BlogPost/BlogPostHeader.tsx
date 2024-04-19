import { Badge } from '@/components/Badge';

interface Props {
  readTime?: string;
  title: string;
}

export function BlogPostHeader({ readTime, title }: Props) {
  return (
    <div className="mx-auto flex w-full max-w-[--blog-post-container-md] flex-col">
      {readTime && <Badge>{readTime}</Badge>}
      {title && <h1 className="text-heading-sm font-bold lg:text-heading-lg">{title}</h1>}
    </div>
  );
}
