import { Level } from '../types'

interface LevelBadgeProps {
  level: Level
  size?: 's'
}

export default function LevelBadge({ level, size }: LevelBadgeProps) {
  const classnames = (() => {
    switch (size) {
      case 's':
        return 'py-[4px] px-[8px] text-[12px] w-8'
      default:
        return 'py-[5px] px-[10px] text-[13px] w-10'
    }
  })()

  return (
    <div
      className={`${classnames} select-none rounded-[3px] bg-stone-600 text-center font-medium leading-none text-white`}
    >
      N{level}
    </div>
  )
}
