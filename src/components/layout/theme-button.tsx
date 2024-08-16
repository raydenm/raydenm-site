'use client'

import { useTheme } from 'next-themes'

import { Sun, Moon, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { flushSync } from 'react-dom'

export const ThemeButton = () => {
  const { theme, setTheme } = useTheme()

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

  return (
    <>
      <div className="fixed bottom-2 left-2 z-50 flex cursor-pointer gap-3 rounded-full border border-muted p-2 text-primary">
        <div
          className="rounded-full bg-primary-foreground"
          onClick={() => {
            buildThemeTransition('light')
          }}
        >
          <Sun size={16} />
        </div>
        <div
          className="rounded-full bg-primary-foreground"
          onClick={() => {
            buildThemeTransition('system')
          }}
        >
          <Monitor size={16} />
        </div>
        <div
          className="rounded-full bg-primary-foreground"
          onClick={() => {
            buildThemeTransition('dark')
          }}
        >
          <Moon size={16} />
        </div>
      </div>
      {/* <div
        className="fixed bottom-2 left-32 z-50 flex min-h-8 min-w-8 cursor-pointer items-center justify-center rounded-full border border-muted bg-zinc-950 p-0 text-xl text-white hover:bg-zinc-950 xl:bg-white xl:text-zinc-950 xl:hover:bg-white dark:bg-white dark:text-zinc-950 hover:dark:bg-white xl:dark:text-zinc-900"
        onClick={() => buildThemeTransition(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'light' ? (
          <Moon className="size-4" />
        ) : (
          <Sun className="size-4" />
        )}
      </div> */}
    </>
  )
}
