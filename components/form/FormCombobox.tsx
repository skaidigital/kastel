import { FormLabel } from '@/components/form/FormLabel'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { useCombobox } from 'downshift'
import { useState } from 'react'
import { useController } from 'react-hook-form'

interface Item {
  label: string
  value: string
}

interface FormComboboxProps {
  control: any
  name: string
  items: Item[]
  label: string
}

// TODO style it more to be on brand
export const FormCombobox = ({ control, name, items, label }: FormComboboxProps) => {
  const {
    field: { onChange, value, ref },
    fieldState: { error }
  } = useController({
    name,
    control
  })

  const [inputItems, setInputItems] = useState(items)

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getToggleButtonProps,
    getItemProps,
    highlightedIndex
  } = useCombobox<Item>({
    items: inputItems,
    itemToString: (item) => (item ? item.label : ''),
    onSelectedItemChange: ({ selectedItem }) => onChange(selectedItem ? selectedItem.value : ''),
    selectedItem: items.find((item) => item.value === value) ?? null,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) => item.label.toLowerCase().includes(inputValue?.toLowerCase() ?? ''))
      )
    }
  })

  return (
    <div className="relative flex flex-col gap-y-1 text-sm">
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <div className="flex rounded-[2px] border border-brand-light-grey">
        <input
          {...getInputProps({
            ref,
            placeholder: label,
            className: 'w-full p-3 placeholder:text-brand-dark-grey'
          })}
        />
        <button aria-label="toggle menu" className="px-3" type="button" {...getToggleButtonProps()}>
          <ChevronUpDownIcon className="h-5 w-5" />
        </button>
      </div>
      <ul
        {...getMenuProps()}
        className={`absolute z-10 mt-1 max-h-80 w-full overflow-auto bg-white shadow-md ${
          !(isOpen && inputItems.length) && 'hidden'
        }`}
      >
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              className={`flex flex-col px-3 py-2 ${
                highlightedIndex === index ? 'bg-blue-300' : ''
              }`}
              key={item.value}
              {...getItemProps({ item, index })}
            >
              {item.label}
            </li>
          ))}
      </ul>
      {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
    </div>
  )
}
