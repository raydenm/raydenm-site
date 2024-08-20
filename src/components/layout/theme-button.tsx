'use client'

import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

import { Sun, Moon, Monitor } from 'lucide-react'
import { flushSync } from 'react-dom'

export const ThemeButton = () => {
  const { theme, setTheme } = useTheme()

  const themeMap = [
    { icon: <Sun size={16} />, theme: 'light' },
    { icon: <Monitor size={16} />, theme: 'system' },
    { icon: <Moon size={16} />, theme: 'dark' }
  ]

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
    <div className="hidden md:block">
      <div className="fixed bottom-2 left-2 z-50 flex cursor-pointer gap-3 rounded-full border border-muted px-3 py-2 text-primary">
        {/* {themeMap.map((item, index) =>
        (<div
          key={index}
          onClick={() => {
            buildThemeTransition(item.theme)
          }}
          className={cn('border-b-2 py-0.5 border-primary-foreground', theme === item.theme && 'border-muted-foreground')}
        >
          {item.icon}
        </div>)
        )} */}
        <div
          onClick={() => {
            buildThemeTransition('light')
          }}
          className={cn('border-b-2 border-primary-foreground py-0.5', theme === 'light' && 'border-muted-foreground')}
        >
          <Sun size={16} />
        </div>
        <div
          onClick={() => {
            buildThemeTransition('system')
          }}
          className={cn('border-b-2 border-primary-foreground py-0.5', theme === 'system' && 'border-muted-foreground')}
        >
          <Monitor size={16} />
        </div>
        <div
          onClick={() => {
            buildThemeTransition('dark')
          }}
          className={cn('border-b-2 border-primary-foreground py-0.5', theme === 'dark' && 'border-muted-foreground')}
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
    </div>
  )
}
