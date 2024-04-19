'use client';

import { UserError } from '@/app/(site)/[market]/[lang]/shopify/types';
import { Dictionary } from '@/app/dictionaries';
import { BackButton } from '@/components/BackButton';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Checkbox } from '@/components/form/Checkbox';
import { ComboBox, ComboBoxItem } from '@/components/form/Combobox';
import { Form } from '@/components/form/Form';
import { FormError } from '@/components/form/FormError';
import { SubmitButton } from '@/components/form/SubmitButton';
import { TextField } from '@/components/form/TextField';
import { createAddress } from '@/components/pages/CreateAddressPage/actions';
import { ROUTES } from '@/data/constants';
import countries from '@/data/countries';
import { useFormState } from 'react-dom';

interface Props {
  dictionary: Dictionary['create_address_page'];
}

export function CreateAddressPage({ dictionary }: Props) {
  const [formState, formAction] = useFormState(createAddress, null);

  return (
    <Section srHeading="Create address" label="Create address" className="md:px-12 lg:px-20">
      <Container size="sm">
        <Form action={formAction} validationErrors={formState?.errors}>
          <BackButton href={ROUTES.ADDRESSES}>{dictionary.addresses}</BackButton>
          <Heading size="md">{dictionary.new_address}</Heading>
          <TextField
            name="firstName"
            label={dictionary.first_name}
            autoComplete="given-name"
            isRequired
          />
          <TextField
            name="lastName"
            label={dictionary.last_name}
            autoComplete="family-name"
            isRequired
          />
          <TextField
            name="address1"
            label={dictionary.address1}
            autoComplete="address-line1"
            isRequired
          />
          <TextField
            name={dictionary.address2}
            label="Adresselinje 2"
            autoComplete="address-line2"
          />
          <TextField name="zip" label={dictionary.zip} autoComplete="postal-code" isRequired />
          <TextField name="city" label={dictionary.city} autoComplete="address-level2" isRequired />
          <ComboBox name="territoryCode" label={dictionary.country} isRequired>
            {countries.map((country) => (
              <ComboBoxItem key={country.value} id={country.value.toUpperCase()}>
                {country.label}
              </ComboBoxItem>
            ))}
          </ComboBox>
          <TextField
            name="phoneNumber"
            label={dictionary.phone_number}
            autoComplete="tel"
            isRequired
          />
          <TextField name="email" label={dictionary.email} autoComplete="email" isRequired />
          <Checkbox name="defaultAddress" value="true">
            {dictionary.default_address}
          </Checkbox>
          <SubmitButton>{dictionary.create_address}</SubmitButton>
          {formState?.userErrors && (
            <div className="flex flex-col gap-y-2">
              {formState.userErrors.map((error: UserError) => (
                <FormError key={error.message} error={error.message} />
              ))}
            </div>
          )}
        </Form>
      </Container>
    </Section>
  );
}
