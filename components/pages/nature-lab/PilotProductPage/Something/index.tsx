'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs'
import { Container } from '@/components/base/Container'
import { Section } from '@/components/base/Section'
import { useState } from 'react'

type Tab = 'idea' | 'something' | 'else'

export function Something() {
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
            <SelectItem value="something">Something</SelectItem>
            <SelectItem value="else">Else</SelectItem>
          </SelectContent>
        </Select>
        {activeTab === 'idea' && <IdeaContent />}
        {activeTab === 'something' && <SomethingContent />}
        {activeTab === 'else' && <ElseContent />}
      </Container>

      {/* Desktop */}
      <Tabs
        defaultValue={activeTab}
        onValueChange={(value) => setActiveTab(value as Tab)}
        className="hidden lg:block"
      >
        <div className="border-y border-neutral-400">
          <Container size="natureLab">
            <TabsList className="justify-between flex">
              <TabsTrigger value="idea">Idea</TabsTrigger>
              <TabsTrigger value="something">Something</TabsTrigger>
              <TabsTrigger value="else">Else</TabsTrigger>
            </TabsList>
          </Container>
        </div>
        <Container size="natureLab">
          <TabsContent value="idea">
            <IdeaContent />
          </TabsContent>
          <TabsContent value="something">
            <SomethingContent />
          </TabsContent>
          <TabsContent value="else">
            <ElseContent />
          </TabsContent>
        </Container>
      </Tabs>
    </Section>
  )
}

function IdeaContent() {
  return <div>Idea</div>
}

function SomethingContent() {
  return <div>Something</div>
}

function ElseContent() {
  return <div>Else</div>
}
