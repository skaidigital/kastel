import { FormLabel } from '@/components/form/FormLabel'
import { StyledInput } from '@/components/form/StyledInput'
import type { Control } from 'react-hook-form'
import { useController } from 'react-hook-form'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>
  name: string
  label: string
  description?: string
  variant?: 'normal' | 'natureLab'
}

export const FormInput = ({ control, name, label, description, variant, ...rest }: InputProps) => {
  const {
    field: { value, onChange },
    fieldState: { error }
  } = useController({
    name,
    control
  })

  return (
    <div className="space-y-1">
      <FormLabel htmlFor={name} description={description} variant={variant}>
        {label}
      </FormLabel>
      <StyledInput
        {...rest}
        name={name}
        value={value}
        onChange={onChange}
        error={error}
        variant={variant}
      />
    </div>
  )
}
