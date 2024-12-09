'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import useSystemTheme from './useSystemTheme'

const useRealTheme = () => {
  const systemTheme = useSystemTheme()
  const { theme } = useTheme()

  const [realTheme, setRealTheme] = useState('light')

  useEffect(() => {
    if (theme === 'system') {
      setRealTheme(systemTheme)
    } else {
      theme && setRealTheme(theme)
    }
  }, [systemTheme, theme])

  return realTheme
}

export default useRealTheme
