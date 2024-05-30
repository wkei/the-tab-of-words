import {
  BookOpenIcon,
  CogIcon,
  ArrowSmLeftIcon,
} from '@heroicons/react/outline'
import { useAtom } from 'jotai'

import { viewAtom } from '../context/store'
import IconButton from './icon-button'

export default function Header() {
  const [view, changeView] = useAtom(viewAtom)
  return (
    <nav className="fixed right-[10vw] top-12 flex space-x-5 md:right-16">
      {view !== 'word' && (
        <IconButton icon={ArrowSmLeftIcon} onClick={() => changeView('word')} />
      )}
      {/* <IconButton
        active={view === 'book'}
        icon={BookOpenIcon}
        onClick={() => changeView('book')}
      /> */}
      <IconButton
        active={view === 'settings'}
        icon={CogIcon}
        onClick={() => changeView('settings')}
      />
    </nav>
  )
}
