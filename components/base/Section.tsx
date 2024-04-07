import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'cva';

export const sectionProps = cva({
  base: '',
  variants: {
    size: {
      sm: 'py-20',
      md: 'py-20 md:py-24',
      lg: 'py-20 md:py-24 lg:py-40'
    },
    noTopPadding: {
      true: 'pt-0 md:pt-0 lg:pt-0'
    },
    noBottomPadding: {
      true: 'pb-0 md:pb-0 lg:pb-0'
    }
  },
  defaultVariants: {
    size: 'lg'
  }
});

export interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionProps> {
  label: string; // for aria-labelledby
  srHeading: string; // for sr-only h2
}

export const Section = ({
  size,
  noTopPadding,
  noBottomPadding,
  className,
  children,
  label,
  srHeading,
  ...props
}: Props) => {
  return (
    <div
      aria-labelledby={label}
      className={cn(sectionProps({ size, noTopPadding, noBottomPadding, className }))}
      {...props}
    >
      <h2 id={label} className="sr-only">
        {srHeading}
      </h2>
      {children}
    </div>
  );
};
