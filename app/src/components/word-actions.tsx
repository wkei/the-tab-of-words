import {
  CheckIcon,
  XIcon,
  VolumeUpIcon,
  SearchIcon,
} from '@heroicons/react/outline'
import { useAtom } from 'jotai'

import IconButton from './icon-button'
import LevelBadge from './level-badge'
import { Word } from '../types'
import { getDictionaryUrl } from '../utils/api'
import useAudio from '../utils/use-audio'
import {
  addLearnedAtom,
  getRandomWordAtom,
  removeLearnedAtom,
} from '../context/store'

type WordActionsProps = {
  word: Word
  del?: boolean
  size?: 's'
}
export default function WordActions({ word, del, size }: WordActionsProps) {
  const [, refreshRandomWord] = useAtom(getRandomWordAtom)
  const [, addLearned] = useAtom(addLearnedAtom)
  const [, removeLearned] = useAtom(removeLearnedAtom)
  const dictUrl = getDictionaryUrl(word.word)
  const { play } = useAudio(word.furigana || word.word)

  const learn = () => {
    addLearned(word.uuid)
    refreshRandomWord()
  }

  return (
    <div
      className={`flex items-center justify-center ${
        size === 's' ? 'space-x-4' : 'space-x-6'
      }`}
    >
      <LevelBadge level={word.level} size={size} />
      {!del && <IconButton size={size} icon={CheckIcon} onClick={learn} />}
      <IconButton size={size} icon={VolumeUpIcon} onClick={play} />
      <IconButton size={size} icon={SearchIcon} link={dictUrl} blank />
      {del && (
        <IconButton
          size={size}
          icon={XIcon}
          onClick={() => removeLearned(word.uuid)}
        />
      )}
    </div>
  )
}
