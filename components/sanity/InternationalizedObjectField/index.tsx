'use client'

import { useValidationInfo } from '@/components/sanity/InternationalizedObjectField/useValidationInfo'
import { LANGS, MARKETS } from '@/data/constants'
import { Card, Tab, TabList, TabPanel } from '@sanity/ui'

import { useState } from 'react'
import { MemberField, ObjectFieldProps } from 'sanity'

// TODO extend to handle multiple errors
export function InternationalizedObjectField(props: ObjectFieldProps) {
  const {
    inputProps,
    inputProps: { members },
    validation,
    renderDefault
  } = props

  const LANGS = props.schemaType.fields.map((field) => field.name)

  const [activePanelId, setActivePanelId] = useState(LANGS[0])

  const activeField = props.schemaType.fields.find((field) => field.name === activePanelId)
  const activeMember = members.find(
    (member) => member.kind === 'field' && member.name === activePanelId
  )

  const DefaultRender = () => (
    <>
      {renderDefault({
        ...props,
        validation: mergedValidation,
        children: null
      })}
    </>
  )

  const { mergedValidation } = useValidationInfo(validation, members)

  return (
    <Card>
      <DefaultRender />
      <TabList space={2}>
        {LANGS.map((lang) => {
          const langData = props.schemaType.fields.find((field) => field.name === lang)
          if (!langData) return null

          const hasError = mergedValidation.find((error) => error.path.at(1) === lang)
            ? true
            : false

          const flag = getFlagByLocale(lang)

          return (
            <Tab
              key={lang}
              aria-controls="content-panel"
              id={lang}
              tone={hasError ? 'critical' : 'default'}
              label={<div className="">{flag}</div>}
              onClick={() => setActivePanelId(lang)}
              selected={activePanelId === lang}
            />
          )
        })}
      </TabList>

      {activeMember && activeMember.kind === 'field' && activeField && (
        <TabPanel
          key={activeField.name}
          aria-labelledby={activeField.name}
          hidden={false}
          id={activeField.name}
        >
          <Card marginTop={2} radius={2}>
            <MemberField
              member={{
                ...activeMember,
                field: {
                  ...activeMember.field,
                  schemaType: { ...activeMember.field.schemaType, title: '' }
                }
              }}
              {...inputProps}
            />
          </Card>
        </TabPanel>
      )}
    </Card>
  )
}

export function getFlagByLocale(locale: string) {
  switch (locale) {
    case 'no':
      return '🇳🇴'
    case 'en':
      return '🇬🇧'
    case 'sv':
      return '🇸🇪'
    default:
      throw new Error(`Unknown locale: ${locale}`)
  }
}

// TODO figure out how to get the types from Sanity
export function generateObjectFields({
  schemaType,
  type
}: {
  schemaType: 'string' | 'richText' | 'richTextNatureLab' | 'slug' | 'richText'
  type: 'lang' | 'market'
}) {
  if (type === 'lang') {
    return LANGS.map((lang) => ({
      name: lang.id,
      type: schemaType,
      title: lang.id
    }))
  }

  return MARKETS.map((market) => ({
    name: market.id,
    type: schemaType,
    title: market.id
  }))
}
