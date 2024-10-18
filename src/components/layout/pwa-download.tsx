'use client'

import { useState, useEffect } from 'react'
import { MonitorDown } from 'lucide-react'

export const PwaDownload = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('用户接受了安装')
        } else {
          console.log('用户拒绝了安装')
        }
        setDeferredPrompt(null)
        setIsInstallable(false)
      })
    }
  }

  return (
    isInstallable && (
      <div className="flex cursor-pointer rounded-full p-2 text-[#6B7785] hover:bg-muted" onClick={handleInstallClick}>
        <MonitorDown size={20} />
      </div>
    )
  )
}
