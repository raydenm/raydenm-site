import { useEffect } from 'react'

export function useKeyPress(callback: (_event: any) => void, keyCodes: any) {
  useEffect(() => {
    const handler = (event: any) => {
      // 并且包含Ctrl
      if (keyCodes.includes(event.code) && event.ctrlKey && !event.shiftKey && !event.metaKey && !event.altKey) {
        callback(event)
      }
    }

    window.addEventListener('keydown', handler, { passive: true })
    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [callback, keyCodes])
}
