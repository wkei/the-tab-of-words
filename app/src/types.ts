export type Level = 1 | 2 | 3 | 4 | 5

export type Id = string

export type Word = {
  word: string
  meaning: string
  furigana: string
  romaji: string
  level: Level
  uuid: Id
}

export type View = 'word' | 'book' | 'settings'
export type Mode = 'ichigoichie' | 'random'

export type Levels = Array<{ level: Level; enabled: boolean }>

export type Settings = {
  version: string
  mode: Mode
  levels: Levels
  romaji: boolean
}
