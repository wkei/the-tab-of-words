import { Word } from '../types'
import Furigana from './furigana'
import WordActions from './word-actions'

export default function BookItem({ word }: { word: Word }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="mr-2 flex items-center">
          <div className="mr-2 text-lg font-semibold">{word.word}</div>
          <div className="text-base text-stone-500">
            <Furigana word={word} />
          </div>
        </div>
        <WordActions word={word} del size="s" />
      </div>
      <p className="mt-1 text-base text-stone-500">{word.meaning}</p>
    </div>
  )
}
