import { Container } from '@/components/base/Container'
import { Section } from '@/components/base/Section'
import { HeroImage } from '@/components/pages/nature-lab/HeroImage'
import { Comments } from '@/components/pages/nature-lab/Phase1BlogPost/Comments'
import { Summary } from '@/components/pages/nature-lab/Phase1BlogPost/Summary'
import { Update } from '@/components/pages/nature-lab/Phase1BlogPost/Update'
import { Phase1BlogPostPayload } from '@/components/pages/nature-lab/Phase1BlogPost/hooks'
import { LangValues } from '@/data/constants'
import { portableTextNatureLabSerializer } from '@/lib/sanity/portableTextNatureLabSerializer'
import { PortableText } from '@portabletext/react'

interface Props {
  data: Phase1BlogPostPayload
  lang: LangValues
  slug: string
}

export function Phase1BlogPost({ data, lang, slug }: Props) {
  const titleString = getTitleTranslation(lang)

  return (
    <Section
      label="natureLabInnovationPhase1BlogPost"
      srHeading="Nature Lab phase 1 blog post"
      className="bg-nature-lab-beige pt-10 lg:pt-10"
    >
      <Container size="natureLab">
        <div className="flex flex-col gap-y-2 font-nature-lab-body">
          <span className="text-nature-lab-md text-brand-mid-grey">{titleString}:</span>
          {data.title && (
            <h1 className="font-nature-lab-heading text-nature-lab-heading-md uppercase text-nature-lab-dark-grey lg:text-nature-lab-heading-lg">
              {data.title}
            </h1>
          )}
        </div>
      </Container>
      <HeroImage imageMobile={data.imageMobile} imageDesktop={data.imageDesktop} />
      <Summary data={data.summary} lang={lang} />
      <Container size="natureLab">
        {data?.callout && (
          <div className="noMarginFirstChild mt-10 border border-neutral-400 px-6 py-8">
            <PortableText value={data.callout} components={portableTextNatureLabSerializer} />
          </div>
        )}
        {data?.updates && (
          <div className="mt-10 flex flex-col gap-y-20 lg:mt-20 lg:gap-y-24">
            {data.updates.map((update) => (
              <Update data={update} key={update.title} lang={lang} />
            ))}
          </div>
        )}
      </Container>
      {data?.allowComments && (
        <Container size="natureLab" className="mt-20 lg:mt-40">
          <Comments
            documentId={data.id}
            slug={slug}
            comments={data.comments}
            lang={lang}
            description={data.commentsDescription}
          />
        </Container>
      )}
    </Section>
  )
}

function getTitleTranslation(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Tittel'
    case 'en':
      return 'Title'
    default:
      return 'Title'
  }
}
