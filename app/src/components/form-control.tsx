interface FormControlProps {
  label: string | React.ReactNode
  vertical?: boolean
  children: React.ReactNode
}

export default function FormControl({
  label,
  vertical,
  children,
}: FormControlProps) {
  return (
    <label
      className={`${
        vertical ? 'flex-col-reverse items-start' : 'items-center'
      } mb-4 flex cursor-pointer select-none last:mb-0`}
    >
      <div className="mb-auto leading-none">{children}</div>
      <div className={`${vertical ? 'mb-2' : 'ml-5'} flex-1`}>{label}</div>
    </label>
  )
}
