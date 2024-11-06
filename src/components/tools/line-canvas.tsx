'use client'

import renderCanvas from '@/lib/lineRenderCanvas'
import { useEffect } from 'react'
import useRealTheme from '@/hooks/useRealTheme'

export const LineCanvas = () => {
  const realTheme = useRealTheme()

  useEffect(() => {
    renderCanvas()
  })

  return <canvas className={`fixed inset-0 -z-10 h-screen w-full ${realTheme === 'light' && 'hidden'}`} id="canvas" />
}
