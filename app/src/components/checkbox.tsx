import { CheckIcon } from '@heroicons/react/solid'

type CheckboxProps = {
  checked?: boolean
  onChange?: (checked: boolean) => void
}

export default function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <label className="relative inline-block h-6 w-6 ">
      <input
        checked={checked}
        type="checkbox"
        className="peer h-full w-full cursor-pointer appearance-none rounded border-2"
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      <CheckIcon className="absolute-center invisible h-5 w-5 cursor-pointer peer-checked:visible" />
    </label>
  )
}
