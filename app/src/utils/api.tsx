import useSWRImmutable from 'swr/immutable'
import { Word } from '../types'
import useFetchWithCache from './use-fetch-with-cache'

const API_ENDPOINT = 'https://jlpt-vocab-api.vercel.app/api'
const CACHE_KEY = 'tab-of-words'
const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useFetchRandomWord() {
  const { data, error } = useSWRImmutable<Word>(
    `${API_ENDPOINT}/words/random`,
    fetcher,
  )
  return { data, error }
}

export function getDictionaryUrl(content: string) {
  const jisho = 'https://jisho.org/search/'
  // const japanDict = 'https://www.japandict.com/'

  return `${jisho}${content}`
}

export function getAudioUrl(content: string) {
  // const naver =
  // 'https://ja.dict.naver.com/api/nvoice?speaker=yuri&service=dictionary&speech_fmt=mp3&text='
  const youdao = 'https://dict.youdao.com/dictvoice?le=jap&audio='

  return `${youdao}${content}`
}

export function useFetchWordsWithCache() {
  return useFetchWithCache<Word[]>(CACHE_KEY, `${API_ENDPOINT}/words/all`)
}
