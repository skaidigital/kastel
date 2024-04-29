// TODO add a page in Sanity for the blog landing page ?
// export async function generateMetadata({
//     params: { lang, }
//   }: {
//     params: {  lang: LangValues };
//   }): Promise<Metadata> {
//     const metadata = await loadMetadata({
//       market,
//       slug,
//       schemaType: 'blog'
//     });

//     const title = metadata?.metaTitle;
//     const description = metadata?.metaDescription;
//     const shouldIndex = !metadata?.noIndex;
//     const shouldFollow = !metadata?.noFollow;
//     const ogImage = metadata?.ogImage;
//     const ogImageUrl = ogImage ? urlForOpenGraphImage(ogImage) : undefined;

//     return {
//       ...(title && { title }),
//       ...(description && { description }),
//       ...(ogImageUrl && {
//         openGraph: {
//           images: [ogImageUrl]
//         }
//       }),
//       robots: {
//         index: shouldIndex,
//         follow: shouldFollow,
//         googleBot: {
//           index: shouldIndex,
//           follow: shouldFollow
//         }
//       }
//     };
//   }
