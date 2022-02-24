import WordActions from './word-actions'
import Furigana from './furigana'
import { useAtom } from 'jotai'
import { getRandomWordAtom } from '../context/store'
import { useEffect } from 'react'

const wordStyle = {
  fontSize: 'calc(24px + 5vw)',
  lineHeight: '1',
}

export default function Word() {
  const [randomWord, refreshRandomWord] = useAtom(getRandomWordAtom)

  useEffect(() => {
    if (!randomWord) {
      refreshRandomWord()
    }
  }, [randomWord])

  if (!randomWord)
    return (
      <>
        <code className="text-base text-stone-400">
          :)
          <br />
          You met all the words
          <br />
          Change the Level or Mode to see more words
        </code>
      </>
    ) // TODO: show empty when all learned

  return (
    <div className="absolute left-1/2 top-1/2 w-[80vw] translate-x-[-50%] translate-y-[-60%] text-center text-base md:text-xl">
      <Furigana word={randomWord} />
      <h1 className="my-8 font-serif font-semibold" style={wordStyle}>
        {randomWord.word}
      </h1>
      <p>{randomWord.meaning}</p>
      <div className="mt-12">
        <WordActions word={randomWord} />
      </div>
    </div>
  )
}
