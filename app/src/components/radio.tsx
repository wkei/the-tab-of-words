interface RadiosProps {
  name: string
  value: string
  target: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Radio({ name, value, target, onChange }: RadiosProps) {
  return (
    <label className="relative inline-block h-6 w-6">
      <input
        type="radio"
        className="peer  block h-full w-full cursor-pointer appearance-none rounded-full border-2 checked:border-stone-600"
        value={value}
        name={name}
        checked={target === value}
        onChange={onChange}
      />
      <div className="absolute-center h-3 w-3 cursor-pointer rounded-full bg-transparent peer-checked:bg-stone-600"></div>
    </label>
  )
}
