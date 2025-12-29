import { useState, useEffect } from 'react'

interface UseMarkdownContentResult {
  content: string
  loading: boolean
  error: boolean
}

/**
 * Hook to fetch markdown content from a URL
 * @param url - The URL to fetch markdown from
 * @returns Object with content, loading state, and error state
 */
export function useMarkdownContent(url: string | undefined): UseMarkdownContentResult {
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!url) {
      setLoading(false)
      setError(true)
      return
    }

    setLoading(true)
    setError(false)

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Not found')
        return res.text()
      })
      .then((text) => {
        setContent(text)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [url])

  return { content, loading, error }
}
