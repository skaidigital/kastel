import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { AddCommentForm } from '@/components/pages/nature-lab/Phase1BlogPost/AddCommentForm';
import { Comment } from '@/components/pages/nature-lab/Phase1BlogPost/Comment';
import { Phase1BlogPostPayload } from '@/components/pages/nature-lab/Phase1BlogPost/hooks';

interface Props {
  data: Phase1BlogPostPayload;
  slug: string;
}

export function Phase1BlogPost({ data, slug }: Props) {
  return (
    <Section label="natureLabInnovationPhase1BlogPost" srHeading="Nature Lab phase 1 blog post">
      <Container size="sm">
        <div className="flex flex-col gap-y-20">
          <div className="flex flex-col gap-y-5">
            <Heading>Comment</Heading>
            {data?.comments && (
              <div className="flex flex-col gap-y-2 divide-y divide-brand-light-grey">
                {data.comments?.map((comment) => (
                  <Comment key={comment.id} comment={comment} className="py-4" />
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-y-5">
            <Heading>Add comment</Heading>
            <AddCommentForm documentId={data.id} slug={slug} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
