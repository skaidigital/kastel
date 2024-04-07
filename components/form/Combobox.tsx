/* eslint-disable no-unused-vars */
import { AriaButton } from '@/components/AriaButton';
import { DropdownItem, DropdownSection, DropdownSectionProps } from '@/components/Listbox';
import { Popover } from '@/components/Popover';
import { Description, FieldError, FieldGroup, Input, Label } from '@/components/form/Field';
import { composeTailwindRenderProps } from '@/lib/rac';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import {
  ComboBox as AriaComboBox,
  ComboBoxProps as AriaComboBoxProps,
  ListBox,
  ListBoxItemProps,
  ValidationResult
} from 'react-aria-components';

export interface ComboBoxProps<T extends object> extends Omit<AriaComboBoxProps<T>, 'children'> {
  label?: string;
  description?: string | null;
  errorMessage?: string | ((validation: ValidationResult) => string);
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

export function ComboBox<T extends object>({
  label,
  description,
  errorMessage,
  children,
  items,
  ...props
}: ComboBoxProps<T>) {
  return (
    <AriaComboBox
      {...props}
      className={composeTailwindRenderProps(props.className, 'group flex flex-col gap-1')}
    >
      <Label>{label}</Label>
      <FieldGroup>
        <Input />
        <AriaButton variant="icon" className="mr-1 w-6 rounded outline-offset-0 ">
          <ChevronDownIcon aria-hidden className="h-4 w-4" />
        </AriaButton>
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="w-[--trigger-width]">
        <ListBox
          items={items}
          className="max-h-[inherit] overflow-auto p-1 outline-0 [clip-path:inset(0_0_0_0_round_.75rem)]"
        >
          {children}
        </ListBox>
      </Popover>
    </AriaComboBox>
  );
}

export function ComboBoxItem(props: ListBoxItemProps) {
  return <DropdownItem {...props} />;
}

export function ComboBoxSection<T extends object>(props: DropdownSectionProps<T>) {
  return <DropdownSection {...props} />;
}
