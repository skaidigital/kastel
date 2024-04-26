import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components';
import { NatureLabEmailTemplateProps } from './sendMail';

export const NatureLabEmailTemplate = ({
  name = 'Navn Navnesen',
  email = 'mail@mail.com',
  questionResponse = [
    {
      question: 'Hva er din favorittfarge?',
      answer: 'Blå'
    }
  ],
  natureLabTitle = 'Phase 1'
}: NatureLabEmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>Svar på Nature lab spørsmål på nettside</Preview>
    <Tailwind>
      <Body style={main}>
        <Container className="m-auto w-[560px] p-5 pb-12">
          <Heading className="text-4xl pt-4 font-light leading-snug tracking-tighter text-gray-800">
            Nature lab: {natureLabTitle} svar fra nettside
          </Heading>
          <Text className="m-0 mb-4 text-sm leading-relaxed text-gray-800">
            {name} ({email}) har svart på et nature lab spørsmål.
          </Text>
          {questionResponse.map(({ question, answer }) => (
            <Text key={question} className="m-0 mb-4 text-sm leading-relaxed text-gray-800">
              {question}: {answer}
            </Text>
          ))}
          <Section className="py-5">
            <Button
              className="rounded-lg bg-blue-300 px-6 py-3 font-semibold text-gray-900"
              href={`mailto:${email}`}
            >
              Send de en mail
            </Button>
          </Section>
          <Hr className="my-10 mb-7 border border-gray-300" />
          <Link href="https://skaidigital.com" target="blank" style={reportLink}>
            Fra gutta i Skai Digital
          </Link>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default NatureLabEmailTemplate;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
};

const reportLink = {
  fontSize: '14px',
  color: '#b4becc'
};
