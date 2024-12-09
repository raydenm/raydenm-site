'use client'

import { useEffect } from 'react'

import useRealTheme from '@/hooks/useRealTheme'
import renderCanvas from '@/lib/colorRenderCanvas'

export const ColorCanvas = () => {
  const realTheme = useRealTheme()

  useEffect(() => {
    renderCanvas()
  })

  return (
    <canvas
      id="the-canvas"
      className={`fixed inset-0 -z-10 h-screen w-full text-xs ${realTheme === 'light' && 'hidden'}`}
    />
  )
}
