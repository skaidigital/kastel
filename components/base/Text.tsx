import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'cva';

const textProps = cva({
  base: '',
  variants: {
    size: {
      xs: 'text-xs placeholder:text-xs',
      sm: 'text-sm placeholder:text-sm',
      md: 'text-md placeholder:text-md',
      lg: 'text-lg placeholder:text-lg',
      eyebrow: 'text-eyebrow uppercase placeholder:text-eyebrow',
      'overline-sm': 'text-overline-sm placeholder:text-overline-sm',
      'overline-md': 'text-overline-md placeholder:text-overline-md',
      default: 'text-sm lg:text-md placeholder:text-sm lg:placeholder:text-md'
    }
  },
  defaultVariants: {
    size: 'default'
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
