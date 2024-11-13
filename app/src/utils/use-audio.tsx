import { render, createPortal } from 'react-dom'
import { getAudioUrl } from './api'
import { useEffect, useRef } from 'react'

export default function useAudio(content: string) {
  const url = getAudioUrl(content)
  const container = useRef<HTMLDivElement>(document.createElement('div'))
  const audioRef = useRef<HTMLVideoElement>(null)

  const play = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.load()
      audioRef.current.play()
    }
  }

  const Audio = (
    <video key={url} ref={audioRef} hidden preload="none">
      <source src={url} type="audio/mp3" />
    </video>
  )

  useEffect(() => {
    document.body.appendChild(container.current)
    return () => {
      document.body.removeChild(container.current)
    }
  }, [])

  useEffect(() => {
    render(Audio, container.current)
  }, [Audio])

  return {
    play,
  }
}
