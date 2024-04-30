import { Checkbox } from '@/components/Checkbox';
import { FormLabel } from '@/components/form/FormLabel';
import { cn } from '@/lib/utils';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>;
  name: string;
  label: string;
  description?: string;
  className?: string;
}

export const FormCheckbox = ({ control, name, label, description, className }: InputProps) => {
  const {
    field: { value, onChange },
    fieldState: { error }
  } = useController({
    name,
    control
  });

  return (
    <div className={cn('flex flex-col space-y-1', className)}>
      <div className="flex items-center gap-x-3">
        <Checkbox id={name} name={name} value={value} onCheckedChange={onChange} />
        <FormLabel htmlFor={name} description={description} className="mb-0">
          {label}
        </FormLabel>
      </div>
      {error && (
        <p className="pt-2 text-xs text-red-500" id="email-error">
          {error.message}
        </p>
      )}
    </div>
  );
};
