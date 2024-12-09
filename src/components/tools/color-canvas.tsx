/* eslint-disable no-unused-vars */
'use client'

import { useEffect } from 'react'

import useRealTheme from '@/hooks/useRealTheme'
import renderCanvas from '@/lib/colorRenderCanvas'

declare global {
  interface Window {
    isRendercolorCanvas: any
  }
}

export const ColorCanvas = () => {
  const realTheme = useRealTheme()

  useEffect(() => {
    if (!window.isRendercolorCanvas) {
      window.isRendercolorCanvas = true
      renderCanvas()
    }
  })

  return (
    <canvas
      id="the-canvas"
      className={`fixed inset-0 -z-10 h-screen w-full text-xs ${realTheme === 'light' && 'hidden'}`}
    />
  )
}
