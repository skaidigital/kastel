import { Container } from '@/components/base/Container'
import { Section } from '@/components/base/Section'
import { HeroImage } from '@/components/pages/nature-lab/HeroImage'
import { Summary } from '@/components/pages/nature-lab/Phase3BlogPost/Summary'
import { Phase3BlogPostPayload } from '@/components/pages/nature-lab/Phase3BlogPost/hooks'
import { LangValues } from '@/data/constants'
import { portableTextNatureLabSerializer } from '@/lib/sanity/portableTextNatureLabSerializer'
import { PortableText } from '@portabletext/react'

interface Props {
  data: Phase3BlogPostPayload
  lang: LangValues
}

export function Phase3BlogPost({ data, lang }: Props) {
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
      {data?.content && (
        <Container size="natureLab" className="noMarginFirstChild mt-10">
          <PortableText value={data.content} components={portableTextNatureLabSerializer} />
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
