import { useState, useEffect, useRef } from 'react'

export default function useFetchWithCache<T>(cacheId: string, url: string) {
  const [data, setData] = useState<T | null>(null)
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState(null)
  const cacheRef = useRef<Cache | null>(null)

  useEffect(() => {
    const run = async () => {
      cacheRef.current = await caches.open(cacheId)
      const res = await cacheRef.current.match(url)
      if (res) {
        setData(await res.json())
        setConnected(true)
      } else {
        setConnected(true)
        await cacheRef.current.add(url)
        const res = await cacheRef.current.match(url)
        if (res) {
          const data = await res.json()
          setData(data)
        }
      }
    }
    try {
      run()
    } catch (error: any) {
      setError(error)
    }
  }, [])

  return { connected, data, error }
}
