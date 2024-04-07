import { ConfiguratorContainer } from '@/components/pages/ConfiguratorPage/ConfiguratorContainer';
import { SanityImageProps } from '@/lib/sanity/types';

export default function Page() {
  const hasImages = MOCK_IMAGES.length > 0;
  const variableName = 'variant';
  const isOnLastStep = false;

  return (
    <ConfiguratorContainer>
      {/* <ConfiguratorMediaContainer> */}
      {!isOnLastStep && (
        <>
          {/* <ActiveImage images={MOCK_IMAGES} variableName={variableName} />
            {hasImages && <ArrowButtons images={MOCK_IMAGES} variableName={variableName} />}
            {hasImages && (
              <div className="absolute bottom-0 left-0 w-full">
                <ImageThumbnails images={MOCK_IMAGES} variableName={variableName} />
              </div>
            )} */}
        </>
      )}
      {isOnLastStep && (
        <>
          {/* <div className="hidden h-full w-full grid-cols-2 lg:grid">
              {MOCK_IMAGES?.map((image) => (
                <div className="relative h-full w-full" key={image.asset._ref}>
                  <SanityImage image={image} fill className="absolute" />
                </div>
              ))}
            </div>
            <MobileCarousel images={MOCK_IMAGES} /> */}
        </>
      )}
      {/* </ConfiguratorMediaContainer> */}
      {/* <ConfiguratorActions images={MOCK_IMAGES} variableName={variableName} /> */}
    </ConfiguratorContainer>
  );
}

// Same as the ones we fetch in all other pages and components
const MOCK_IMAGES: SanityImageProps[] = [
  {
    asset: {
      _ref: 'image-199d76aea0262b63bd515ffbca6e6ff0177713c5-600x900-webp',
      metadata: {
        lqip: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAeABQDASIAAhEBAxEB/8QAGQAAAwADAAAAAAAAAAAAAAAAAAUHAgYI/8QAJBAAAQMEAAcBAQAAAAAAAAAAAQIDBAAFBhEHEhMhMUFRCCP/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8AvTjiG9c6gN/ayBBHY1N+JebDG8px239HqJlu/wBN/CdVq9ozSe5xhlQHX+WG28I4b9KBFJBcaKKKCA/oONIVnGKSWo7zrbSgpZbQVa0oVPb7LejZpd70wlbTiZaVtNrGlHWvVdfLbQsgrQlRHjY3S6VYLTKkmRJt0V14+VqbBNWXAuxzJ0Xizx5qI7g50jY1713op/HjsxmktR2kNtp8JSNAUVB//9k='
      }
    },
    altText: undefined,
    crop: { top: 0, bottom: 0.003720616957720635, left: 0, right: 0 },
    hotspot: {
      height: 0.620037971047794,
      width: 0.6743451286764705,
      x: 0.5,
      y: 0.4515937212775735
    }
  },
  {
    asset: {
      _ref: 'image-e8e98894349317074ebbdc7b9ede388cce25dd1b-1366x2048-jpg',
      metadata: {
        lqip: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAeABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAMBAgUE/8QAHxAAAwACAgIDAAAAAAAAAAAAAAECESEDMQRBM1Fx/8QAFwEBAAMAAAAAAAAAAAAAAAAAAAEDBP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AOWpWXTeW/YhpVyL9HWxPjUru+8y+zYpPePoCr76AkK5LSe6WS/B8eV72ZvJSjGtvRqRKmJS9IAa2BIAf//Z'
      }
    },
    altText: undefined,
    crop: undefined,
    hotspot: undefined
  },
  {
    asset: {
      _ref: 'image-f81c1332b57892f35f0c0a1300c5e74d8d263306-2278x3037-jpg',
      metadata: {
        lqip: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAbABQDASIAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAAUGBAID/8QAJRAAAgEEAQQBBQAAAAAAAAAAAQIDAAQFERITQVFhBhQhIiNx/8QAFgEBAQEAAAAAAAAAAAAAAAAAAgAD/8QAGREAAwEBAQAAAAAAAAAAAAAAAAERIRIx/9oADAMBAAIRAxEAPwDRZx/SfI4Vtox+RbX8qjxk1jYX8tqDynYc3I7eqTRZW0Oeh6bJ1T+sL61WTN2ktpkGyNrKWOuRTuR4oLNNPcLNzDK3NGVlPcUVF2tvcXEXXWeSBZTzCeKKVYYhLisUiZSO/wCqyDmAu+/uq/NGOUoGbjIEYqRSgANiAxA2sg4nx967+RMVkhIJBovEJOs848jdtGuyToa2pAFFJryaRJQEYgaBoq6ZRH//2Q=='
      }
    },
    altText: undefined,
    crop: undefined,
    hotspot: undefined
  },
  {
    asset: {
      _ref: 'image-30ebcdfcd7f88c95bc935166bfce7143d7fe8125-1333x2000-jpg',
      metadata: {
        lqip: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAeABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAUHAwT/xAAlEAABAwMEAgIDAAAAAAAAAAABAgMEAAURBgchMRJxE4EUIsH/xAAXAQADAQAAAAAAAAAAAAAAAAACAwQB/8QAHREAAgMAAgMAAAAAAAAAAAAAAAECAxESURMxMv/aAAwDAQACEQMRAD8A1t9tsktV2M59alJey2plOT13XZZ9VSYsqPBmSi/ECvFha/19Dmnmm1xIjl8d+FtLaXiTx0kCohuVcpOoZi7ixIEa3xmiWUJGB5ZqVVp49wplY1q9otJttzJJQ00EkkjK6Kl23W5Nwb0y21NCpLjS1IDh5PjxgUUfjj2L5y6HWpr4bVpnULoVhTjxbT91K7rLS/oRkLeT8ueEZ5xnqmG7VzWGPxEAhDklaz9VLfNRAyTj3RVrYoyz6ZYtsLIuXpgPBWAp5f8AKK32smhrSqUEKOHl9H1RS5J6w4yikj//2Q=='
      }
    },
    altText: undefined,
    crop: undefined,
    hotspot: undefined
  }
];
