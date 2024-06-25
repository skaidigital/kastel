import { SanityDocument } from 'next-sanity'

export const JsonPreview = ({ document }: SanityDocument) => (
  <>
    <pre>{JSON.stringify(document.displayed, null, 2)}</pre>
  </>
)
