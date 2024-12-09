/* eslint-disable no-unused-vars */
'use client'

import { useEffect } from 'react'

import useRealTheme from '@/hooks/useRealTheme'
import renderCanvas from '@/lib/lineRenderCanvas'

declare global {
  interface Window {
    isRenderLineCanvas: any
  }
}

export const LineCanvas = () => {
  const realTheme = useRealTheme()

  useEffect(() => {
    if (!window.isRenderLineCanvas) {
      window.isRenderLineCanvas = true
      renderCanvas()
    }
  })

  return <canvas className={`fixed inset-0 -z-10 h-screen w-full ${realTheme === 'light' && 'hidden'}`} id="canvas" />
}
