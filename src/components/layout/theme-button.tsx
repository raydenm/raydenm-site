'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { flushSync } from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const SystemThemeIcon = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M512 938.666667c235.648 0 426.666667-191.018667 426.666667-426.666667S747.648 85.333333 512 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667z m0-64v-725.333334a362.666667 362.666667 0 0 1 0 725.333334z"
      fill="currentColor"
    ></path>
  </svg>
)

const setDynamicKeyframes = (x: number, y: number) => {
  const keyframesTurnOn = `
    @keyframes turnOn {
      0% {
        clip-path: circle(150% at ${x}px ${y}px);
      }
      100% {
        clip-path: circle(18px at ${x}px ${y}px);
      }
    }
  `

  const keyframesTurnOff = `
    @keyframes turnOff {
      0% {
        clip-path: circle(18px at ${x}px ${y}px);
      }
      100% {
        clip-path: circle(150% at ${x}px ${y}px);
      }
    }
  `

  const styleSheet = document.styleSheets[0]
  styleSheet?.insertRule(keyframesTurnOn, styleSheet.cssRules.length)
  styleSheet?.insertRule(keyframesTurnOff, styleSheet.cssRules.length)
}

export const ThemeButton = () => {
  const { theme, setTheme } = useTheme()
  const themeRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  const transitionViewIfSupported = (updateCb: () => any) => {
    if (window.matchMedia(`(prefers-reduced-motion: reduce)`).matches) {
      updateCb()
      return
    }
    // @ts-ignore
    if (document.startViewTransition) {
      // @ts-ignore
      document.startViewTransition(updateCb)
    } else {
      updateCb()
    }
  }

  const buildThemeTransition = (theme: string) => {
    transitionViewIfSupported(() => {
      flushSync(() => setTheme(theme))
    })
  }

  useEffect(() => {
    if (themeRef.current) {
      const rect = themeRef.current.getBoundingClientRect()
      const { top, left } = rect
      setDynamicKeyframes(left + 18, top)
    }
    setIsClient(true)
  }, [])

  return (
    <div className="hidden md:block">
      <div
        ref={themeRef}
        className="fixed bottom-3 left-3 z-50 flex cursor-pointer rounded-full p-2 text-[#6B7785] hover:bg-muted"
      >
        <DropdownMenu>
          <DropdownMenuTrigger className="focus-visible:outline-none">
            {isClient && (
              <div>
                {theme === 'system' && <SystemThemeIcon className="size-5" />}
                {theme === 'light' && <Sun size={20} />}
                {theme === 'dark' && <Moon size={20} />}
              </div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mb-2 ml-3">
            <DropdownMenuItem className="px-3" onClick={() => buildThemeTransition('light')}>
              <Sun size={16} className="mr-2" />
              亮色主题
            </DropdownMenuItem>
            <DropdownMenuItem className="px-3" onClick={() => buildThemeTransition('dark')}>
              <Moon size={16} className="mr-2" />
              暗黑主题
            </DropdownMenuItem>
            <DropdownMenuItem className="px-3" onClick={() => buildThemeTransition('system')}>
              <SystemThemeIcon className="mr-2 size-4" />
              跟随系统
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
