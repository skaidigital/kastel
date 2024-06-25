'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs'
import { Container } from '@/components/base/Container'
import { Section } from '@/components/base/Section'
import { Status } from '@/components/pages/nature-lab/PilotProductPage/Status'
import { TheSustainableIdea } from '@/components/pages/nature-lab/PilotProductPage/TheSustainableIdea'
import { Updates } from '@/components/pages/nature-lab/PilotProductPage/Updates'
import { LangValues } from '@/data/constants'
import { useState } from 'react'

type Tab = 'idea' | 'status' | 'updates'

interface Props {
  lang: LangValues
}

export function DetailedInfo({ lang }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('idea')
  console.log(activeTab)

  return (
    <Section label="Something" srHeading="Something" noTopPadding className="bg-nature-lab-beige">
      {/* Mobile */}
      <Container size="natureLab" className="lg:hidden">
        <Select value={activeTab} onValueChange={(value) => setActiveTab(value as Tab)}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="idea">Idea</SelectItem>
            <SelectItem value="status">Status</SelectItem>
            <SelectItem value="updates">Updates</SelectItem>
          </SelectContent>
        </Select>
        <div className="mt-10">
          {activeTab === 'idea' && <TheSustainableIdea lang={lang} />}
          {activeTab === 'status' && <Status />}
          {activeTab === 'updates' && <Updates />}
        </div>
      </Container>

      {/* Desktop */}
      <Tabs
        defaultValue={activeTab}
        onValueChange={(value) => setActiveTab(value as Tab)}
        className="hidden lg:block"
      >
        <div className="border-y border-neutral-400">
          <Container size="natureLab">
            <TabsList className="justify-between flex font-nature-lab-body text-nature-lab-lg uppercase">
              <TabsTrigger value="idea" className="uppercase">
                The Sustainable Idea
              </TabsTrigger>
              <TabsTrigger value="status" className="uppercase">
                Status
              </TabsTrigger>
              <TabsTrigger value="updates" className="uppercase">
                Updates
              </TabsTrigger>
            </TabsList>
          </Container>
        </div>
        <Container size="natureLab" className="mt-20">
          <TabsContent value="idea">
            <TheSustainableIdea lang={lang} />
          </TabsContent>
          <TabsContent value="status">
            <Status />
          </TabsContent>
          <TabsContent value="updates">
            <Updates />
          </TabsContent>
        </Container>
      </Tabs>
    </Section>
  )
}
