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

interface Props {
  name: string;
  email: string;
  message: string;
}

export const ContactFormEmailTemplate = ({
  name = 'Navn Navnesen',
  email = 'mail@mail.com',
  message = 'Dette er min melding som jeg sender til deg. Den er skikkelig kul'
}: Props) => (
  <Html>
    <Head />
    <Preview>Kontaktskjema på nettsiden</Preview>
    <Tailwind>
      <Body style={main}>
        <Container className="m-auto w-[560px] p-5 pb-12">
          <Heading className="pt-4 text-4xl font-light leading-snug tracking-tighter text-gray-800">
            Kontaktskjema på nettsiden
          </Heading>
          <Text className="m-0 mb-4 text-sm leading-relaxed text-gray-800">
            {name} ({email}) har fylt ut kontaktskjemaet på nettsiden.
          </Text>
          <Text className="m-0 mb-4 text-sm leading-relaxed text-gray-800">Melding: {message}</Text>
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

export default ContactFormEmailTemplate;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
};

const reportLink = {
  fontSize: '14px',
  color: '#b4becc'
};
