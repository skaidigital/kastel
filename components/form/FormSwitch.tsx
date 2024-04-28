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
    <div className="flex items-center gap-x-4 rounded-[2px] border border-brand-light-grey bg-brand-sand p-4">
      <Switch.Root
        className="relative h-[25px] w-[42px] rounded-full bg-neutral-200  outline-none data-[state=checked]:bg-neutral-800"
        id={name}
        onCheckedChange={onChange}
        checked={value}
      >
        <Switch.Thumb className="block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
      </Switch.Root>
      <label htmlFor={name} className="text-sm text-neutral-500">
        {label}
      </label>
    </div>
  );
};
