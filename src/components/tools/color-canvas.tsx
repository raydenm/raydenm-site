'use client'

import { renderCanvas } from './renderCanvas'
import { useEffect } from 'react'
export const ColorCanvas = () => {
  useEffect(() => {
    renderCanvas()
  }, [])

  return <canvas className="fixed inset-0 -z-10 h-screen w-full" id="canvas"></canvas>
}
