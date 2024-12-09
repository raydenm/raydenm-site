'use client'

import { useEffect } from 'react'

import useRealTheme from '@/hooks/useRealTheme'
import renderCanvas from '@/lib/lineRenderCanvas'

export const LineCanvas = () => {
  const realTheme = useRealTheme()

  useEffect(() => {
    renderCanvas()
  })

  return <canvas className={`fixed inset-0 -z-10 h-screen w-full ${realTheme === 'light' && 'hidden'}`} id="canvas" />
}
