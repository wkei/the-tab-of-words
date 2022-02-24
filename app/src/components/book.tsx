import { useAtom } from 'jotai'
import { useMemo, useState } from 'react'
import {
  DEFAULT_LEVELS,
  learnedAtom,
  learnedWordsAtom,
  metAtom,
  modeAtom,
} from '../context/store'
import BookItem from './book-item'
import Container from './container'

// const MetWordsCounter = () => {
//   const [metWords] = useAtom(metAtom)
//   const [mode] = useAtom(modeAtom)

//   if (mode === 'random') return null

//   return (
//     <>
//       <span className="mx-8 text-stone-400"> / </span>
//       <span className="text-5xl">{metWords.length}</span>
//       <span className="ml-3 font-semibold">met</span>
//     </>
//   )
// }

export default function Book() {
  const [learnedWords] = useAtom(learnedWordsAtom)
  const [levelTabs, setLevelTabs] = useState(DEFAULT_LEVELS)

  const filtered = useMemo(() => {
    const enabledLevels = levelTabs
      .filter(({ enabled }) => enabled)
      .map(({ level }) => level)
    return learnedWords.filter(({ level }) => enabledLevels.includes(level))
  }, [learnedWords, levelTabs])

  const switchLevel = (level: number) => {
    setLevelTabs((prev) =>
      prev.map((tab) =>
        tab.level === level ? { ...tab, enabled: !tab.enabled } : tab
      )
    )
  }

  return (
    <Container>
      <header className="mb-8  select-none">
        <h1 className="mb-12">
          <span className="text-5xl">{learnedWords.length}</span>
          <span className="ml-3 font-semibold">learned</span>
          {/* <MetWordsCounter /> */}
        </h1>
        <ul className="flex border-b-2">
          {levelTabs.map((tab) => (
            <li
              key={tab.level}
              className={`
                ${
                  tab.enabled
                    ? 'border-stone-700 hover:text-stone-400'
                    : 'border-stone-transparent text-stone-400  hover:text-stone-800'
                }
                mb-[-2px] cursor-pointer border-b-2 px-4 transition-colors
              `}
              onClick={() => switchLevel(tab.level)}
            >
              <span className="text-base">N{tab.level}</span>
            </li>
          ))}
        </ul>
      </header>
      <main>
        <ul className="divide-y">
          {filtered.map((word) => (
            <li className="py-6" key={word.uuid}>
              <BookItem word={word} />
            </li>
          ))}
        </ul>
      </main>
    </Container>
  )
}
