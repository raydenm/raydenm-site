import { useEffect, useState } from 'react'

const useSystemTheme = () => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (event: any) => {
      setTheme(event.matches ? 'dark' : 'light')
    }

    handleChange(matchMedia)

    matchMedia.addEventListener('change', handleChange)

    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
  }, [])

  return theme
}

export default useSystemTheme
