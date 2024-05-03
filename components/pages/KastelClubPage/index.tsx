import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/Accordion';
import { Container } from '@/components/base/Container';
import { KastelClubPageMarquee } from '@/components/pages/KastelClubPage/Marquee';
import { Section } from '@/components/pages/KastelClubPage/Section';
import { KastelClubPagePayload } from '@/components/pages/KastelClubPage/hooks';
import { portableTextSerializer } from '@/lib/sanity/portableTextSerializer';
import { cn } from '@/lib/utils';
import { PortableText } from 'next-sanity';

interface Props {
  data: KastelClubPagePayload;
}

export async function KastelClubPage({ data }: Props) {
  const { waysToEarn, faq, perks } = data;

  return (
    <div>
      <div>
        <div className="h-[400px] bg-blue-50">hero hero</div>
        <KastelClubPageMarquee />
      </div>

      <div className="my-20 flex flex-col gap-y-20 lg:my-40 lg:gap-y-40">
        {/* Ways to earn */}
        {waysToEarn && <Section section={waysToEarn} />}

        {/* Perks */}
        <Container className="flex flex-col gap-y-10 lg:mx-auto lg:max-w-[680px]">
          <div className="flex flex-col gap-y-4">
            {perks.title && (
              <h2 className="text-heading-lg font-bold uppercase lg:text-heading-xl">
                {perks.title}
              </h2>
            )}
            {perks.description && (
              <p className="text-balance text-sm lg:text-md">{perks.description}</p>
            )}
          </div>
          {perks.table && (
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="divide-y divide-gray-200  bg-white">
                {perks.table?.rows?.map((row, rowIndex) => (
                  <tr
                    key={`row-${rowIndex}`}
                    className={cn(
                      rowIndex === 0
                        ? 'text-overline-sm font-medium uppercase tracking-widest lg:text-overline-md'
                        : 'text-sm text-brand-mid-grey lg:text-md'
                    )}
                  >
                    {row.cells.map((cell, cellIndex) => (
                      <td key={`cell-${cellIndex}`} className="whitespace-nowrap py-6 ">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Container>

        {/* FAQ */}
        {faq && (
          <Container className="flex flex-col gap-y-10 lg:mx-auto lg:max-w-[680px]">
            {faq.title && (
              <h2 className="text-heading-lg font-bold uppercase lg:text-heading-xl">
                {faq.title}
              </h2>
            )}
            {faq.questions && (
              <Accordion collapsible type="single" className="lg:col-span-5 lg:col-start-7">
                {faq.questions?.map((item) => (
                  <AccordionItem value={item.question} key={item.question}>
                    <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                    <AccordionContent>
                      <PortableText value={item.answer} components={portableTextSerializer} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </Container>
        )}
      </div>
    </div>
  );
}
