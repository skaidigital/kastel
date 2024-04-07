import { textProps } from '@/components/base/Text';
import * as Switch from '@radix-ui/react-switch';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';

interface Props extends React.InputHTMLAttributes<HTMLButtonElement> {
  control: Control<any>;
  name: string;
  label: string;
}

export const FormSwitch = ({ control, name, label }: Props) => {
  const {
    field: { value, onChange }
  } = useController({
    name,
    control
  });

  return (
    <div className="flex items-center justify-between space-y-1">
      <label htmlFor={name} className={textProps({ size: 'eyebrow' })}>
        {label}
      </label>
      <Switch.Root
        className="relative h-[25px] w-[42px] rounded-full bg-brand-mid-grey  outline-none data-[state=checked]:bg-brand-dark-grey"
        id={name}
        onCheckedChange={onChange}
        checked={value}
      >
        <Switch.Thumb className="shadow-blackA4 block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-white shadow-[0_2px_2px] transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
      </Switch.Root>
    </div>
  );
};
