import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'cva';

const textProps = cva({
  base: '',
  variants: {
    size: {
      sm: 'text-sm placeholder:text-sm',
      md: 'text-md placeholder:text-md',
      lg: 'text-lg placeholder:text-lg',
      eyebrow: 'text-eyebrow uppercase placeholder:text-eyebrow',
      default: 'text-paragraph-sm lg:text-paragraph-lg placeholder:text-sm lg:placeholder:text-lg'
    }
  },
  defaultVariants: {
    size: 'lg'
  }
});

export interface TextProps extends VariantProps<typeof textProps> {
  children: React.ReactNode;
  as?: React.ElementType;
  asChild?: boolean;
  className?: string;
}

const Text = ({ size, as: Component = 'span', asChild, children, className }: TextProps) => {
  const Comp = asChild ? Slot : Component;

  return <Comp className={textProps({ size, className })}>{children}</Comp>;
};

export { Text, textProps };
