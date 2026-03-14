import { useState, useEffect } from 'react'

export function useAnnotations() {
  const [annotationsVisible, setAnnotationsVisible] = useState(false)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'm' || e.key === 'M') {
        setAnnotationsVisible(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return { annotationsVisible, setAnnotationsVisible }
}
