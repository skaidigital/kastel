'use client';

import { groq } from 'next-sanity';
import { useEffect, useState } from 'react';
import { FieldProps, useClient, useFormValue } from 'sanity';

export function FeaturedOptionField(props: FieldProps) {
  const [hidden, setHidden] = useState<boolean>(true);

  const client = useClient({ apiVersion: `2023-04-01` });
  const form = useFormValue([]);

  const { renderDefault } = props;

  // @ts-expect-error - TS doesn't know that the path is an array
  const selectedOptionTypeRef = form?.options?.map((option: any) => option.optionType._ref);

  const query = groq`*[_type == "productOptionType" && _id in $selectedOptionTypeRef].type`;

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(query, { selectedOptionTypeRef });

      const shouldBeHidden = !data.includes('size');

      setHidden(shouldBeHidden);

      return data;
    }
    fetchData();
  }, []);

  if (hidden) {
    return null;
  }

  return renderDefault(props);
}
