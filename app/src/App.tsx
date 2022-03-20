import { useAtom } from 'jotai'
import { useEffect } from 'react'

import { View } from './types'
import Book from './components/book'
import FadeContainer from './components/fade-container'
import Header from './components/header'
import Settings from './components/settings'
import WordCard from './components/word'
import { viewAtom, wordsAtom } from './context/store'
import { useFetchWordsWithCache } from './utils/api'
import RegisterServiceWorkder from './sw/RegisterSW'

function MainView() {
  const [view] = useAtom(viewAtom)
  const Views: Array<[key: View, el: () => JSX.Element]> = [
    ['word', WordCard],
    ['book', Book],
    ['settings', Settings],
  ]

  return (
    <>
      <Header />
      {Views.map(([key, Comp]) => (
        <FadeContainer key={key} show={view === key}>
          {Comp()}
        </FadeContainer>
      ))}
    </>
  )
}

function App() {
  const [, setWords] = useAtom(wordsAtom)
  const { connected, data, error } = useFetchWordsWithCache()
  const loading = !data && !error

  useEffect(() => {
    if (data) setWords(data)
  }, [data])

  const app = (
    <>
      <FadeContainer show={loading}>
        <code className="absolute-center text-stone-400">Initializing...</code>
      </FadeContainer>
      <FadeContainer show={!!data}>
        <MainView />
      </FadeContainer>
      <FadeContainer show={!!error}>
        <code className="text-base text-stone-400">
          :(
          <br />
          Something wrong happened
          <br />
          Try to fresh the page
        </code>
      </FadeContainer>
    </>
  )

  return (
    <>
      {connected && app}
      <RegisterServiceWorkder />
    </>
  )
}

export default App
