import { cloneElement } from 'react'

interface IconButtonProps {
  active?: boolean
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element
  size?: 's' | 'm' | 'l'
  onClick?: () => void
  link?: string
  blank?: boolean
}

export default function IconButton({
  active,
  icon,
  size,
  link,
  blank,
  onClick,
}: IconButtonProps) {
  const Comp = link ? 'a' : 'button'
  const linkProps = link
    ? { href: link, target: blank ? '_blank' : '_self' }
    : undefined

  return (
    <Comp
      {...linkProps}
      className={`
        ${active ? 'text-stone-800' : 'text-stone-400'}
        cursor-pointer  transition-colors hover:text-stone-800
      `}
      onClick={() => onClick && onClick()}
    >
      {icon({ className: size === 's' ? 'h-4 w-4' : 'h-6 w-6' })}
    </Comp>
  )
}
