import { Dictionary } from '@/app/dictionaries';
import { Media } from '@/components/Media';
import { Container } from '@/components/base/Container';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import { useCollectionContext } from '@/components/pages/CollectionPage/Context';
import {
  CollectionBasePayload,
  CollectionMood,
  CollectionProductPayload,
  CollectionProductsPayload
} from '@/components/pages/CollectionPage/hooks';
import { ProductCard } from '@/components/shared/ProductCard';
import { LangValues, MarketValues } from '@/data/constants';
import { cn } from '@/lib/utils';
import '@/styles/externalOverride.css';

interface Props {
  data: CollectionProductsPayload;
  moods: CollectionBasePayload['moods'];
  productCount: number;
  currentPage: number;
  // searchParams?: {
  //   [key: string]: string | undefined;
  // };
  dictionary: Dictionary['collection_page'];
  market: MarketValues;
  lang: LangValues;
}

export async function CollectionLayout({
  data,
  currentPage,
  // searchParams,
  dictionary,
  productCount,
  moods,
  market,
  lang
}: Props) {
  const { products, hasNextPage } = data;
  const { productsPerRow, setProductsPerRow } = useCollectionContext();

  const mobileItems = insertMoodsMobile(products, (currentPage - 1) * 3, moods);
  const desktopItems = insertMoodsDesktop(products, (currentPage - 1) * 3, moods);

  const hasProducts = productCount !== 0;

  const imageSizePerItem = 100 / Number(productsPerRow) + 5;
  const sizes = `${imageSizePerItem}vw`;

  return (
    <>
      <Section label="collection-products" srHeading="Products" noTopPadding>
        {hasProducts && (
          <div className="lg:hidden">
            <CollectionGrid number={productsPerRow}>
              {mobileItems?.map((item, index) => {
                if (item.type === 'image' || item.type === 'video') {
                  return (
                    <div
                      key={index}
                      className={cn(
                        'aspect-h-3 aspect-w-2 !relative m-[-1px] border border-brand-light-grey lg:aspect-none lg:h-auto lg:w-full'
                      )}
                    >
                      <Media media={item} loading={index === 0 ? 'eager' : 'lazy'} sizes={sizes} />
                    </div>
                  );
                }
                const priorityIndices = [0, 1, 2];
                return (
                  <div key={index} className="m-[-1px]">
                    <ProductCard
                      priority={priorityIndices.includes(index)}
                      product={item}
                      imageSizes={sizes}
                    />
                  </div>
                );
              })}
            </CollectionGrid>
          </div>
        )}
        {hasProducts && (
          <div className="hidden lg:block">
            <CollectionGrid number={productsPerRow}>
              {desktopItems?.map((item, index) => {
                if (item.type === 'image' || item.type === 'video') {
                  return (
                    <div
                      key={index}
                      className={cn(
                        '!relative m-[-1px] h-full w-full border border-brand-light-grey'
                      )}
                    >
                      <Media media={item} loading={index === 0 ? 'eager' : 'lazy'} sizes={sizes} />
                    </div>
                  );
                }

                const priorityIndices = [0, 1, 2];
                return (
                  <div className="m-[-1px]" key={index}>
                    <ProductCard
                      key={index}
                      priority={priorityIndices.includes(index)}
                      product={item}
                      imageSizes={sizes}
                    />
                  </div>
                );
              })}
            </CollectionGrid>
          </div>
        )}
        {!hasProducts && (
          <Container className="lg:mt-10">
            <Text as="p" size="lg">
              {dictionary.no_products}
            </Text>
          </Container>
        )}
      </Section>
    </>
  );
}

type ProductOrMood = CollectionProductPayload | CollectionMood;

function insertMoodsDesktop(
  products: CollectionProductPayload[],
  baseIndex: number,
  moods?: CollectionMood[]
): ProductOrMood[] {
  if (!moods || moods.length === 0) {
    return products;
  }

  const result: ProductOrMood[] = [...products];
  const moodsToInsert = moods.slice(baseIndex, baseIndex + 3);

  moodsToInsert.forEach((mood, index) => {
    let insertIndex = 0;
    if (index === 1) {
      insertIndex = 9;
    } else if (index === 2) {
      insertIndex = 14;
    }
    insertIndex = Math.min(insertIndex, result.length);
    result.splice(insertIndex, 0, mood);
  });

  return result;
}

function insertMoodsMobile(
  products: CollectionProductPayload[],
  baseIndex: number,
  moods?: CollectionMood[]
): ProductOrMood[] {
  if (!moods || moods.length === 0) {
    return products;
  }

  const result: ProductOrMood[] = [...products];
  const moodsToInsert = moods.slice(baseIndex, baseIndex + 3);

  moodsToInsert.forEach((mood, index) => {
    const insertIndex = Math.min(4 + index * 5, result.length);
    result.splice(insertIndex, 0, mood);
  });

  return result;
}

export function CollectionGrid({
  number,
  children,
  className
}: {
  number: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        '-gap-[1px]',
        number === 1 && 'grid grid-cols-1 lg:grid-cols-4',
        number === 2 && 'grid grid-cols-2 lg:grid-cols-4',
        number === 3 && 'grid grid-cols-2 lg:grid-cols-3',
        number === 4 && 'grid grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {children}
    </div>
  );
}
