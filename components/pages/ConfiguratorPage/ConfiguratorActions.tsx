import { Button } from '@/components/Button';
import { ConfiguratorButton } from '@/components/pages/ConfiguratorPage/ConfiguratorButton';
import { OptionButton } from '@/components/pages/ConfiguratorPage/OptionButton';
import { SanityImageProps } from '@/lib/sanity/types';

interface Props {
  images: SanityImageProps[];
  variableName: string;
}

export function ConfiguratorActions({ images, variableName }: Props) {
  return (
    <div className="sticky top-0 w-full lg:max-w-[450px]">
      <div className="flex flex-col justify-between lg:h-full">
        <div>
          <div className="hidden w-full lg:flex">
            <ConfiguratorButton stepIndex={0}>Pillowcase</ConfiguratorButton>
          </div>
          <div className="p-6">
            <div className="flex flex-col gap-y-4">
              {images.map((image, index) => (
                <OptionButton key={image.asset._ref} id={index} variableName={variableName} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 flex w-full items-center gap-2 border-t border-brand-border p-6 lg:sticky lg:bottom-0 lg:mt-0">
          <Button fullWidth>Button</Button>
        </div>
      </div>
    </div>
  );
}
